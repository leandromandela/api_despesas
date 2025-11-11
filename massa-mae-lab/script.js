// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================
const CONFIG = {
    FORNADA_DURATION: 300000, // 5 minutos em milissegundos
    UPDATE_INTERVAL: 100, // Atualiza a cada 100ms para animação suave
    NOTIFICATION_PERMISSION: 'default'
};

// ========================================
// STATE MANAGEMENT
// ========================================
const state = {
    fornadaStartTime: null,
    fornadaProgress: 0,
    isFornadaComplete: false,
    deferredPrompt: null
};

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
    progressBar: document.getElementById('progress-bar'),
    fornadaPercentage: document.getElementById('fornada-percentage'),
    fornadaStatus: document.getElementById('fornada-status'),
    timerText: document.getElementById('timer-text'),
    botoesComprar: document.querySelectorAll('.btn-comprar'),
    installSection: document.getElementById('install-section'),
    btnInstall: document.getElementById('btn-install'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('service-worker.js');
            console.log('✅ Service Worker registrado com sucesso:', registration.scope);
            
            // Verifica atualizações
            registration.addEventListener('updatefound', () => {
                console.log('🔄 Nova versão do Service Worker encontrada');
            });
            
            return registration;
        } catch (error) {
            console.error('❌ Erro ao registrar Service Worker:', error);
        }
    } else {
        console.warn('⚠️ Service Worker não é suportado neste navegador');
    }
}

// ========================================
// NOTIFICAÇÕES PUSH
// ========================================
async function requestNotificationPermission() {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        CONFIG.NOTIFICATION_PERMISSION = permission;
        
        if (permission === 'granted') {
            console.log('✅ Permissão de notificação concedida');
        } else if (permission === 'denied') {
            console.log('❌ Permissão de notificação negada');
        }
        
        return permission;
    }
    return 'unsupported';
}

function showNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            // Usa Service Worker para notificação
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    icon: 'icons/icon-192.png',
                    badge: 'icons/icon-192.png',
                    vibrate: [200, 100, 200],
                    ...options
                });
            });
        } else {
            // Fallback para notificação normal
            new Notification(title, {
                icon: 'icons/icon-192.png',
                ...options
            });
        }
    }
}

// ========================================
// SIMULAÇÃO DA FORNADA
// ========================================
function iniciarFornada() {
    state.fornadaStartTime = Date.now();
    state.isFornadaComplete = false;
    
    // Solicita permissão de notificação ao iniciar
    requestNotificationPermission();
    
    const interval = setInterval(() => {
        const elapsed = Date.now() - state.fornadaStartTime;
        const progress = Math.min((elapsed / CONFIG.FORNADA_DURATION) * 100, 100);
        
        atualizarProgresso(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            finalizarFornada();
        }
    }, CONFIG.UPDATE_INTERVAL);
}

function atualizarProgresso(progress) {
    state.fornadaProgress = progress;
    
    // Atualiza barra de progresso
    elements.progressBar.style.width = `${progress}%`;
    elements.fornadaPercentage.textContent = `${Math.floor(progress)}%`;
    
    // Atualiza status baseado no progresso
    atualizarStatus(progress);
    
    // Atualiza timer
    atualizarTimer(progress);
}

function atualizarStatus(progress) {
    let status = '';
    
    if (progress < 20) {
        status = '🌾 Preparando a massa...';
    } else if (progress < 40) {
        status = '⏳ Primeira fermentação em andamento...';
    } else if (progress < 60) {
        status = '🙌 Modelando os pães...';
    } else if (progress < 80) {
        status = '⏰ Segunda fermentação...';
    } else if (progress < 95) {
        status = '🔥 Assando no forno...';
    } else {
        status = '✨ Finalizando...';
    }
    
    elements.fornadaStatus.textContent = status;
}

