// ZatoBox - La Rebelión del Software Libre
// Script principal con efectos retro y easter eggs

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ZatoBox cargado - ¡La rebelión ha comenzado!');
    
    // Inicializar pantalla VHS de carga
    initVHSLoadingScreen();
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
    
    // Verificar si los elementos existen antes de usarlos
    if (!dancingCat) {
        console.log('⚠️ Elemento dancing-cat no encontrado');
    }
    if (!fireworks) {
        console.log('⚠️ Elemento fireworks no encontrado');
    }
    if (!vhsTape) {
        console.log('⚠️ Elemento vhs-tape no encontrado');
    }
    
    // Gato bailando - aparece al hacer clic en el título
    const siteLogo = document.querySelector('.site-logo');
    if (siteLogo) {
        siteLogo.addEventListener('click', () => {
            if (dancingCat) {
                showEasterEgg(dancingCat, 3000);
            }
            playSound('click');
        });
    }
    
    // Funcionalidad de los botones del panel de control (desktop y mobile)
    const controlButtons = document.querySelectorAll('.control-btn');
    const mobileControlButtons = document.querySelectorAll('.mobile-control-btn');
    const statusText = document.querySelector('.status-text');
    const mobileStatusText = document.querySelector('.mobile-status-text');
    const loadingBar = document.querySelector('.loading-bar');
    
    // Inicializar panel de control móvil
    initMobileControlPanel();
    
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
    
    // Configurar panel de control desktop con nueva funcionalidad
    if (controlButtons && controlButtons.length > 0) {
        controlButtons.forEach((button, index) => {
            if (button) {
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
            }
        });
    }
    

    
    // Fuegos artificiales - aparece al presionar F
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f' || e.key === 'F') {
            if (fireworks) {
                showEasterEgg(fireworks, 2000);
            }
            playSound('click');
        }
    });
    
    // Cinta VHS - aparece al hacer scroll hasta el final
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            if (vhsTape) {
                showEasterEgg(vhsTape, 5000);
            }
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

