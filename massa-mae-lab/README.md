# 🥖 Massa Mãe Lab - PWA

Progressive Web App completo para padarias artesanais com fermentação natural.

## ✨ Funcionalidades

- 📊 **Fornada em Tempo Real**: Barra de progresso animada mostrando o status da fornada (0-100%)
- 🛒 **Catálogo de Produtos**: Cards responsivos com produtos e botões de compra
- 🔔 **Notificações Push**: Alertas quando novos pães estiverem prontos
- 📱 **PWA Instalável**: Funciona como app nativo no celular
- 🌐 **Modo Offline**: Cache inteligente com Service Worker
- 🎨 **Design Moderno**: Interface minimalista com tons bege, branco e dourado

## 🚀 Como Executar

### Opção 1: Servidor Node.js (Recomendado)

```bash
cd massa-mae-lab
node server.js
```

Acesse: http://localhost:3001

### Opção 2: Servidor Python

```bash
cd massa-mae-lab
python3 -m http.server 3001
```

### Opção 3: Servidor PHP

```bash
cd massa-mae-lab
php -S localhost:3001
```

## 📱 Testando o PWA

### 1. Abrir no Navegador
- Use Chrome, Edge ou outro navegador compatível com PWA
- Acesse http://localhost:3001

### 2. Verificar Manifest
1. Abra DevTools (F12)
2. Vá em **Application** > **Manifest**
3. Verifique se todas as informações estão corretas

### 3. Verificar Service Worker
1. DevTools > **Application** > **Service Workers**
2. Confirme que o SW está registrado e ativo
3. Teste o modo offline:
   - Marque "Offline" no DevTools
   - Recarregue a página
   - O app deve continuar funcionando

### 4. Testar Cache
1. DevTools > **Application** > **Cache Storage**
2. Verifique os caches:
   - `massa-mae-lab-v1` (cache estático)
   - `massa-mae-lab-runtime-v1` (cache dinâmico)

### 5. Lighthouse Audit
1. DevTools > **Lighthouse**
2. Selecione "Progressive Web App"
3. Clique em "Generate report"
4. Verifique os resultados:
   - ✅ PWA Installable
   - ✅ Offline Capable
   - ✅ Service Worker registered

### 6. Instalar o App
- **Desktop**: Clique no ícone de instalação na barra de endereço
- **Mobile**: Menu > "Adicionar à tela inicial"

## 🎯 Funcionalidades Implementadas

### ✅ HTML (index.html)
- Estrutura semântica
- Meta tags PWA
- Seção de fornada com barra de progresso
- Cards de produtos responsivos
- Prompt de instalação
- Toast notifications

### ✅ CSS (styles.css)
- Design minimalista e moderno
- Variáveis CSS para fácil customização
- Responsivo (mobile, tablet, desktop)
- Animações suaves
- Gradientes e sombras
- Suporte a modo standalone

### ✅ JavaScript (script.js)
- Simulação de fornada em tempo real (5 minutos)
- Atualização de progresso a cada 100ms
- Status dinâmico baseado no progresso
- Habilitação de botões quando fornada completa
- Registro de Service Worker
- Notificações push
- Instalação PWA
- Toast notifications
- Detecção de modo standalone

### ✅ Manifest (manifest.json)
- Nome e short_name configurados
- Ícones 192x192 e 512x512
- Display: standalone
- Theme color: #e09e6a
- Shortcuts para navegação rápida
- Categorias e screenshots

### ✅ Service Worker (service-worker.js)
- Cache estático (install)
- Cache dinâmico (runtime)
- Estratégia Network First com fallback
- Suporte offline completo
- Notificações push
- Sincronização em background
- Limpeza automática de cache antigo

## 📂 Estrutura do Projeto

```
massa-mae-lab/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # Lógica JavaScript
├── manifest.json           # Configuração PWA
├── service-worker.js       # Service Worker
├── server.js               # Servidor HTTP Node.js
├── README.md               # Este arquivo
├── icon-generator.html     # Gerador de ícones PNG
└── icons/
    ├── icon.svg            # Ícone original SVG
    ├── icon-192.svg        # Ícone 192x192 SVG
    └── icon-512.svg        # Ícone 512x512 SVG
```

## 🎨 Gerando Ícones PNG

Os ícones SVG funcionam para testes, mas para produção é recomendado usar PNG:

### Método 1: Gerador HTML (Incluído)
1. Abra `icon-generator.html` no navegador
2. Clique em "Download PNG" para cada tamanho
3. Salve como `icon-192.png` e `icon-512.png` na pasta `icons/`
4. Atualize o `manifest.json` para usar `.png` em vez de `.svg`

### Método 2: Ferramentas Online
- https://cloudconvert.com/svg-to-png
- https://svgtopng.com/

### Método 3: Linha de Comando
```bash
# ImageMagick
convert icons/icon.svg -resize 192x192 icons/icon-192.png
convert icons/icon.svg -resize 512x512 icons/icon-512.png

# Inkscape
inkscape icons/icon.svg --export-png=icons/icon-192.png -w 192 -h 192
inkscape icons/icon.svg --export-png=icons/icon-512.png -w 512 -h 512
```

## 🔔 Notificações Push

### Permissão
O app solicita permissão de notificação automaticamente ao iniciar a fornada.

### Teste Local
As notificações funcionam localmente quando:
1. O Service Worker está registrado
2. A permissão foi concedida
3. A fornada atinge 100%

### Produção (Firebase Cloud Messaging)
Para notificações push em produção:
1. Configure Firebase Cloud Messaging
2. Adicione as credenciais no Service Worker
3. Implemente o backend para enviar notificações

## 🌐 Deploy

### Vercel
```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
cd massa-mae-lab
vercel
```

### Netlify
```bash
# Instale a CLI da Netlify
npm i -g netlify-cli

# Deploy
cd massa-mae-lab
netlify deploy --prod
```

### Firebase Hosting
```bash
# Instale a CLI do Firebase
npm i -g firebase-tools

# Inicialize e faça deploy
firebase init hosting
firebase deploy
```

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça push dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch e pasta
5. Salve e aguarde o deploy

## 🎯 Checklist de Validação

- [x] HTML semântico e válido
- [x] CSS responsivo (mobile-first)
- [x] JavaScript vanilla (sem frameworks)
- [x] Manifest.json configurado
- [x] Service Worker registrado
- [x] Cache offline funcionando
- [x] Ícones 192x192 e 512x512
- [x] Barra de progresso animada
- [x] Botões habilitados após fornada
- [x] Notificações push
- [x] Instalação PWA
- [x] Toast notifications
- [x] Design minimalista
- [x] Cores: bege, branco, dourado

## 📊 Lighthouse Score Esperado

- **Performance**: 90-100
- **Accessibility**: 90-100
- **Best Practices**: 90-100
- **SEO**: 90-100
- **PWA**: ✅ Installable

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+ (Async/Await, Promises)
- Service Worker API
- Notification API
- Cache API
- Web App Manifest

## 📝 Notas

- A simulação da fornada dura 5 minutos (300 segundos)
- O progresso é atualizado a cada 100ms para animação suave
- Os botões de compra são habilitados apenas quando a fornada atinge 100%
- O Service Worker usa estratégia "Network First" com fallback para cache
- O cache é limpo automaticamente após 7 dias

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🎉 Créditos

Desenvolvido com ❤️ e fermentação natural.

---

**© 2025 Massa Mãe Lab**
