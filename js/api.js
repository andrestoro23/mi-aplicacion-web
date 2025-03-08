document.addEventListener("DOMContentLoaded", () => {
    const userContainer = document.getElementById("randomUser");

    if (userContainer) {
        fetch("https://randomuser.me/api/")
            .then(response => response.json())
            .then(data => {
                const user = data.results[0];
                userContainer.innerHTML = `
                    <img src="${user.picture.large}" alt="Foto de usuario">
                    <p><strong>Nombre:</strong> ${user.name.first} ${user.name.last}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                `;
            })
            .catch(error => console.error("Error al obtener usuario:", error));
    }
});
