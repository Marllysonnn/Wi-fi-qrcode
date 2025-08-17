##Gerador de QR Code Wi-Fi e Pix
Este projeto é uma aplicação web simples que permite gerar QR codes para conexão Wi-Fi e pagamentos via Pix. A interface é intuitiva, responsiva e suporta a criação de códigos escaneáveis por dispositivos compatíveis, como smartphones.

##Funcionalidades

###Wi-Fi: Gera QR codes para conectar automaticamente a redes Wi-Fi, especificando SSID, senha e tipo de criptografia (ex.: WPA).
###Pix: Cria QR codes no formato BR Code para pagamentos via Pix, incluindo chave Pix, valor (opcional) e mensagem (opcional).
Compartilhamento: Permite compartilhar o QR code gerado diretamente no dispositivo, se o navegador suportar a API Web Share.
Interface Dinâmica: Exibe campos relevantes com base no tipo de QR code selecionado (Wi-Fi ou Pix).

##Responsividade
A aplicação foi projetada para ser responsiva, adaptando-se a diferentes tamanhos de tela:

###Layout Desktop: Utiliza um design centrado com main fixado em 360px de largura, com o container do QR code ajustado dinamicamente.
###Layout Mobile: Em telas com largura máxima de 480px, o corpo da página (body) muda para um layout em coluna, com padding adicional. O main ocupa 80% da largura da tela, e o container do QR code (#qrcodeContainer) se ajusta automaticamente para manter a usabilidade.
###Estilos Adaptáveis: Os elementos como botões, inputs e o QR code são estilizados com tamanhos e espaçamentos proporcionais, garantindo uma experiência consistente em dispositivos móveis e desktops. Animações como fadeIn e fadeOut são mantidas com duração de 0.4s para transições suaves.

O CSS inclui um media query @media (max-width: 480px) que ajusta o layout para telas menores, garantindo que a aplicação seja acessível em smartphones sem comprometer a funcionalidade.

##Como Usar

Clone o repositório e abra o arquivo index.html ou entre no link https://wi-fi-qrcode.vercel.app/ em um navegador.
Escolha o tipo de QR code (Wi-Fi ou Pix) no menu suspenso.
Preencha os campos exibidos:
Para Wi-Fi: SSID, senha e tipo de criptografia.
Para Pix: chave Pix, valor (opcional) e mensagem (opcional).


Clique em "Gerar QR Code" para visualizar o código.
Use as opções "Compartilhar" ou "Fechar" conforme necessário.

##Pré-requisitos

Um navegador web moderno (Chrome, Firefox, Safari, etc.).
Conexão à internet para carregar a biblioteca QRCode.js via CDN.

##Estrutura do Projeto

index.html: Arquivo HTML principal com a interface do usuário.
script.js: Lógica JavaScript para gerar os QR codes.
styles.css: Estilos CSS que definem a aparência e a responsividade da aplicação.

##Dependências

QRCode.js: Biblioteca usada para gerar os QR codes, carregada via CDN.

##Observações

O QR code Pix segue o padrão BR Code do Banco Central do Brasil, com cálculo de CRC16 para maior compatibilidade.
Teste o QR code gerado com apps como Bradesco, Mercado Pago e Nubank para validar o pagamento Pix.
Para Wi-Fi, compatibilidade depende do dispositivo e do app de escaneamento.

##Contribuições
Sinta-se à vontade para abrir issues ou pull requests no repositório para melhorias, como adicionar mais tipos de QR codes, aprimorar a responsividade ou corrigir bugs.
