// ========================================
// SERVICE WORKER - MASSA MÃE LAB
// ========================================

const CACHE_NAME = 'massa-mae-lab-v1';
const RUNTIME_CACHE = 'massa-mae-lab-runtime-v1';

// Arquivos para cache estático (instalação)
const STATIC_ASSETS = [
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// ========================================
// INSTALAÇÃO DO SERVICE WORKER
// ========================================
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Service Worker: Cacheando arquivos estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Service Worker: Instalação concluída');
                return self.skipWaiting(); // Ativa imediatamente
            })
            .catch((error) => {
                console.error('❌ Service Worker: Erro na instalação', error);
            })
    );
});

// ========================================
// ATIVAÇÃO DO SERVICE WORKER
// ========================================
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Remove caches antigos
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Ativação concluída');
                return self.clients.claim(); // Assume controle imediatamente
            })
    );
});

// ========================================
// ESTRATÉGIA DE CACHE: NETWORK FIRST COM FALLBACK
// ========================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignora requisições de outros domínios (exceto imagens)
    if (url.origin !== location.origin && !request.destination === 'image') {
        return;
    }
    
    // Estratégia: Network First com fallback para cache
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Se a resposta for válida, clona e adiciona ao cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                
                return response;
            })
            .catch(() => {
                // Se falhar (offline), busca no cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log('📦 Service Worker: Servindo do cache:', request.url);
                        return cachedResponse;
                    }
                    
                    // Se não estiver no cache, retorna página offline (se houver)
                    if (request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                    
                    // Fallback para outros tipos de requisição
                    return new Response('Offline - Conteúdo não disponível', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    });
                });
            })
    );
});

// ========================================
// NOTIFICAÇÕES PUSH
// ========================================
self.addEventListener('push', (event) => {
    console.log('🔔 Service Worker: Notificação push recebida');
    
    let data = {
        title: '🥖 Massa Mãe Lab',
        body: 'Nova fornada disponível!',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: 'fornada-notification',
        requireInteraction: true
    };
    
    if (event.data) {
        try {
            data = { ...data, ...event.data.json() };
        } catch (e) {
            console.error('Erro ao parsear dados da notificação:', e);
        }
    }
    
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: data.badge,
            tag: data.tag,
            requireInteraction: data.requireInteraction,
            vibrate: [200, 100, 200],
            actions: [
                {
                    action: 'view',
                    title: 'Ver produtos',
                    icon: '/icons/icon-192.png'
                },
                {
                    action: 'close',
                    title: 'Fechar'
                }
            ]
        })
    );
});

// ========================================
// CLIQUE EM NOTIFICAÇÕES
// ========================================
self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Service Worker: Notificação clicada');
    
    event.notification.close();
    
    const action = event.action;
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Se já existe uma janela aberta, foca nela
                for (let client of clientList) {
                    if (client.url.includes(self.registration.scope) && 'focus' in client) {
                        client.postMessage({
                            type: 'NOTIFICATION_CLICK',
                            action: action
                        });
                        return client.focus();
                    }
                }
                
                // Se não existe janela aberta, abre uma nova
                if (clients.openWindow) {
                    const url = action === 'view' 
                        ? '/index.html#produtos' 
                        : '/index.html';
                    return clients.openWindow(url);
                }
            })
    );
});

// ========================================
// SINCRONIZAÇÃO EM BACKGROUND (OPCIONAL)
// ========================================
self.addEventListener('sync', (event) => {
    console.log('🔄 Service Worker: Sincronização em background');
    
    if (event.tag === 'sync-pedidos') {
        event.waitUntil(
            // Aqui você pode sincronizar pedidos offline com o servidor
            syncPedidos()
        );
    }
});

async function syncPedidos() {
    try {
        // Implementar lógica de sincronização
        console.log('🔄 Sincronizando pedidos...');
        // Exemplo: buscar pedidos do IndexedDB e enviar para API
    } catch (error) {
        console.error('❌ Erro ao sincronizar pedidos:', error);
    }
}

// ========================================
// MENSAGENS DO CLIENTE
// ========================================
self.addEventListener('message', (event) => {
    console.log('💬 Service Worker: Mensagem recebida:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(RUNTIME_CACHE).then((cache) => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

// ========================================
// LIMPEZA PERIÓDICA DE CACHE
// ========================================
async function cleanupCache() {
    const cache = await caches.open(RUNTIME_CACHE);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 dias
    
    for (const request of requests) {
        const response = await cache.match(request);
        const dateHeader = response.headers.get('date');
        
        if (dateHeader) {
            const cacheDate = new Date(dateHeader).getTime();
            if (now - cacheDate > maxAge) {
                console.log('🗑️ Removendo cache antigo:', request.url);
                await cache.delete(request);
            }
        }
    }
}

// Executa limpeza a cada 24 horas
setInterval(cleanupCache, 24 * 60 * 60 * 1000);

console.log('✅ Service Worker carregado com sucesso!');
