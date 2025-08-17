const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js";
script.onload = () => console.log('QRCode.js carregado');
script.onerror = () => {
    document.getElementById('errorMsg').style.display = 'block';
    document.getElementById('errorMsg').innerText = 'Erro: Falha ao carregar a biblioteca de QR Code.';
};
document.head.appendChild(script);
function atualizarCampos() {
    const type = document.getElementById('typeSelect').value;
    document.getElementById('wifiFields').style.display = type === 'wifi' ? 'flex' : 'none';
    document.getElementById('pixFields').style.display = type === 'pix' ? 'flex' : 'none';
}
function crc16_ccitt(s) {
    let crc = 0xFFFF;
    for (let i = 0; i < s.length; i++) {
        crc ^= s.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
        }
    }
    return crc & 0xFFFF;
}
function getField(id, value) {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
}
function gerarQRCode() {
    if (typeof QRCode === 'undefined') {
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('errorMsg').innerText = 'Erro: Biblioteca QRCode não carregada.';
        return;
    }
    const type = document.getElementById('typeSelect').value;
    let qrText = '';
    if (type === 'wifi') {
        const ssid = document.getElementById('ssid').value;
        const password = document.getElementById('password').value;
        const encryption = document.getElementById('encryption').value || 'WPA';
        if (!ssid || !password) {
            document.getElementById('errorMsg').style.display = 'block';
            document.getElementById('errorMsg').innerText = 'Por favor, insira SSID e senha.';
            return;
        }
        qrText = `WIFI:T:${ encryption };S:${ ssid };P:${ password };;;`;
    } else if (type === 'pix') {
        const pixKey = document.getElementById('pixKey').value;
        const amount = document.getElementById('amount').value;
        const message = document.getElementById('pixMessage').value;
        if (!pixKey) {
            document.getElementById('errorMsg').style.display = 'block';
            document.getElementById('errorMsg').innerText = 'Por favor, insira a chave PIX.';
            return;
        }
        
        let gui = 'BR.GOV.BCB.PIX';
        let mai = getField('00', gui) + getField('01', pixKey);
        if (message) {
            mai += getField('02', message);
        }
        let payload = getField('00', '01') + getField('26', mai);
        payload += getField('52', '0000') + getField('53', '986');
        if (amount) {
            let amtStr = parseFloat(amount).toFixed(2);
            payload += getField('54', amtStr);
        }
        payload += getField('58', 'BR') + getField('59', 'Pagamento') + getField('60', 'Cidade');
        let txid = getField('05', '***');
        payload += getField('62', txid);
        payload += '6304';
        
        let crc = crc16_ccitt(payload).toString(16).toUpperCase().padStart(4, '0');
        qrText = payload + crc;
    }
    document.getElementById('errorMsg').style.display = 'none';
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';
    new QRCode(qrcodeDiv, { text: qrText, width: 200, height: 200 });
    const container = document.getElementById('qrcodeContainer');
    container.style.display = 'flex';
    container.style.animationName = 'fadeIn';
}
function fecharQRCode() {
    const container = document.getElementById('qrcodeContainer');
    container.style.animationName = 'fadeOut';
    setTimeout(() => {
        container.style.display = 'none';
        document.getElementById('qrcode').innerHTML = '';
    }, 400);
}
function compartilharQRCode() {
    const qrcodeCanvas = document.querySelector('#qrcode canvas');
    if (qrcodeCanvas) {
        const imgData = qrcodeCanvas.toDataURL('image/png');
        if (navigator.share) {
            navigator.share({ files: [dataURLtoFile(imgData, 'qr-code.png')], title: 'QR Code' })
                .catch(err => console.log('Erro ao compartilhar:', err));
        } else {
            alert('Compartilhamento não suportado neste navegador.');
        }
    }
}
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]);
    let n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) { u8arr[n] = bstr.charCodeAt(n); }
    return new File([u8arr], filename, { type: mime });
}