const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Remove query string
    let filePath = req.url.split('?')[0];
    
    // Default to index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Construct full path
    const fullPath = path.join(__dirname, filePath);
    
    // Get file extension
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>404 - Não Encontrado</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background: linear-gradient(135deg, #e09e6a 0%, #c8864f 100%);
                            color: white;
                        }
                        .container {
                            text-align: center;
                        }
                        h1 { font-size: 4rem; margin: 0; }
                        p { font-size: 1.5rem; }
                        a { color: white; text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🥖 404</h1>
                        <p>Página não encontrada</p>
                        <a href="/">Voltar para o início</a>
                    </div>
                </body>
                </html>
            `);
            return;
        }
        
        // Read and serve file
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor');
                return;
            }
            
            // Set headers for PWA
            const headers = {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            };
            
            // Special headers for service worker
            if (filePath === '/service-worker.js') {
                headers['Service-Worker-Allowed'] = '/';
            }
            
            res.writeHead(200, headers);
            res.end(data);
        });
    });
});

server.listen(PORT, HOST, () => {
    console.log('');
    console.log('🥖 ========================================');
    console.log('   MASSA MÃE LAB - PWA Server');
    console.log('   ========================================');
    console.log('');
    console.log(`   ✅ Servidor rodando em:`);
    console.log(`      http://localhost:${PORT}`);
    console.log(`      http://${HOST}:${PORT}`);
    console.log('');
    console.log('   📱 Para testar o PWA:');
    console.log('      1. Abra o navegador (Chrome/Edge recomendado)');
    console.log('      2. Acesse http://localhost:${PORT}');
    console.log('      3. Abra DevTools (F12) > Application > Manifest');
    console.log('      4. Verifique Service Workers e Cache Storage');
    console.log('      5. Use Lighthouse para validar o PWA');
    console.log('');
    console.log('   🔍 Lighthouse Audit:');
    console.log('      DevTools > Lighthouse > Generate Report');
    console.log('');
    console.log('   ⌨️  Pressione Ctrl+C para parar o servidor');
    console.log('');
    console.log('========================================');
    console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🛑 Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
    });
});
