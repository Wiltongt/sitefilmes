// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar funcionalidade aos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Adicionar efeito de loading
            const originalText = this.textContent;
            this.textContent = 'CARREGANDO...';
            this.classList.add('loading');
            
            // Simular redirecionamento após 2 segundos
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('loading');
                alert('Redirecionando para página de assinatura...');
            }, 2000);
        });
    });
    
    // Botão de ajuda
    const helpButton = document.querySelector('.help-btn');
    if (helpButton) {
        helpButton.addEventListener('click', function() {
            alert('Entre em contato conosco:\nEmail: suporte@dezpila.digital\nTelefone: (11) 99999-9999');
        });
    }
    
    // Animação de entrada para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.benefit-item, .plan, .catalog-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Responsividade para menu mobile (se necessário no futuro)
    function handleResize() {
        const width = window.innerWidth;
        const heroContent = document.querySelector('.hero-content');
        
        if (width <= 768 && heroContent) {
            heroContent.style.flexDirection = 'column';
        } else if (heroContent) {
            heroContent.style.flexDirection = 'row';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Executar na inicialização
    
    // Adicionar efeito de hover nos planos
    const plans = document.querySelectorAll('.plan');
    plans.forEach(plan => {
        plan.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        plan.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Validação básica e feedback visual
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Adicionar efeito ripple aos botões
    ctaButtons.forEach(addRippleEffect);
    
    // Lazy loading para imagens (quando adicionadas)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// CSS para efeito ripple
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

