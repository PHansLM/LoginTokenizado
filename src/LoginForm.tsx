import { useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulación de usuario (Reemplazar luego con API)
    const fakeUser: User = { email: "juan@gmail.com", name: "juan", password: "1234" };

    if (email == fakeUser.email && password == fakeUser.password) {
      setUser(fakeUser);
      setError(null);
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.card}>
          <h2>Bienvenido, {user.name}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout} style={styles.button}>Cerrar Sesión</button>
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
