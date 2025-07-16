// ZatoBox - La Rebelión del Software Libre
// Script principal con efectos retro y easter eggs

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ZatoBox cargado - ¡La rebelión ha comenzado!');
    
    // Inicializar todos los efectos
    initEffects();
    initEasterEggs();
    initSoundEffects();
    initAnimations();
    initGifModal();
    updateTimestamps();
    
    // Contador de visitantes falso
    updateVisitorCount();
});

// Efectos principales
function initEffects() {
    // Efecto de escritura para textos
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach(text => {
        const originalText = text.textContent;
        text.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                text.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar después de un delay
        setTimeout(typeWriter, 1000);
    });
    
    // Efecto de parpadeo para textos
    const blinkTexts = document.querySelectorAll('.blink-text');
    blinkTexts.forEach(text => {
        setInterval(() => {
            text.style.visibility = text.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    });
    
    // Efecto de glitch para textos
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        setInterval(() => {
            text.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                text.style.transform = 'translate(0, 0)';
            }, 100);
        }, 2000);
    });
}

// Easter eggs
function initEasterEggs() {
    const dancingCat = document.getElementById('dancing-cat');
    const fireworks = document.getElementById('fireworks');
    const vhsTape = document.getElementById('vhs-tape');
    
    // Gato bailando - aparece al hacer clic en el título
    const mainTitle = document.querySelector('.main-title');
    mainTitle.addEventListener('click', () => {
        showEasterEgg(dancingCat, 3000);
        playSound('click');
    });
    
    // Funcionalidad de los botones del navigator (desktop y mobile)
    const navButtons = document.querySelectorAll('.nav-btn');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    const statusText = document.querySelector('.status-text');
    const mobileStatusText = document.querySelector('.mobile-status-text');
    const loadingBar = document.querySelector('.loading-bar');
    
    // Inicializar navegador móvil
    initMobileNavigator();
    
    // Estado del navigator - navegación por secciones
    const sections = [
        { title: 'Bienvenida', selector: '.welcome-section' },
        { title: '¿Qué es ZatoBox?', selector: '.what-is-section' },
        { title: '¿Por qué lo hacemos?', selector: '.why-section' },
        { title: '¿Qué ofrecemos?', selector: '.features-section' },
        { title: '¿Cómo colaborar?', selector: '.collaborate-section' },
        { title: 'Call to Action', selector: '.cta-section' }
    ];
    let currentSectionIndex = 0;
    
    // Configurar navegador desktop con nueva funcionalidad
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            playSound('click');
            
            // Efecto visual del botón
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            // Mapear botones a acciones
            const actions = ['home', 'back', 'forward', 'reload'];
            const action = actions[index];
            
            if (action && statusText) {
                handleNavigationAction(action, statusText);
            }
        });
    });
    

    
    // Fuegos artificiales - aparece al presionar F
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f' || e.key === 'F') {
            showEasterEgg(fireworks, 2000);
            playSound('click');
        }
    });
    
    // Cinta VHS - aparece al hacer scroll hasta el final
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            showEasterEgg(vhsTape, 5000);
        }
    });
    
    // Easter egg secreto - Konami Code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerKonamiEasterEgg();
        }
    });
}

