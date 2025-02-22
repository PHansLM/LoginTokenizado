import { useState } from "react";


export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<string | null>(null);

  // 🔹 Iniciar sesión
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUserData(null); // Reset de datos previos
      } else {
        setError(data.message || "Error en el inicio de sesión");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  // 🔹 Obtener datos del usuario (ruta protegida)
  const handleGetUser = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(JSON.stringify(data, null, 2));
      } else {
        setError("No autorizado.");
      }
    } catch (err) {
      setError("Error al obtener el usuario.");
    }
  };

  // 🔹 Cerrar sesión
  const handleLogout = async () => {
    if (!token) return;
    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    } catch (err) {}

    setToken(null);
    setUserData(null);
  };

  return (
    <div style={styles.container}>
      {token ? (
        <div style={styles.card}>
          <h2>Bienvenido!</h2>
          <p><strong>Token:</strong> {token}</p>
          <button onClick={handleGetUser} style={styles.button}>Obtener Datos de Usuario</button>
          <button onClick={handleLogout} style={styles.buttonRed}>Cerrar Sesión</button>
          {userData && (
            <pre style={styles.pre}>{userData}</pre>
          )}
        </div>
      ) : (
        <form onSubmit={handleLogin} style={styles.card}>
          <h2>Iniciar Sesión</h2>
          {error && <p style={styles.error}>{error}</p>}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
      )}
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};
