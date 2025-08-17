const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js";
script.onload = () => console.log('QRCode.js carregado');
script.onerror = () => {
    document.getElementById('errorMsg').style.display = 'block';
    document.getElementById('errorMsg').innerText = 'Erro: Falha ao carregar a biblioteca de QR Code.';
};
document.head.appendChild(script);

function gerarQRCode() {
    if (typeof QRCode === 'undefined') {
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('errorMsg').innerText = 'Erro: Biblioteca QRCode não carregada.';
        return;
    }

    const ssid = document.getElementById('ssid').value;
    const password = document.getElementById('password').value;
    const encryption = document.getElementById('encryption').value = 'WPA';

    if (!ssid || !password) {
        document.getElementById('errorMsg').style.display = 'block';
        document.getElementById('errorMsg').innerText = 'Por favor, insira SSID e senha.';
        return;
    }

    document.getElementById('errorMsg').style.display = 'none';
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';
    new QRCode(qrcodeDiv, { text: `WIFI:T:${encryption};S:${ssid};P:${password};;`, width: 200, height: 200 });

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
            navigator.share({ files: [dataURLtoFile(imgData, 'wifi-qr.png')], title: 'QR Code Wi-Fi' })
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