// Inicializar panel de control móvil
function initMobileControlPanel() {
    // Prevenir inicialización múltiple
    if (window.mobilePanelInitialized) {
        console.log('📱 Panel móvil ya inicializado, saltando...');
        return;
    }
    
    console.log('📱 Inicializando panel de control móvil...');
    
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileContent = document.querySelector('.mobile-control-content');
    const mobileStatusText = document.querySelector('.mobile-status-text');
    
    // Botones móviles específicos
    const mobileHomeBtn = document.getElementById('mobileHomeBtn');
    const mobileBackBtn = document.getElementById('mobileBackBtn');
    const mobileForwardBtn = document.getElementById('mobileForwardBtn');
    const mobileAlcolabsBtn = document.getElementById('mobileAlcolabsBtn');
    const mobileMusicBtn = document.getElementById('mobileMusicBtn');
    
    // Toggle del menú móvil - Prevenir múltiples event listeners
    if (mobileToggle && mobileContent) {
        // Remover event listeners anteriores si existen
        mobileToggle.removeEventListener('click', mobileToggle.toggleHandler);
        
        // Crear handler único
        mobileToggle.toggleHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('📱 Clic en toggle móvil');
            playSound('click');
            
            // Toggle del estado activo
            const isActive = mobileContent.classList.contains('active');
            console.log('📱 Estado actual:', isActive ? 'abierto' : 'cerrado');
            
            if (isActive) {
                // Cerrar el panel
                mobileContent.classList.remove('active');
                mobileToggle.textContent = '☰';
                console.log('📱 Panel cerrado');
            } else {
                // Abrir el panel
                mobileContent.classList.add('active');
                mobileToggle.textContent = '✕';
                console.log('📱 Panel abierto');
            }
        };
        
        // Agregar event listener
        mobileToggle.addEventListener('click', mobileToggle.toggleHandler);
        
        // Asegurar estado inicial
        mobileContent.classList.remove('active');
        mobileToggle.textContent = '☰';
        console.log('📱 Estado inicial del panel móvil: cerrado');
    }
    
    // Funcionalidad de botones móviles - misma lógica que desktop
    if (mobileHomeBtn) {
        mobileHomeBtn.addEventListener('click', () => {
            console.log('🏠 Navegando a home (móvil)...');
            playSound('click');
            handleDesktopNavigation('home');
            
            // Efecto visual
            mobileHomeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mobileHomeBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (mobileBackBtn) {
        mobileBackBtn.addEventListener('click', () => {
            console.log('⬅️ Navegando atrás (móvil)...');
            playSound('click');
            handleDesktopNavigation('back');
            
            // Efecto visual
            mobileBackBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mobileBackBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (mobileForwardBtn) {
        mobileForwardBtn.addEventListener('click', () => {
            console.log('➡️ Navegando adelante (móvil)...');
            playSound('click');
            handleDesktopNavigation('forward');
            
            // Efecto visual
            mobileForwardBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mobileForwardBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (mobileAlcolabsBtn) {
        mobileAlcolabsBtn.addEventListener('click', () => {
            console.log('🎭 Abriendo modal de Alcolabs (móvil)...');
            playSound('click');
            showAlcolabsModal();
            
            // Efecto visual
            mobileAlcolabsBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mobileAlcolabsBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (mobileMusicBtn) {
        mobileMusicBtn.addEventListener('click', () => {
            console.log('🎵 Toggle música (móvil)...');
            playSound('click');
            toggleMusic();
            
            // Efecto visual
            mobileMusicBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mobileMusicBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    console.log('✅ Panel de control móvil inicializado');
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
            statusElement.textContent = 'Navigating to home...';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.currentSectionIndex = 0;
            
            setTimeout(() => {
                statusElement.textContent = 'Home loaded ✅';
            }, 500);
            break;
            
        case 'back':
            if (window.currentSectionIndex > 0) {
                window.currentSectionIndex--;
                const section = sections[window.currentSectionIndex];
                statusElement.textContent = 'Navigating back...';
                
                const sectionElement = document.querySelector(section.selector);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                setTimeout(() => {
                    statusElement.textContent = `📍 ${section.title}`;
                }, 500);
            } else {
                statusElement.textContent = '⚠️ First section';
                setTimeout(() => {
                    if (statusElement) {
                        statusElement.textContent = 'Active rebellion...';
                    }
                }, 2000);
            }
            break;
            
        case 'forward':
            if (window.currentSectionIndex < sections.length - 1) {
                window.currentSectionIndex++;
                const section = sections[window.currentSectionIndex];
                statusElement.textContent = 'Navigating forward...';
                
                const sectionElement = document.querySelector(section.selector);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                setTimeout(() => {
                    statusElement.textContent = `📍 ${section.title}`;
                }, 500);
            } else {
                statusElement.textContent = '⚠️ Last section';
                setTimeout(() => {
                    if (statusElement) {
                        statusElement.textContent = 'Active rebellion...';
                    }
                }, 2000);
            }
            break;
            
        case 'reload':
            statusElement.textContent = 'Reloading rebellion...';
            
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
                if (statusElement) {
                    statusElement.textContent = '⚡ Successfully reloaded';
                    setTimeout(() => {
                        if (statusElement) {
                            statusElement.textContent = 'Active rebellion...';
                        }
                    }, 2000);
                }
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
// Variables globales para la música
let backgroundMusic, musicBtn, musicPlaying = false;

function initSoundEffects() {
    const clickSound = document.getElementById('click-sound');
    backgroundMusic = document.getElementById('background-music');
    musicBtn = document.getElementById('musicBtn');
    
    // Precargar el audio para reducir latencia
    if (clickSound) {
        clickSound.preload = 'auto';
        clickSound.volume = 0.3;
    }
    
    // Configurar música de fondo
    if (backgroundMusic) {
        backgroundMusic.preload = 'auto';
        backgroundMusic.volume = 0.6; // 60% del volumen
        backgroundMusic.loop = true;
    }
    
    // Configurar botón de música desktop
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
        // Inicializar icono del botón
        musicBtn.innerHTML = '🔇';
        musicBtn.title = 'Play/Pause music';
    }
    
    // Configurar botón de música móvil
    const mobileMusicBtn = document.getElementById('mobileMusicBtn');
    if (mobileMusicBtn) {
        mobileMusicBtn.addEventListener('click', toggleMusic);
        // Inicializar icono del botón móvil
        mobileMusicBtn.innerHTML = '🔇';
        mobileMusicBtn.title = 'Play/Pause music';
    }
    
    // Seleccionar TODOS los elementos clickeables (desktop y mobile)
    const clickableElements = document.querySelectorAll(`
        button, 
        .cta-btn, 
        .control-btn,
        .mobile-control-btn,
        .mobile-menu-toggle,
        .feature-card, 
        .feature-item, 
        .contribution-item,
        .site-logo,
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
// Función para controlar la música de fondo
function toggleMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const musicBtn = document.getElementById('musicBtn');
    const mobileMusicBtn = document.getElementById('mobileMusicBtn');
    
    if (!backgroundMusic) {
        console.error('❌ Elemento de música de fondo no encontrado');
        return;
    }
    
    // Si la música no tiene src, cargarla primero
    if (!backgroundMusic.src || backgroundMusic.src === window.location.href) {
        backgroundMusic.src = 'sounds/Lost in the Matrix.mp3';
        console.log('🎵 Música cargada bajo demanda');
    }
    
    if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            console.log('🎵 Música iniciada');
            if (musicBtn) musicBtn.textContent = '⏸️';
            if (mobileMusicBtn) mobileMusicBtn.textContent = '⏸️';
        }).catch(error => {
            console.error('❌ Error al reproducir música:', error);
        });
    } else {
        backgroundMusic.pause();
        console.log('🎵 Música pausada');
        if (musicBtn) musicBtn.textContent = '🎵';
        if (mobileMusicBtn) mobileMusicBtn.textContent = '🎵';
    }
}

// Función para inicializar la música de fondo desde la pantalla VHS
function initBackgroundMusic() {
    console.log('🎵 Inicializando música de fondo...');
    
    const backgroundMusic = document.getElementById('background-music');
    const musicBtn = document.getElementById('musicBtn');
    const mobileMusicBtn = document.getElementById('mobileMusicBtn');
    
    if (!backgroundMusic) {
        console.error('❌ Elemento de música de fondo no encontrado');
        return;
    }
    
    // Configurar música
    backgroundMusic.volume = 0.6;
    backgroundMusic.loop = true;
    
    // Variable para controlar si la música ya se cargó
    let musicLoaded = false;
    
    // Función para cargar música bajo demanda
    function loadMusic() {
        if (!musicLoaded) {
            backgroundMusic.src = 'sounds/Lost in the Matrix.mp3';
            musicLoaded = true;
            console.log('🎵 Música cargada bajo demanda');
        }
    }
    
    // Función para alternar música
    function toggleMusic() {
        if (!musicLoaded) {
            loadMusic();
        }
        
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                console.log('🎵 Música iniciada');
                if (musicBtn) musicBtn.textContent = '⏸️';
                if (mobileMusicBtn) mobileMusicBtn.textContent = '⏸️';
            }).catch(error => {
                console.error('❌ Error al reproducir música:', error);
            });
        } else {
            backgroundMusic.pause();
            console.log('🎵 Música pausada');
            if (musicBtn) musicBtn.textContent = '🎵';
            if (mobileMusicBtn) mobileMusicBtn.textContent = '🎵';
        }
    }
    
    // Event listeners para botones de música
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            console.log('🎵 Clic en botón de música (desktop)');
            playSound('click');
            toggleMusic();
        });
    }
    
    if (mobileMusicBtn) {
        mobileMusicBtn.addEventListener('click', () => {
            console.log('🎵 Clic en botón de música (móvil)');
            playSound('click');
            toggleMusic();
        });
    }
    
    console.log('✅ Música de fondo inicializada (carga bajo demanda)');
}

// Función para crear degradado suave del volumen
function startVolumeFade() {
    if (!backgroundMusic || !musicPlaying) return;
    
    console.log('🎵 Starting volume fade: 60% → 40% in 20 seconds');
    
    const startVolume = 0.6; // 60%
    const endVolume = 0.4;   // 40%
    const fadeDuration = 20000; // 20 segundos
    const fadeSteps = 200; // 200 pasos para transición suave
    const stepDuration = fadeDuration / fadeSteps;
    
    let currentStep = 0;
    
    const fadeInterval = setInterval(() => {
        currentStep++;
        
        // Calcular volumen actual usando función de suavizado
        const progress = currentStep / fadeSteps;
        const currentVolume = startVolume - (startVolume - endVolume) * progress;
        
        backgroundMusic.volume = currentVolume;
        
        if (currentStep >= fadeSteps) {
            clearInterval(fadeInterval);
            console.log('🎵 Volume fade completed: now at 40% (background music)');
        }
    }, stepDuration);
}

// Función para iniciar la música automáticamente
function startBackgroundMusic() {
    if (backgroundMusic) {
        // Iniciar música inmediatamente cuando se abre la página
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicPlaying = true;
                musicBtn.innerHTML = '🎵';
                musicBtn.title = 'Pausar música';
                console.log("Música de fondo iniciada");
            }).catch(error => {
                console.log("Autoplay bloqueado, usuario debe iniciar música manualmente");
                musicBtn.innerHTML = '🔇';
                musicBtn.title = 'Reproducir música';
                musicPlaying = false;
                
                // Si el autoplay falla, permitir al usuario iniciar con cualquier interacción
                document.addEventListener('click', function startMusicOnInteraction() {
                    if (!musicPlaying) {
                        backgroundMusic.play().then(() => {
                            musicPlaying = true;
                            musicBtn.innerHTML = '🎵';
                            musicBtn.title = 'Pausar música';
                        });
                        document.removeEventListener('click', startMusicOnInteraction);
                    }
                }, { once: true });
            });
        }
    }
}

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
            console.log('❌ Cerrando modal GIF con X');
            playSound('click');
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
    initLogoGlitchEffect();
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

// Efecto de glitch del logo
function initLogoGlitchEffect() {
    const logo = document.getElementById('zatobox-logo');
    if (!logo) return;
    
    const normalLogo = 'images/Frame 48095649 2.png';
    const glitchLogo = 'images/Frame 48095649 glich.png';
    
    console.log('🎨 Iniciando efecto de glitch del logo...');
    
    function performGlitchCycle() {
        // Fase 1: Glitch inicial (cambiar a logo con glitch)
        setTimeout(() => {
            logo.src = glitchLogo;
            logo.style.filter = 'hue-rotate(180deg) contrast(200%) brightness(150%)';
            console.log('👾 Glitch activado - Logo cambiado');
        }, 500);
        
        // Fase 2: Volver al logo normal
        setTimeout(() => {
            logo.src = normalLogo;
            logo.style.filter = 'none';
            console.log('✅ Logo restaurado');
        }, 1500);
        
        // Fase 3: Segundo glitch más intenso
        setTimeout(() => {
            logo.src = glitchLogo;
            logo.style.filter = 'hue-rotate(90deg) contrast(300%) brightness(200%) saturate(200%)';
            logo.style.transform = 'translate(2px, -2px) scale(1.02)';
            console.log('⚡ Segundo glitch intenso');
        }, 3000);
        
        // Fase 4: Restaurar completamente y aplicar shake
        setTimeout(() => {
            logo.src = normalLogo;
            logo.style.filter = 'none';
            logo.style.transform = 'none';
            
            // Efecto de vibración al restaurar
            logo.style.animation = 'logo-shake 0.5s ease-in-out';
            setTimeout(() => {
                logo.style.animation = 'none';
            }, 500);
            
            console.log('🔄 Logo completamente restaurado');
        }, 4000);
    }
    
    // Iniciar el primer ciclo después de 3 segundos
    setTimeout(() => {
        performGlitchCycle();
        
        // Repetir cada 15 segundos
        setInterval(() => {
            console.log('🔄 Iniciando nuevo ciclo de glitch...');
            performGlitchCycle();
        }, 15000);
        
    }, 3000);
    
    // Agregar CSS para la animación de shake
    if (!document.querySelector('#logo-shake-css')) {
        const style = document.createElement('style');
        style.id = 'logo-shake-css';
        style.textContent = `
            @keyframes logo-shake {
                0%, 100% { transform: translateX(0); }
                10% { transform: translateX(-2px) rotate(-1deg); }
                20% { transform: translateX(2px) rotate(1deg); }
                30% { transform: translateX(-2px) rotate(-1deg); }
                40% { transform: translateX(2px) rotate(1deg); }
                50% { transform: translateX(-1px) rotate(-0.5deg); }
                60% { transform: translateX(1px) rotate(0.5deg); }
                70% { transform: translateX(-1px) rotate(-0.5deg); }
                80% { transform: translateX(1px) rotate(0.5deg); }
                90% { transform: translateX(0) rotate(0deg); }
            }
            
            @keyframes glitch-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
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

// ================================
// PANTALLA VHS DE CARGA RETRO
// ================================

function initVHSLoadingScreen() {
    console.log('📺 Iniciando pantalla VHS retro...');
    
    // Inicializar música de fondo inmediatamente
    initBackgroundMusic();
    
    const vhsScreen = document.getElementById('vhs-loading-screen');
    const timerElement = document.getElementById('vhs-timer');
    
    if (!vhsScreen || !timerElement) {
        console.error('❌ Elementos VHS no encontrados');
        initMainContent();
        return;
    }
    
    let timeLeft = 5;
    let interferenceCounter = 0;
    
    // Actualizar timer cada segundo
    const timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `LOADING... ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    
    // Interferencias cada 1 segundo (más frecuentes para 5 segundos)
    const interferenceInterval = setInterval(() => {
        interferenceCounter++;
        console.log(`📺 Interferencia ${interferenceCounter} - señal temporal clara`);
        
        // Crear efecto de interferencia que revela la pantalla
        createInterferenceFlash();
        
        if (interferenceCounter >= 4) { // 5 segundos / 1.25 = 4 interferencias
            clearInterval(interferenceInterval);
        }
    }, 1250);
    
    // Finalizar pantalla VHS después de 5 segundos
    setTimeout(() => {
        console.log('📺 Finalizando pantalla VHS - iniciando contenido principal');
        
        // Efecto de apagado de TV
        vhsScreen.style.animation = 'vhs-shutdown 1s ease-in forwards';
        
        setTimeout(() => {
            vhsScreen.style.display = 'none';
            initMainContent();
        }, 1000);
    }, 5000);
    
    // Inicializar funcionalidad de Alcolabs
    initAlcolabsModal();
    
    // Inicializar botones del navegador desktop
    initDesktopNavigator();
    
    // Permitir saltar la pantalla presionando cualquier tecla
    const skipHandler = (e) => {
        console.log('⏭️ Saltando pantalla VHS por input del usuario');
        clearInterval(timerInterval);
        clearInterval(interferenceInterval);
        
        vhsScreen.style.animation = 'vhs-shutdown 0.5s ease-in forwards';
        setTimeout(() => {
            vhsScreen.style.display = 'none';
            initMainContent();
        }, 500);
        
        document.removeEventListener('keydown', skipHandler);
        document.removeEventListener('click', skipHandler);
    };
    
    document.addEventListener('keydown', skipHandler);
    document.addEventListener('click', skipHandler);
}

function createInterferenceFlash() {
    const vhsScreen = document.getElementById('vhs-loading-screen');
    if (!vhsScreen) return;
    
    // Crear efecto glitch que revela la página principal
    const glitchReveal = document.createElement('div');
    glitchReveal.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        z-index: 9998;
        animation: glitch-reveal 1.2s ease-out;
        mix-blend-mode: multiply;
    `;
    
    // Crear destello glitch
    const glitchFlash = document.createElement('div');
    glitchFlash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            45deg,
            transparent 30%, 
            rgba(0,255,0,0.4) 50%, 
            transparent 70%
        );
        z-index: 9999;
        animation: glitch-flash 1.2s ease-out;
        mix-blend-mode: screen;
    `;
    
    // Crear líneas de interferencia horizontal
    const scanLines = document.createElement('div');
    scanLines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(255,255,255,0.1) 1px,
            transparent 2px,
            transparent 10px
        );
        z-index: 10000;
        animation: scan-glitch 1.2s ease-out;
        transform: translateX(-100%);
    `;
    
    vhsScreen.appendChild(glitchReveal);
    vhsScreen.appendChild(glitchFlash);
    vhsScreen.appendChild(scanLines);
    
    setTimeout(() => {
        glitchReveal.remove();
        glitchFlash.remove();
        scanLines.remove();
    }, 1200);
    
    // Agregar CSS para la animación si no existe
    if (!document.querySelector('#interference-flash-css')) {
        const style = document.createElement('style');
        style.id = 'interference-flash-css';
        style.textContent = `
            @keyframes glitch-reveal {
                0% { 
                    opacity: 1; 
                    transform: translateX(0) scaleX(1);
                    background: rgba(0,0,0,1);
                }
                15% { 
                    opacity: 0.6; 
                    transform: translateX(-2px) scaleX(0.98);
                    background: rgba(0,0,0,0.4);
                }
                30% { 
                    opacity: 0.2; 
                    transform: translateX(1px) scaleX(1.01);
                    background: rgba(0,0,0,0.1);
                }
                45% { 
                    opacity: 0.1; 
                    transform: translateX(-1px) scaleX(0.99);
                    background: rgba(0,0,0,0.05);
                }
                60% { 
                    opacity: 0.3; 
                    transform: translateX(0) scaleX(1);
                    background: rgba(0,0,0,0.2);
                }
                85% { 
                    opacity: 0.7; 
                    transform: translateX(1px) scaleX(1.005);
                    background: rgba(0,0,0,0.5);
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0) scaleX(1);
                    background: rgba(0,0,0,1);
                }
            }
            
            @keyframes glitch-flash {
                0% { 
                    opacity: 0; 
                    transform: translateX(-100%) rotate(0deg);
                }
                20% { 
                    opacity: 0.6; 
                    transform: translateX(-20%) rotate(1deg);
                }
                40% { 
                    opacity: 0.8; 
                    transform: translateX(30%) rotate(-0.5deg);
                }
                60% { 
                    opacity: 0.4; 
                    transform: translateX(80%) rotate(0.5deg);
                }
                80% { 
                    opacity: 0.2; 
                    transform: translateX(120%) rotate(0deg);
                }
                100% { 
                    opacity: 0; 
                    transform: translateX(150%) rotate(0deg);
                }
            }
            
            @keyframes scan-glitch {
                0% { 
                    opacity: 0; 
                    transform: translateX(-100%) translateY(0);
                }
                25% { 
                    opacity: 0.7; 
                    transform: translateX(-50%) translateY(-2px);
                }
                50% { 
                    opacity: 0.9; 
                    transform: translateX(0%) translateY(0);
                }
                75% { 
                    opacity: 0.5; 
                    transform: translateX(50%) translateY(1px);
                }
                100% { 
                    opacity: 0; 
                    transform: translateX(100%) translateY(0);
                }
            }
            
            @keyframes vhs-shutdown {
                0% { 
                    opacity: 1; 
                    transform: scale(1); 
                    filter: brightness(1); 
                }
                30% { 
                    opacity: 0.8; 
                    transform: scale(1.005); 
                    filter: brightness(1.1); 
                }
                70% { 
                    opacity: 0.3; 
                    transform: scale(0.995); 
                    filter: brightness(0.7); 
                }
                100% { 
                    opacity: 0; 
                    transform: scale(0.001); 
                    filter: brightness(0); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initMainContent() {
    console.log('🚀 Iniciando contenido principal de ZatoBox');
    
    // Inicializar todos los efectos principales
    initEffects();
    initEasterEggs();
    initSoundEffects();
    startBackgroundMusic();
    initAnimations();
    initGifModal();
    updateTimestamps();
    
    // Contador de visitantes falso
    updateVisitorCount();
    
    console.log('✅ Contenido principal cargado completamente');
}

// ================================
// FUNCIONALIDAD DE ALCOLABS
// ================================

function initAlcolabsModal() {
    console.log('🎭 Inicializando modal de Alcolabs...');
    
    const alcolabsBtn = document.getElementById('alcolabsBtn');
    const alcolabsModal = document.getElementById('alcolabs-modal');
    const closeAlcolabsModal = document.querySelector('.close-alcolabs-modal');
    
    if (!alcolabsBtn || !alcolabsModal || !closeAlcolabsModal) {
        console.error('❌ Elementos del modal de Alcolabs no encontrados');
        return;
    }
    
    // Event listener para abrir el modal
    alcolabsBtn.addEventListener('click', () => {
        console.log('🎭 Abriendo modal de Alcolabs...');
        showAlcolabsModal();
    });
    
    // Event listener para cerrar el modal
    closeAlcolabsModal.addEventListener('click', () => {
        console.log('❌ Cerrando modal de Alcolabs con X...');
        playSound('click');
        hideAlcolabsModal();
    });
    
    // Cerrar modal haciendo clic fuera
    alcolabsModal.addEventListener('click', (e) => {
        if (e.target === alcolabsModal) {
            console.log('❌ Cerrando modal de Alcolabs con clic fuera...');
            hideAlcolabsModal();
        }
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && alcolabsModal.style.display === 'block') {
            console.log('❌ Cerrando modal de Alcolabs con ESC...');
            hideAlcolabsModal();
        }
    });
    
    console.log('✅ Modal de Alcolabs inicializado correctamente');
}

function showAlcolabsModal() {
    const alcolabsModal = document.getElementById('alcolabs-modal');
    const countdownElement = document.getElementById('redirect-countdown');
    
    if (!alcolabsModal || !countdownElement) {
        console.error('❌ Elementos del modal de Alcolabs no encontrados');
        return;
    }
    
    // Mostrar modal
    alcolabsModal.style.display = 'block';
    console.log('🎭 Modal de Alcolabs mostrado');
    
    // Reproducir sonido
    playSound('click');
    
    // Iniciar countdown de redirección
    let countdown = 5;
    countdownElement.textContent = countdown;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            console.log('🌐 Redirigiendo a Alcolabs...');
            
            // Mostrar el enlace y hacer clic automáticamente
            const alcolabsLink = document.getElementById('alcolabs-link');
            if (alcolabsLink) {
                alcolabsLink.style.display = 'inline-block';
                alcolabsLink.click();
            }
            
            // Cerrar modal después de un breve delay
            setTimeout(() => {
                hideAlcolabsModal();
            }, 2000);
        }
    }, 1000);
    
    // Guardar el interval para poder cancelarlo si se cierra el modal
    alcolabsModal.countdownInterval = countdownInterval;
}

function hideAlcolabsModal() {
    const alcolabsModal = document.getElementById('alcolabs-modal');
    
    if (!alcolabsModal) {
        console.error('❌ Modal de Alcolabs no encontrado');
        return;
    }
    
    // Cancelar countdown si existe
    if (alcolabsModal.countdownInterval) {
        clearInterval(alcolabsModal.countdownInterval);
        alcolabsModal.countdownInterval = null;
    }
    
    // Ocultar modal
    alcolabsModal.style.display = 'none';
    console.log('✅ Modal de Alcolabs ocultado');
}

// ================================
// NAVEGADOR DESKTOP
// ================================

function initDesktopNavigator() {
    console.log('🖥️ Inicializando navegador desktop...');
    
    const homeBtn = document.getElementById('homeBtn');
    const backBtn = document.getElementById('backBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    
    if (!homeBtn || !backBtn || !forwardBtn) {
        console.error('❌ Botones del navegador desktop no encontrados');
        return;
    }
    
    // Event listeners para los botones
    homeBtn.addEventListener('click', () => {
        console.log('🏠 Navegando a home...');
        playSound('click');
        handleDesktopNavigation('home');
    });
    
    backBtn.addEventListener('click', () => {
        console.log('⬅️ Navegando atrás...');
        playSound('click');
        handleDesktopNavigation('back');
    });
    
    forwardBtn.addEventListener('click', () => {
        console.log('➡️ Navegando adelante...');
        playSound('click');
        handleDesktopNavigation('forward');
    });
    
    console.log('✅ Navegador desktop inicializado correctamente');
}

function handleDesktopNavigation(action) {
    const sections = [
        { title: 'Welcome', selector: '.welcome-section' },
        { title: 'What is ZatoBox?', selector: '.what-is-section' },
        { title: 'Why do we do it?', selector: '.why-section' },
        { title: 'What do we offer?', selector: '.features-section' },
        { title: 'How to collaborate?', selector: '.collaborate-section' },
        { title: 'Call to Action', selector: '.cta-section' }
    ];
    
    if (!window.currentSectionIndex) {
        window.currentSectionIndex = 0;
    }
    
    switch(action) {
        case 'home':
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.currentSectionIndex = 0;
            console.log('✅ Navegado a home');
            break;
            
        case 'back':
            if (window.currentSectionIndex > 0) {
                window.currentSectionIndex--;
                const section = sections[window.currentSectionIndex];
                
                const sectionElement = document.querySelector(section.selector);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log(`✅ Navegado a: ${section.title}`);
                }
            } else {
                console.log('⚠️ Ya estás en la primera sección');
            }
            break;
            
        case 'forward':
            if (window.currentSectionIndex < sections.length - 1) {
                window.currentSectionIndex++;
                const section = sections[window.currentSectionIndex];
                
                const sectionElement = document.querySelector(section.selector);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log(`✅ Navegado a: ${section.title}`);
                }
            } else {
                console.log('⚠️ Ya estás en la última sección');
            }
            break;
    }
}

// ================================
// FUNCIÓN PARA SCROLL A JOIN SECTION
// ================================

function scrollToJoinSection() {
    console.log('🚨 Navegando a la sección JOIN THE PROJECT...');
    
    // Reproducir sonido de clic
    playSound('click');
    
    // Buscar la sección CTA
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        // Hacer scroll suave a la sección
        ctaSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Efecto visual en la sección de destino
        setTimeout(() => {
            ctaSection.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
            ctaSection.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                ctaSection.style.boxShadow = '';
                ctaSection.style.transform = '';
            }, 1000);
        }, 500);
        
        console.log('✅ Navegado a JOIN THE PROJECT');
    } else {
        console.error('❌ Sección CTA no encontrada');
    }
}

// ================================
// FUNCIÓN PARA TOOLTIPS EN MÓVILES
// ================================

function initMobileTooltips() {
    console.log('📱 Inicializando tooltips para móviles...');
    
    // Solo activar en dispositivos móviles
    if (window.innerWidth <= 768) {
        const tooltipCards = document.querySelectorAll('.feature-card-with-tooltip');
        let scrollTimeout;
        let shownCards = new Set();
        
        // Función para verificar si un elemento está en el viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Mostrar cuando la tarjeta está en el centro del viewport
            return (
                rect.top <= windowHeight * 0.7 &&
                rect.bottom >= windowHeight * 0.3
            );
        }
        
        // Función para manejar el scroll con debounce
        function handleScroll() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                tooltipCards.forEach(card => {
                    if (isInViewport(card) && !shownCards.has(card)) {
                        // Marcar como mostrada
                        shownCards.add(card);
                        
                        // Mostrar tooltip con delay
                        setTimeout(() => {
                            card.classList.add('show-tooltip');
                        }, 300);
                        
                        // Ocultar tooltip después de 4 segundos
                        setTimeout(() => {
                            card.classList.remove('show-tooltip');
                        }, 4000);
                    }
                });
            }, 100);
        }
        
        // Escuchar eventos de scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Ejecutar una vez al cargar
        setTimeout(handleScroll, 1000);
        
        console.log('✅ Tooltips móviles inicializados');
    }
}

// Inicializar tooltips móviles cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initMobileTooltips();
    
    // Reinicializar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        // Remover tooltips activos
        document.querySelectorAll('.show-tooltip').forEach(card => {
            card.classList.remove('show-tooltip');
        });
        
        // Reinicializar
        initMobileTooltips();
    });
}); 