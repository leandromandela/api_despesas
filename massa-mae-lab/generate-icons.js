const fs = require('fs');
const path = require('path');

// Função para criar ícones PNG simples usando Canvas (se disponível) ou placeholders
function generateIconPlaceholders() {
    const sizes = [192, 512];
    const iconsDir = path.join(__dirname, 'icons');
    
    // SVG template para os ícones
    const createSVG = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#e09e6a" rx="80"/>
  <circle cx="256" cy="256" r="200" fill="#f5e6d3" opacity="0.3"/>
  <g transform="translate(256, 256)">
    <ellipse cx="0" cy="0" rx="140" ry="100" fill="#f5e6d3"/>
    <path d="M -140 -20 Q -100 -80, -50 -90 Q 0 -95, 50 -90 Q 100 -80, 140 -20" 
          fill="#c8864f" stroke="#a0673d" stroke-width="3"/>
    <line x1="-80" y1="-40" x2="-60" y2="20" stroke="#a0673d" stroke-width="4" stroke-linecap="round"/>
    <line x1="-30" y1="-50" x2="-10" y2="20" stroke="#a0673d" stroke-width="4" stroke-linecap="round"/>
    <line x1="20" y1="-50" x2="40" y2="20" stroke="#a0673d" stroke-width="4" stroke-linecap="round"/>
    <line x1="70" y1="-40" x2="90" y2="20" stroke="#a0673d" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="0" cy="90" rx="120" ry="20" fill="#c8864f" opacity="0.4"/>
    <ellipse cx="-40" cy="-30" rx="30" ry="20" fill="white" opacity="0.3"/>
    <ellipse cx="50" cy="-25" rx="25" ry="15" fill="white" opacity="0.3"/>
  </g>
  <text x="256" y="440" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="white">MASSA MÃE</text>
</svg>`;
    
    sizes.forEach(size => {
        const svgContent = createSVG(size);
        const svgPath = path.join(iconsDir, `icon-${size}.svg`);
        fs.writeFileSync(svgPath, svgContent);
        console.log(`✅ Criado: icon-${size}.svg`);
    });
    
    console.log('\n📝 Nota: Os arquivos SVG foram criados.');
    console.log('Para produção, converta-os para PNG usando uma ferramenta como:');
    console.log('  - https://cloudconvert.com/svg-to-png');
    console.log('  - ImageMagick: convert icon.svg -resize 192x192 icon-192.png');
    console.log('  - Inkscape: inkscape icon.svg --export-png=icon-192.png -w 192 -h 192');
    console.log('\nPor enquanto, os SVGs funcionarão para testes do PWA.\n');
}

// Cria um PNG básico usando data URL (fallback)
function createBasicPNGDataURL(size) {
    // Cria um canvas virtual e retorna data URL
    // Para simplificar, vamos criar arquivos SVG que funcionam como ícones
    return null;
}

try {
    generateIconPlaceholders();
    console.log('✅ Ícones gerados com sucesso!');
} catch (error) {
    console.error('❌ Erro ao gerar ícones:', error);
}
