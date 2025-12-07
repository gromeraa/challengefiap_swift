document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica home page club ---
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        // Animação de entrada
        const subtitleElement = document.getElementById('subtitle');
        const contentToReveal = document.querySelectorAll('.content-to-reveal');
        const text = "Junte-se ao nosso programa de fidelidade";
        let index = 0;
        const typingSpeed = 70;

        function typeWriter() {
            if (index < text.length) {
                subtitleElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                contentToReveal.forEach(el => el.classList.add('visible'));
            }
        }
        typeWriter();

        // Navegação ao clicar em Entrar (club-home.html)
        loginButton.addEventListener('click', () => {
            window.location.href = "../pages/club-home.html";
        });
    }


    // --- Lógica (club-home.html) ---
    const resgatarBtn = document.getElementById('resgatarBtn');
    const historicoBtn = document.getElementById('historicoBtn');

    if (resgatarBtn) {
        resgatarBtn.addEventListener('click', () => {
            alert('Funcionalidade "Resgatar" seria implementada aqui.');
        });
    }

    if (historicoBtn) {
        historicoBtn.addEventListener('click', () => {
            alert('Funcionalidade "Histórico" seria implementada aqui.');
        });
    }
});