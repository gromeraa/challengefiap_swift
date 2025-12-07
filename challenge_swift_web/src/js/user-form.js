// Alternar visibilidade da senha
const toggleIcons = document.querySelectorAll('.toggle-password');
toggleIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        const input = document.getElementById(this.dataset.input);
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
});