function atualizarTimer(progress) {
    const remainingTime = Math.ceil((CONFIG.FORNADA_DURATION * (100 - progress)) / 100000); // em segundos
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    if (progress >= 100) {
        elements.timerText.textContent = '✅ Fornada concluída!';
    } else {
        elements.timerText.textContent = `Tempo estimado: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function finalizarFornada() {
    state.isFornadaComplete = true;
    
    // Habilita botões de compra
    elements.botoesComprar.forEach(botao => {
        botao.disabled = false;
        botao.querySelector('span:last-child').textContent = 'Adicionar ao carrinho';
        
        // Adiciona animação de pulso
        botao.style.animation = 'pulse 1s ease-in-out 3';
    });
    
    // Mostra notificação
    showNotification('🥖 Nova fornada disponível!', {
        body: 'Os pães acabaram de sair do forno! Faça seu pedido agora.',
        tag: 'fornada-pronta',
        requireInteraction: true,
        actions: [
            { action: 'view', title: 'Ver produtos' },
            { action: 'close', title: 'Fechar' }
        ]
    });
    
    // Mostra toast
    showToast('🥖 Nova fornada disponível! Os pães estão prontos para compra.');
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, duration = 4000) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// ========================================
// INSTALAÇÃO DO PWA
// ========================================
function setupPWAInstall() {
    // Captura o evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        
        // Mostra o botão de instalação
        elements.installSection.style.display = 'block';
    });
    
    // Handler do botão de instalação
    elements.btnInstall.addEventListener('click', async () => {
        if (!state.deferredPrompt) {
            return;
        }
        
        state.deferredPrompt.prompt();
        
        const { outcome } = await state.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('✅ Usuário aceitou instalar o PWA');
            showToast('📱 App instalado com sucesso!');
        } else {
            console.log('❌ Usuário recusou instalar o PWA');
        }
        
        state.deferredPrompt = null;
        elements.installSection.style.display = 'none';
    });
    
    // Detecta quando o app foi instalado
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA instalado com sucesso');
        showToast('🎉 Bem-vindo ao Massa Mãe Lab!');
        state.deferredPrompt = null;
        elements.installSection.style.display = 'none';
    });
}

// ========================================
// HANDLERS DE PRODUTOS
// ========================================
function setupProdutoHandlers() {
    elements.botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            if (!state.isFornadaComplete) {
                showToast('⏳ Aguarde a fornada ficar pronta!');
                return;
            }
            
            const produto = botao.getAttribute('data-produto');
            adicionarAoCarrinho(produto);
        });
    });
}

function adicionarAoCarrinho(produto) {
    console.log(`🛒 Produto adicionado ao carrinho: ${produto}`);
    showToast(`✅ ${produto} adicionado ao carrinho!`);
    
    // Aqui você pode adicionar lógica real de carrinho
    // Por exemplo, salvar no localStorage ou enviar para uma API
}

// ========================================
// DETECÇÃO DE MODO STANDALONE
// ========================================
function detectStandaloneMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                      || window.navigator.standalone 
                      || document.referrer.includes('android-app://');
    
    if (isStandalone) {
        console.log('📱 App rodando em modo standalone (instalado)');
        // Esconde o botão de instalação se já estiver instalado
        elements.installSection.style.display = 'none';
    }
}

// ========================================
// ANIMAÇÃO DE PULSO PARA BOTÕES
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// ========================================
// INICIALIZAÇÃO
// ========================================
async function init() {
    console.log('🚀 Inicializando Massa Mãe Lab...');
    
    // Registra Service Worker
    await registerServiceWorker();
    
    // Configura instalação do PWA
    setupPWAInstall();
    
    // Detecta modo standalone
    detectStandaloneMode();
    
    // Configura handlers de produtos
    setupProdutoHandlers();
    
    // Inicia simulação da fornada
    iniciarFornada();
    
    console.log('✅ App inicializado com sucesso!');
}

// ========================================
// HANDLER DE NOTIFICAÇÕES DO SERVICE WORKER
// ========================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
            console.log('🔔 Notificação clicada:', event.data.action);
            
            if (event.data.action === 'view') {
                // Scroll para a seção de produtos
                document.querySelector('.produtos-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }
    });
}

// ========================================
// INICIALIZA QUANDO O DOM ESTIVER PRONTO
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// EXPORTA PARA DEBUG (OPCIONAL)
// ========================================
window.MassaMaeLab = {
    state,
    config: CONFIG,
    showToast,
    showNotification,
    requestNotificationPermission
};
