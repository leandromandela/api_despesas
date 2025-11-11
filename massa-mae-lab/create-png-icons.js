const fs = require('fs');
const path = require('path');

// Cria um PNG mínimo válido com cor sólida
// Este é um PNG 1x1 válido que pode ser usado como placeholder
function createMinimalPNG(width, height, color) {
    // Para criar PNGs reais, precisaríamos de uma biblioteca como 'sharp' ou 'canvas'
    // Como alternativa, vamos criar um HTML que pode ser usado para gerar os ícones
    
    const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gerador de Ícones</title>
    <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        canvas { border: 1px solid #ccc; margin: 10px; }
        .container { display: flex; flex-wrap: wrap; gap: 20px; }
        .icon-box { text-align: center; }
        button { padding: 10px 20px; margin: 10px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>🥖 Gerador de Ícones - Massa Mãe Lab</h1>
    <p>Clique com o botão direito nas imagens abaixo e selecione "Salvar imagem como..."</p>
    
    <div class="container">
        <div class="icon-box">
            <h3>Ícone 192x192</h3>
            <canvas id="canvas192" width="192" height="192"></canvas>
            <br>
            <button onclick="downloadIcon(192)">Download PNG</button>
        </div>
        
        <div class="icon-box">
            <h3>Ícone 512x512</h3>
            <canvas id="canvas512" width="512" height="512"></canvas>
            <br>
            <button onclick="downloadIcon(512)">Download PNG</button>
        </div>
    </div>
    
    <script>
        function drawIcon(canvas) {
            const ctx = canvas.getContext('2d');
            const size = canvas.width;
            const scale = size / 512;
            
            ctx.scale(scale, scale);
            
            // Background com gradiente
            const gradient = ctx.createLinearGradient(0, 0, 512, 512);
            gradient.addColorStop(0, '#e09e6a');
            gradient.addColorStop(1, '#c8864f');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);
            
            // Círculo decorativo
            ctx.fillStyle = 'rgba(245, 230, 211, 0.3)';
            ctx.beginPath();
            ctx.arc(256, 256, 200, 0, Math.PI * 2);
            ctx.fill();
            
            // Pão - corpo principal
            ctx.fillStyle = '#f5e6d3';
            ctx.beginPath();
            ctx.ellipse(256, 256, 140, 100, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Pão - topo (crosta)
            ctx.fillStyle = '#c8864f';
            ctx.strokeStyle = '#a0673d';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(116, 236);
            ctx.quadraticCurveTo(156, 176, 206, 166);
            ctx.quadraticCurveTo(256, 161, 306, 166);
            ctx.quadraticCurveTo(356, 176, 396, 236);
            ctx.fill();
            ctx.stroke();
            
            // Marcas de corte no pão
            ctx.strokeStyle = '#a0673d';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            
            // Marca 1
            ctx.beginPath();
            ctx.moveTo(176, 216);
            ctx.lineTo(196, 276);
            ctx.stroke();
            
            // Marca 2
            ctx.beginPath();
            ctx.moveTo(226, 206);
            ctx.lineTo(246, 276);
            ctx.stroke();
            
            // Marca 3
            ctx.beginPath();
            ctx.moveTo(276, 206);
            ctx.lineTo(296, 276);
            ctx.stroke();
            
            // Marca 4
            ctx.beginPath();
            ctx.moveTo(326, 216);
            ctx.lineTo(346, 276);
            ctx.stroke();
            
            // Sombra inferior
            ctx.fillStyle = 'rgba(200, 134, 79, 0.4)';
            ctx.beginPath();
            ctx.ellipse(256, 346, 120, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Destaques (brilho)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.ellipse(216, 226, 30, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(306, 231, 25, 15, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Texto
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('MASSA MÃE', 256, 440);
        }
        
        function downloadIcon(size) {
            const canvas = document.getElementById('canvas' + size);
            const link = document.createElement('a');
            link.download = 'icon-' + size + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
        
        // Desenha os ícones ao carregar
        window.onload = function() {
            drawIcon(document.getElementById('canvas192'));
            drawIcon(document.getElementById('canvas512'));
        };
    </script>
</body>
</html>`;
    
    return htmlTemplate;
}

// Salva o gerador HTML
const htmlContent = createMinimalPNG();
const htmlPath = path.join(__dirname, 'icon-generator.html');
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Gerador de ícones criado: icon-generator.html');
console.log('\n📝 Para gerar os ícones PNG:');
console.log('1. Abra o arquivo icon-generator.html no navegador');
console.log('2. Clique nos botões "Download PNG" para cada tamanho');
console.log('3. Salve os arquivos como icon-192.png e icon-512.png na pasta icons/');
console.log('\nAlternativamente, os arquivos SVG já criados funcionam para testes do PWA.\n');