// Inicializar navegador móvil
function initMobileNavigator() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileContent = document.querySelector('.mobile-nav-content');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    const mobileStatusText = document.querySelector('.mobile-status-text');
    
    // Toggle del menú móvil
    if (mobileToggle && mobileContent) {
        mobileToggle.addEventListener('click', () => {
            playSound('click');
            mobileContent.classList.toggle('active');
            
            // Cambiar icono del toggle
            mobileToggle.textContent = mobileContent.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Funcionalidad de botones móviles
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            playSound('click');
            
            const action = button.getAttribute('data-action');
            handleNavigationAction(action, mobileStatusText);
            
            // Efecto visual
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Función común para manejar navegación (desktop y mobile)
function handleNavigationAction(action, statusElement) {
    const sections = [
        { title: 'Bienvenida', selector: '.welcome-section' },
        { title: '¿Qué es ZatoBox?', selector: '.what-is-section' },
        { title: '¿Por qué lo hacemos?', selector: '.why-section' },
        { title: '¿Qué ofrecemos?', selector: '.features-section' },
        { title: '¿Cómo colaborar?', selector: '.collaborate-section' },
        { title: 'Call to Action', selector: '.cta-section' }
    ];
    
    if (!window.currentSectionIndex) {
        window.currentSectionIndex = 0;
    }
    
    switch(action) {
        case 'home':
            statusElement.textContent = 'Navegando a inicio...';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.currentSectionIndex = 0;
            
            setTimeout(() => {
                statusElement.textContent = 'Inicio cargado ✅';
            }, 500);
            break;
            
        case 'back':
            if (window.currentSectionIndex > 0) {
                window.currentSectionIndex--;
                const section = sections[window.currentSectionIndex];
                statusElement.textContent = 'Navegando atrás...';
                
                const sectionElement = document.querySelector(section.selector);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                setTimeout(() => {
                    statusElement.textContent = `📍 ${section.title}`;
                }, 500);
            } else {
                statusElement.textContent = '⚠️ Primera sección';
                setTimeout(() => {
                    statusElement.textContent = 'Rebelión activa...';
                }, 2000);
            }
            break;
            
        case 'forward':
            if (window.currentSectionIndex < sections.length - 1) {
                window.currentSectionIndex++;
                const section = sections[window.currentSectionIndex];
                statusElement.textContent = 'Navegando adelante...';
                
                const sectionElement = document.querySelector(section.selector);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                setTimeout(() => {
                    statusElement.textContent = `📍 ${section.title}`;
                }, 500);
            } else {
                statusElement.textContent = '⚠️ Última sección';
                setTimeout(() => {
                    statusElement.textContent = 'Rebelión activa...';
                }, 2000);
            }
            break;
            
        case 'reload':
            statusElement.textContent = 'Recargando rebelión...';
            
            // Efecto visual de recarga
            const contentBlocks = document.querySelectorAll('.content-block');
            contentBlocks.forEach((block, i) => {
                setTimeout(() => {
                    block.style.animation = 'blink-smooth 0.3s ease-in-out';
                    setTimeout(() => {
                        block.style.animation = '';
                    }, 300);
                }, i * 50);
            });
            
            // Actualizar contador de visitantes
            updateVisitorCount();
            
            setTimeout(() => {
                statusElement.textContent = '⚡ Recargado exitosamente';
                setTimeout(() => {
                    statusElement.textContent = 'Rebelión activa...';
                }, 2000);
            }, 800);
            break;
    }
}

// Mostrar easter egg
function showEasterEgg(element, duration) {
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, duration);
}

// Easter egg del Konami Code
function triggerKonamiEasterEgg() {
    console.log('🎮 ¡Konami Code activado!');
    
    // Crear lluvia de emojis
    const emojis = ['🚀', '💻', '🔓', '🌍', '⚡', '🎮', '🐱', '🎆', '📼', '💎'];
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: 2em;
                animation: fall 3s linear forwards;
            `;
            container.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 3000);
        }, i * 100);
    }
    
    setTimeout(() => {
        container.remove();
    }, 8000);
    
    // Agregar CSS para la animación de caída
    if (!document.querySelector('#konami-css')) {
        const style = document.createElement('style');
        style.id = 'konami-css';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Efectos de sonido optimizados
function initSoundEffects() {
    const clickSound = document.getElementById('click-sound');
    
    // Precargar el audio para reducir latencia
    if (clickSound) {
        clickSound.preload = 'auto';
        clickSound.volume = 0.3;
    }
    
    // Seleccionar TODOS los elementos clickeables (desktop y mobile)
    const clickableElements = document.querySelectorAll(`
        button, 
        .cta-btn, 
        .nav-btn,
        .mobile-nav-btn,
        .mobile-menu-toggle,
        .feature-card, 
        .feature-item, 
        .contribution-item,
        .main-title,
        a[href],
        input[type="submit"],
        .close-modal
    `);
    
    // Agregar sonido a todos los elementos clickeables
    clickableElements.forEach(element => {
        // Sonido al hacer clic (sin hover para reducir ruido)
        element.addEventListener('click', (e) => {
            playSound('click');
        }, { passive: true });
        
        // Agregar clase para indicar que es clickeable
        element.style.cursor = 'pointer';
    });
    
    console.log(`🔊 Sonido agregado a ${clickableElements.length} elementos`);
}

// Inicializar funcionalidad del modal GIF
function initGifModal() {
    console.log('🔧 Inicializando modal GIF...');
    
    // Esperar un poco más para asegurar que todo esté cargado
    setTimeout(() => {
        const modal = document.getElementById('gif-modal');
        const modalGif = document.getElementById('modal-gif');
        const closeModal = document.querySelector('.close-modal');
        
        if (!modal || !modalGif || !closeModal) {
            console.error('❌ Elementos del modal no encontrados:', { modal, modalGif, closeModal });
            return;
        }
        
        console.log('✅ Elementos del modal encontrados');
        
        // Configurar GIFs para cada botón
        const gifConfig = {
            'github-btn': 'images/fire-thank-you.gif',
            'discord-btn': 'images/fire-thank-you.gif',
            'download-btn': 'images/fire-thank-you.gif'
        };
        
        // Agregar event listeners a los botones CTA
        const ctaButtons = document.querySelectorAll('.cta-btn');
        console.log('🎯 Botones CTA encontrados:', ctaButtons.length);
        
        ctaButtons.forEach((button, index) => {
            console.log(`🎯 Configurando botón ${index}:`, button.className);
            
            // Remover event listeners anteriores si existen
            button.removeEventListener('click', button.clickHandler);
            
            // Crear nuevo handler
            button.clickHandler = function(e) {
                console.log('🖱️ Clic en botón CTA:', button.className);
                e.preventDefault();
                e.stopPropagation();
                
                const buttonClass = Array.from(button.classList).find(cls => cls.includes('-btn'));
                const gifSrc = gifConfig[buttonClass] || 'images/fire-thank-you.gif';
                const buttonHref = button.getAttribute('href');
                
                console.log('📁 GIF configurado:', gifSrc);
                console.log('🔗 Enlace del botón:', buttonHref);
                
                // Mostrar modal con GIF
                showGifModal(gifSrc, buttonHref);
            };
            
            button.addEventListener('click', button.clickHandler);
        });
        
        // Cerrar modal con X
        closeModal.addEventListener('click', () => {
            console.log('❌ Cerrando modal con X');
            hideGifModal();
        });
        
        // Cerrar modal haciendo clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('❌ Cerrando modal con clic fuera');
                hideGifModal();
            }
        });
        
        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                console.log('❌ Cerrando modal con ESC');
                hideGifModal();
            }
        });
        
        console.log('✅ Modal GIF inicializado correctamente');
    }, 1000); // Esperar 1 segundo
}

// Mostrar modal con GIF
function showGifModal(gifSrc, buttonHref) {
    console.log('🎬 Mostrando modal GIF...');
    console.log('📁 GIF source:', gifSrc);
    console.log('🔗 Button href:', buttonHref);
    
    const modal = document.getElementById('gif-modal');
    const modalGif = document.getElementById('modal-gif');
    
    if (!modal || !modalGif) {
        console.error('❌ Modal o GIF no encontrados');
        return;
    }
    
    // Mostrar modal inmediatamente
    modal.style.display = 'block';
    console.log('🎭 Modal mostrado');
    
    // Configurar GIF
    modalGif.src = gifSrc;
    console.log('🖼️ Cargando GIF:', gifSrc);
    
    // Reproducir sonido
    playSound('click');
    
    // Detectar cuando el GIF termine (aproximadamente 3 segundos)
    setTimeout(() => {
        console.log('⏰ Tiempo del GIF completado');
        hideGifModal();
        
        // Abrir enlace en nueva pestaña
        if (buttonHref && buttonHref !== '#') {
            console.log('🔗 Abriendo enlace:', buttonHref);
            window.open(buttonHref, '_blank');
        }
    }, 3000);
    
    // Fallback si el GIF no carga
    modalGif.onerror = () => {
        console.error('❌ Error cargando GIF:', gifSrc);
        console.log('🎭 Modal ya está mostrado, continuando...');
    };
}

// Ocultar modal
function hideGifModal() {
    console.log('❌ Ocultando modal');
    const modal = document.getElementById('gif-modal');
    if (modal) {
        modal.style.display = 'none';
        console.log('✅ Modal ocultado');
    } else {
        console.error('❌ Modal no encontrado para ocultar');
    }
}

// Función de prueba para el modal
function testModal() {
    console.log('🧪 Probando modal...');
    showGifModal('images/fire-thank-you.gif', 'https://github.com/zatobox');
}

// Reproducir sonido optimizado
function playSound(type) {
    const audio = document.getElementById('click-sound');
    if (audio) {
        // Resetear a 0 para permitir múltiples clicks rápidos
        audio.currentTime = 0;
        // Configurar volumen
        audio.volume = 0.3;
        // Reproducir inmediatamente
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                // Ignorar errores de autoplay en navegadores estrictos
                console.log('Audio bloqueado por navegador:', e.message);
            });
        }
    }
}

// Animaciones adicionales
function initAnimations() {
    // Animación de estrellas
    createStars();
    
    // Animación de partículas Matrix
    createMatrixParticles();
    
    // Efecto de hover en las tarjetas
    const cards = document.querySelectorAll('.feature-card, .feature-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Efecto de clic en las tarjetas
        card.addEventListener('click', () => {
            // Efecto visual de la tarjeta
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1.05) rotate(1deg)';
            }, 100);
        });
    });
    
    // Efecto de escritura en el código
    const codeBlock = document.querySelector('.code-block code');
    if (codeBlock) {
        const originalCode = codeBlock.textContent;
        codeBlock.textContent = '';
        let codeIndex = 0;
        
        function typeCode() {
            if (codeIndex < originalCode.length) {
                codeBlock.textContent += originalCode.charAt(codeIndex);
                codeIndex++;
                setTimeout(typeCode, 30);
            }
        }
        
        // Iniciar después de que aparezca en pantalla
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeCode, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(codeBlock);
    }
}

// Crear estrellas animadas
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s infinite;
        `;
        starsContainer.appendChild(star);
    }
}

// Crear partículas Matrix
function createMatrixParticles() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.textContent = '01';
        particle.style.cssText = `
            position: absolute;
            color: #00ff00;
            font-family: 'VT323', monospace;
            font-size: 12px;
            left: ${Math.random() * 100}%;
            animation: matrix-fall ${5 + Math.random() * 10}s linear infinite;
            opacity: 0.3;
        `;
        matrixBg.appendChild(particle);
    }
    
    // Agregar CSS para la animación
    if (!document.querySelector('#matrix-css')) {
        const style = document.createElement('style');
        style.id = 'matrix-css';
        style.textContent = `
            @keyframes matrix-fall {
                0% {
                    transform: translateY(-100vh);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(100vh);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Actualizar timestamps
function updateTimestamps() {
    const now = new Date();
    const dateString = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const lastUpdateElements = document.querySelectorAll('#last-update, #footer-date');
    lastUpdateElements.forEach(element => {
        element.textContent = dateString;
    });
}

// Actualizar contador de visitantes
function updateVisitorCount() {
    const visitorCount = document.getElementById('visitor-count');
    if (visitorCount) {
        // Número base de hackers rebeldes
        let count = 1337;
        
        // Incrementar aleatoriamente
        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            visitorCount.textContent = count.toLocaleString();
        }, 5000);
    }
}

// Efecto de glitch aleatorio en el título
function randomGlitch() {
    const title = document.querySelector('.main-title');
    if (title) {
        setInterval(() => {
            title.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                title.style.filter = 'none';
            }, 100);
        }, 10000);
    }
}

// Efecto de vibración en elementos
function addVibrationEffect() {
    const elements = document.querySelectorAll('.feature-item, .contribution-item');
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'vibrate 0.1s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'none';
        });
    });
    
    // Agregar CSS para vibración
    if (!document.querySelector('#vibrate-css')) {
        const style = document.createElement('style');
        style.id = 'vibrate-css';
        style.textContent = `
            @keyframes vibrate {
                0%, 100% { transform: translate(0); }
                25% { transform: translate(-1px, 1px); }
                50% { transform: translate(-1px, -1px); }
                75% { transform: translate(1px, -1px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Formulario del guestbook (falso)
function initGuestbook() {
    const form = document.querySelector('.guestbook-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value || 'Anonymous_Coward';
            const message = document.getElementById('message').value || '¡Software libre o muerte!';
            
            // Mostrar mensaje de confirmación
            showMessage(`¡Gracias ${name}! Tu mensaje rebelde ha sido registrado: "${message}"`);
            
            // Limpiar formulario
            form.reset();
        });
    }
}

// Mostrar mensaje
function showMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
        border: 2px solid #00ff00;
        color: #00ff00;
        padding: 20px;
        z-index: 10000;
        font-family: 'VT323', monospace;
        font-size: 18px;
        text-align: center;
        max-width: 400px;
        animation: message-appear 0.5s ease-out;
    `;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
    
    // Agregar CSS para la animación
    if (!document.querySelector('#message-css')) {
        const style = document.createElement('style');
        style.id = 'message-css';
        style.textContent = `
            @keyframes message-appear {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar efectos adicionales
setTimeout(() => {
    randomGlitch();
    addVibrationEffect();
    initGuestbook();
}, 2000);

// Efecto de cursor personalizado
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: #00ff00;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        animation: cursor-fade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 500);
});

// Agregar CSS para el cursor
if (!document.querySelector('#cursor-css')) {
    const style = document.createElement('style');
    style.id = 'cursor-css';
    style.textContent = `
        @keyframes cursor-fade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}











// Mensaje de consola
console.log(`
╔══════════════════════════════════════╗
║  🎮 ZATOBOX v1.0 - REBELIÓN ACTIVA  ║
║  🔓 CÓDIGO ABIERTO - LIBERTAD TOTAL  ║
║  🌍 DESENTRALIZADO - COMUNIDAD GLOBAL ║
╚══════════════════════════════════════╝

¡Bienvenido al universo ZatoBox!
Easter eggs disponibles:
- Clic en el título: Gato bailando
- Presiona F: Fuegos artificiales
- Konami Code: Lluvia de emojis
- Scroll al final: Cinta VHS

¡Instala, forkea y comparte!
`); 