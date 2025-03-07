// ===== INICIALIZACIÓN AL CARGAR EL DOCUMENTO =====
document.addEventListener('DOMContentLoaded', function() {
    // ===== ELEMENTOS DEL DOM =====
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.querySelector('.toggle-password');
    const loginButton = document.querySelector('.login-btn');
    const btnLoader = document.querySelector('.btn-loader');
    const googleBtn = document.querySelector('.google-btn');
    const microsoftBtn = document.querySelector('.microsoft-btn');
    
    // ===== VALIDACIÓN DEL FORMULARIO =====
    // Función para validar correo electrónico
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para validar contraseña (mínimo 6 caracteres)
    function validarPassword(password) {
        return password.length >= 6;
    }
    
    // Mostrar mensaje de error
    function mostrarError(input, mensaje) {
        // Verificamos si ya existe un mensaje de error
        let errorElement = input.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = mensaje;
        input.style.borderColor = 'var(--secondary-color)';
    }
    
    // Eliminar mensaje de error
    function eliminarError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '#e0e0e0';
    }
    
    // ===== EFECTOS DE INTERFAZ =====
    // Alternar visibilidad de la contraseña
    function alternarVisibilidadPassword() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordButton.classList.remove('fa-eye-slash');
            togglePasswordButton.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            togglePasswordButton.classList.remove('fa-eye');
            togglePasswordButton.classList.add('fa-eye-slash');
        }
    }
    
    // Simular carga en el botón de inicio de sesión
    function simularCarga() {
        // Activar animación de carga
        btnLoader.classList.add('active');
        loginButton.querySelector('span').textContent = 'Iniciando...';
        
        // Deshabilitar el botón durante la carga
        loginButton.disabled = true;
        loginButton.style.opacity = '0.8';
        
        // Simulamos un tiempo de carga (2 segundos)
        setTimeout(() => {
            // Aquí normalmente manejaríamos la respuesta del servidor
            btnLoader.classList.remove('active');
            loginButton.querySelector('span').textContent = '¡Bienvenido!';
            loginButton.style.backgroundColor = '#9C27B0'; // Púrpura de éxito
            
            // Simulamos redirección al dashboard después de 1 segundo
            setTimeout(() => {
                alert('¡Inicio de sesión exitoso! Redirigiendo al dashboard...');
                loginButton.querySelector('span').textContent = 'Iniciar Sesión';
                loginButton.disabled = false;
                loginButton.style.opacity = '1';
                loginButton.style.backgroundColor = 'var(--primary-color)';
                // Aquí normalmente redirigimos: window.location.href = 'dashboard.html';
            }, 1000);
        }, 2000);
    }
    
    // ===== EFECTOS FLOTANTES PARA LAS ETIQUETAS =====
    // Función para manejar las etiquetas flotantes cuando hay contenido
    function manejarEtiquetasFlotantes() {
        const inputs = document.querySelectorAll('.input-group input');
        
        inputs.forEach(input => {
            // Manejar estado inicial
            if (input.value !== '') {
                const label = input.nextElementSibling;
                label.style.top = '0';
                label.style.left = '12px';
                label.style.fontSize = '12px';
                label.style.backgroundColor = 'var(--white)';
                label.style.padding = '0 5px';
                label.style.color = 'var(--primary-color)';
            }
            
            // Manejamos el evento input
            input.addEventListener('input', function() {
                const label = this.nextElementSibling;
                
                if (this.value !== '') {
                    label.style.top = '0';
                    label.style.left = '12px';
                    label.style.fontSize = '12px';
                    label.style.backgroundColor = 'var(--white)';
                    label.style.padding = '0 5px';
                    label.style.color = 'var(--primary-color)';
                } else {
                    label.style.top = '50%';
                    label.style.left = '16px';
                    label.style.fontSize = '16px';
                    label.style.backgroundColor = 'transparent';
                    label.style.padding = '0';
                    label.style.color = 'var(--text-lighter)';
                    label.style.transform = 'translateY(-50%)';
                }
            });
        });
    }
    
    // ===== MANEJADORES DE EVENTOS =====
    // Evento para mostrar/ocultar contraseña
    togglePasswordButton.addEventListener('click', alternarVisibilidadPassword);
    
    // Eventos de validación en tiempo real
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() !== '' && !validarEmail(this.value)) {
            mostrarError(this, 'Por favor, introduce un correo electrónico válido');
        } else {
            eliminarError(this);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (this.value.trim() !== '' && !validarPassword(this.value)) {
            mostrarError(this, 'La contraseña debe tener al menos 6 caracteres');
        } else {
            eliminarError(this);
        }
    });
    
    // Evento de envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación del formulario
        let esValido = true;
        
        if (!validarEmail(emailInput.value)) {
            mostrarError(emailInput, 'Por favor, introduce un correo electrónico válido');
            esValido = false;
        } else {
            eliminarError(emailInput);
        }
        
        if (!validarPassword(passwordInput.value)) {
            mostrarError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
            esValido = false;
        } else {
            eliminarError(passwordInput);
        }
        
        // Si el formulario es válido, procesamos el inicio de sesión
        if (esValido) {
            simularCarga();
        }
    });
    
    // Eventos para los botones de inicio de sesión alternativos
    googleBtn.addEventListener('click', function() {
        alert('Iniciando sesión con Google...');
    });
    
    microsoftBtn.addEventListener('click', function() {
        alert('Iniciando sesión con Microsoft...');
    });
    
    // Inicializamos el manejo de etiquetas flotantes
    manejarEtiquetasFlotantes();
    
    // Mensaje de bienvenida en consola
    console.log('¡Bienvenido a TalentPulse!');
    console.log('Desarrollado para la gestión de talento humano');
});