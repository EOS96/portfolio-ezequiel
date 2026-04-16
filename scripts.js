// Modo escuro com melhor tratamento
const darkModeToggle = document.getElementById('darkModeToggle');

function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-stars');
        localStorage.setItem('darkMode', 'disabled');
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    });
}

// Verificar preferência do sistema
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode === 'enabled') {
    setDarkMode(true);
} else if (savedDarkMode === 'disabled') {
    setDarkMode(false);
} else if (prefersDarkScheme.matches) {
    setDarkMode(true);
}

// Voltar ao topo
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    };
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Adicionar smooth scroll para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Formulário de contato (apenas na página contato.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulário
        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }
        
        // Coletar dados
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            assunto: document.getElementById('assunto').value,
            mensagem: document.getElementById('mensagem').value,
            data: new Date().toLocaleString('pt-BR')
        };
        
        // Simular envio (aqui você pode integrar com backend real)
        const feedback = document.getElementById('formFeedback');
        
        // Mostrar loading
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio (delay de 1.5 segundos)
        setTimeout(() => {
            // Salvar no localStorage para demonstração
            let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            // Mostrar mensagem de sucesso
            feedback.className = 'alert alert-success mb-4';
            feedback.innerHTML = `
                <i class="bi bi-check-circle-fill"></i> 
                <strong>Mensagem enviada com sucesso!</strong><br>
                Obrigado ${formData.nome}! Entrarei em contato em breve no e-mail ${formData.email}.
            `;
            feedback.classList.remove('d-none');
            
            // Resetar formulário
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                feedback.classList.add('d-none');
            }, 5000);
            
            // Scroll para o topo para ver a mensagem
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    });
    
    // Botão de reset
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            setTimeout(() => {
                contactForm.classList.remove('was-validated');
                const feedback = document.getElementById('formFeedback');
                feedback.classList.add('d-none');
            }, 100);
        });
    }
}