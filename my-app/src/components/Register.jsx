import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link se estiver usando React Router
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, authError, clearAuthError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      // Você pode usar o setAuthError do contexto aqui também, se preferir,
      // em vez de um alert, para uma UI mais consistente.
      // Ex: if (clearAuthError) clearAuthError(); // Limpa erro anterior do contexto
      //     if (setAuthError) setAuthError("Por favor, preencha todos os campos."); // setAuthError precisaria ser exposto pelo AuthContext
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // A função register no AuthContext agora lida com o login automático
    // e o redirecionamento para '/' após o sucesso.
    await register(username, email, password);
  };

  // Os estilos permanecem os mesmos que você já tinha.
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
    loginLinkContainer: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '0.9em',
      color: '#4b4f56', 
    },
    loginLink: {
      color: '#1877f2',
      textDecoration: 'none',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Criar Nova Conta</h2>

        {/* Exibe a mensagem de erro do AuthContext */}
        {authError && <p style={styles.authErrorMessage}>{authError}</p>}

        <div style={styles.inputGroup}>
          <input
            id="username"
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            // Limpa o erro do AuthContext quando o usuário digita
            onChange={(e) => { setUsername(e.target.value); if (authError && clearAuthError) clearAuthError(); }}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (authError && clearAuthError) clearAuthError(); }}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (authError && clearAuthError) clearAuthError(); }}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Registrar
        </button>

        <div style={styles.loginLinkContainer}>
          Já tem uma conta?{' '}
          {/* Use Link do react-router-dom se estiver usando-o */}
          <Link to="/login" style={styles.loginLink}>
            Faça login
          </Link>
          {/* Se não estiver usando react-router-dom, mantenha o <a>:
          <a href="/login" style={styles.loginLink}>
            Faça login
          </a>
          */}
        </div>
      </form>
    </div>
  );
}