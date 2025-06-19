import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';    
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, authError, clearAuthError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Por favor, preencha o nome de usuário e a senha.");
      return;
    }
    await login(username, password);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',  
      padding: '20px',
      backgroundColor: '#f0f2f5',
      boxSizing: 'border-box',
      width: '100%',
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '30px 40px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      width: '100%',
      maxWidth: '450px',
      boxSizing: 'border-box',
    },
    
    header: {
      textAlign: 'center',
      color: '#1c1e21',
      marginBottom: '25px',
      fontSize: '1.8em',
      fontWeight: 600,
    },
    inputGroup: {
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ccd0d5',
      borderRadius: '5px',
      fontSize: '1em',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px 15px',
      backgroundColor: '#1877f2',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1.1em',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: 'background-color 0.2s ease',
    },
    authErrorMessage: {
      color: '#fa383e',
      backgroundColor: '#ffebe6',
      border: '1px solid #ffc4c6',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '0.95em',
      textAlign: 'center',
    },
    registerLinkContainer: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.9em',
      color: '#4b4f56',
    },
    registerLink: {
      color: '#1877f2',
      textDecoration: 'none',
      fontWeight: '500',
    }
  };

  

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Entrar na Sua Conta</h2>

        {authError && <p style={styles.authErrorMessage}>{authError}</p>}

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => { setUsername(e.target.value); if (authError) clearAuthError(); }}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (authError) clearAuthError(); }}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.registerLinkContainer}>
          Não tem conta?{' '}
          <Link to="/register" style={styles.registerLink}>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}