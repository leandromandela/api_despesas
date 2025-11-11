# 🚀 Guia Rápido - Massa Mãe Lab PWA

## ⚡ Início Rápido (3 passos)

### 1️⃣ Iniciar o Servidor
```bash
cd massa-mae-lab
node server.js
```

### 2️⃣ Abrir no Navegador
```
http://localhost:3001
```

### 3️⃣ Testar PWA
- Abra DevTools (F12)
- Vá em Application > Manifest
- Verifique Service Workers
- Execute Lighthouse Audit

---

## 📱 Funcionalidades Implementadas

### ✅ Barra de Progresso Animada
- Simulação de fornada em tempo real (5 minutos)
- Atualização suave a cada 100ms
- Status dinâmico baseado no progresso
- Timer regressivo

### ✅ Produtos com Botões Inteligentes
- 4 produtos com cards responsivos
- Botões desabilitados até fornada completar
- Animação de pulso quando habilitados
- Toast notification ao adicionar ao carrinho

### ✅ PWA Completo
- ✅ Manifest.json configurado
- ✅ Service Worker registrado
- ✅ Cache offline (estático + dinâmico)
- ✅ Ícones 192x192 e 512x512
- ✅ Instalável no celular/desktop
- ✅ Notificações push preparadas

### ✅ Design Responsivo
- Mobile-first
- Breakpoints: 480px, 768px
- Grid adaptativo
- Animações suaves

---

## 🎨 Paleta de Cores

```css
--color-primary: #e09e6a      /* Dourado claro */
--color-primary-dark: #c8864f /* Dourado escuro */
--color-secondary: #f5e6d3    /* Bege claro */
--color-background: #faf8f5   /* Branco sujo */
--color-white: #ffffff        /* Branco puro */
```

---

## 🔔 Testando Notificações

1. Aguarde a fornada atingir 100%
2. Permita notificações quando solicitado
3. Você receberá: "🥖 Nova fornada disponível!"
4. Os botões serão habilitados automaticamente

---

## 📦 Deploy Rápido

### Vercel (Recomendado)
```bash
npm i -g vercel
cd massa-mae-lab
vercel
```

### Netlify
```bash
npm i -g netlify-cli
cd massa-mae-lab
netlify deploy --prod
```

### GitHub Pages
1. Crie repositório no GitHub
2. Push dos arquivos
3. Settings > Pages > Deploy

---

## 🧪 Validação Lighthouse

Execute no DevTools:
1. F12 > Lighthouse
2. Selecione "Progressive Web App"
3. Generate Report

**Resultados Esperados:**
- ✅ PWA Installable
- ✅ Offline Capable  
- ✅ Service Worker Registered
- ✅ Fast and Reliable
- ✅ Installable

---

## 📂 Estrutura de Arquivos

```
massa-mae-lab/
├── index.html              ← Página principal
├── styles.css              ← Estilos CSS
├── script.js               ← Lógica JavaScript
├── manifest.json           ← Configuração PWA
├── service-worker.js       ← Cache offline
├── server.js               ← Servidor HTTP
├── vercel.json             ← Config Vercel
├── netlify.toml            ← Config Netlify
├── README.md               ← Documentação completa
├── QUICKSTART.md           ← Este arquivo
└── icons/
    ├── icon-192.svg        ← Ícone 192x192
    └── icon-512.svg        ← Ícone 512x512
```

---

## 🐛 Troubleshooting

### Service Worker não registra
- Verifique se está usando HTTPS ou localhost
- Limpe o cache do navegador
- Verifique o console para erros

### Notificações não aparecem
- Verifique permissões do navegador
- Aguarde a fornada atingir 100%
- Teste em Chrome/Edge (melhor suporte)

### PWA não instala
- Verifique se o manifest.json está acessível
- Confirme que os ícones existem
- Execute Lighthouse para diagnóstico

### Barra de progresso não anima
- Verifique o console para erros JavaScript
- Recarregue a página
- Limpe o cache

---

## 💡 Próximos Passos

### Para Produção:
1. ✅ Converter ícones SVG para PNG
2. ✅ Configurar Firebase Cloud Messaging (notificações)
3. ✅ Adicionar backend real para pedidos
4. ✅ Implementar carrinho de compras
5. ✅ Adicionar sistema de pagamento
6. ✅ Criar painel administrativo

### Melhorias Opcionais:
- [ ] Adicionar imagens reais dos produtos
- [ ] Implementar sistema de autenticação
- [ ] Criar histórico de pedidos
- [ ] Adicionar mapa da localização
- [ ] Integrar com WhatsApp
- [ ] Adicionar avaliações de clientes

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o README.md completo
2. Consulte o console do navegador
3. Execute Lighthouse para diagnóstico
4. Verifique a documentação do Service Worker

---

## 🎉 Pronto!

Seu PWA está funcionando! Agora você pode:
- ✅ Testar localmente
- ✅ Fazer deploy
- ✅ Instalar no celular
- ✅ Usar offline
- ✅ Receber notificações

**Desenvolvido com ❤️ e fermentação natural**

© 2025 Massa Mãe Lab
