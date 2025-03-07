document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script cargado correctamente");

    // ----------- CONFIGURACIÓN INICIAL -----------
    if (!localStorage.getItem("username")) {
        localStorage.setItem("username", "admin");  // Usuario predeterminado
        localStorage.setItem("password", "1234");   // Contraseña predeterminada
    }

    // ----------- INICIO DE SESIÓN -----------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const savedUsername = localStorage.getItem("username");
            const savedPassword = localStorage.getItem("password");

            if (username === savedUsername && password === savedPassword) {
                alert("✅ Inicio de sesión exitoso");
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("❌ Usuario o contraseña incorrecta");
            }
        });
    }

    // ----------- CAMBIO DE CONTRASEÑA -----------
    const changePasswordForm = document.getElementById("changePasswordForm");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const oldPassword = document.getElementById("oldPassword").value.trim();
            const newPassword = document.getElementById("newPassword").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const savedPassword = localStorage.getItem("password");

            if (oldPassword !== savedPassword) {
                alert("❌ La contraseña actual es incorrecta.");
                return;
            }

            if (newPassword.length < 6) {
                alert("⚠️ La nueva contraseña debe tener al menos 6 caracteres.");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("⚠️ Las contraseñas no coinciden.");
                return;
            }

            localStorage.setItem("password", newPassword);
            alert("✅ Contraseña actualizada con éxito.");
            window.location.href = "dashboard.html";
        });
    }

    // ----------- CIERRE DE SESIÓN -----------
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn"); // Elimina la sesión
            alert("👋 Sesión cerrada correctamente.");
            window.location.replace("login.html");
        });
    }

    // ----------- VERIFICAR SESIÓN ACTIVA -----------
    if (window.location.pathname.includes("dashboard.html")) {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            alert("⚠️ Debes iniciar sesión primero.");
            window.location.href = "login.html";
        }
    }

    // ----------- TOGGLE MODO OSCURO -----------
    const toggleModeButton = document.getElementById("toggleMode");
    if (toggleModeButton) {
        toggleModeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        // Mantener modo oscuro si ya estaba activado
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }

    // ----------- MOSTRAR USUARIO CON API EXTERNA -----------
    const usernameSpan = document.getElementById("username");
    if (usernameSpan) {
        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then(response => response.json())
            .then(data => {
                usernameSpan.textContent = data.name; // Mostrar el nombre del usuario en el Dashboard
            })
            .catch(error => console.error("Error al obtener datos:", error));
    }
});
