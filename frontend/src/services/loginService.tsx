const apiUrl = "http://127.0.0.1:8000/api";

async function login() {
    const response = await fetch(`${apiUrl}/login`, {
        method: "POST"
    });

    const data = await response.json();
    localStorage.setItem("token", data.token); // Guardamos el token
    console.log("Token recibido:", data.token);
}

async function getProfile() {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${apiUrl}/perfil`, {
        method: "GET",
        headers: {
            "Authorization": token ?? "",
        }
    });

    const data = await response.json();
    console.log("Respuesta del perfil:", data);
}

// Pruebas
login().then(() => getProfile());
