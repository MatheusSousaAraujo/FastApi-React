import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

export default function Messages() {
  // ... (seus useState, token, API_URL, useAuth) ...
  const [messages, setMessages] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(''); 
  const token = localStorage.getItem('token');
  const API_URL = "http://localhost:8000"; 
  const { user, logout, authError, clearAuthError } = useAuth();

  // ... (funções fetchMessages, sendMessage, useEffect) ...
  const fetchMessages = async () => {
    if (!token) {
      setError("Você precisa estar logado para ver as mensagens.");
      return;
    }
    setError(''); 
    if (authError && clearAuthError) clearAuthError();

    try {
      const response = await axios.get(`${API_URL}/posts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      let errorDetail = "Erro desconhecido ao buscar mensagens.";
      if (err.response) {
        if (err.response.data && err.response.data.detail) {
          if (Array.isArray(err.response.data.detail)) {
            errorDetail = err.response.data.detail.map(d => `${d.loc.join('.')} - ${d.msg}`).join('; ');
          } else {
            errorDetail = err.response.data.detail;
          }
        } else if (err.response.statusText) {
          errorDetail = err.response.statusText;
        }
      } else {
        errorDetail = "Erro de rede ao buscar mensagens.";
      }
      setError(`Erro: ${errorDetail}`);
    }
  };

  const sendMessage = async () => {
    if (newTitle.trim() === '' || newMessage.trim() === '') {
      setError("Por favor, preencha o título e a mensagem.");
      return;
    }
    if (!token) {
      setError("Você precisa estar logado para enviar uma mensagem.");
      return;
    }
    setError(''); 
    if (authError && clearAuthError) clearAuthError(); 

    const payload = {
      title: newTitle,
      text: newMessage,
    };

    try {
      await axios.post(`${API_URL}/posts/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTitle('');
      setNewMessage('');
      fetchMessages(); 
    } catch (err) {
      let errorMsg = "Erro ao enviar mensagem.";
      if (err.response) {
        if (err.response.data && err.response.data.detail) {
          if (Array.isArray(err.response.data.detail)) {
            errorMsg = err.response.data.detail.map(d => `${d.loc.join('.')} - ${d.msg}`).join('; ');
          } else {
            errorMsg = err.response.data.detail;
          }
        } else {
          errorMsg = err.response.statusText || errorMsg;
        }
      } else {
        errorMsg = "Erro de rede ao enviar mensagem.";
      }
      setError(`Erro: ${errorMsg}`);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMessages();
    }
  }, [token]);


  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      minHeight: '100vh',
      margin: '0',
      padding: '15px',
      backgroundColor: '#f0f2f5',
      boxSizing: 'border-box',
    },
    header: {
      textAlign: 'center',
      color: '#1d2129',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '2px solid #1877f2',
      fontSize: '1.8em',
      fontWeight: 600,
    },
    headerUsername: {
      color: '#1877F2',
    },
    errorMessage: {
      color: '#fa383e',
      textAlign: 'center',
      backgroundColor: '#ffebe6',
      border: '1px solid #ffc4c6',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px',
      fontSize: '0.95em',
    },
    formContainer: {
      marginBottom: '25px',
      padding: '15px',
      border: '1px solid #dddfe2',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formHeader: {
      marginTop: '0',
      color: '#1c1e21',
      marginBottom: '12px',
      fontSize: '1.3em',
    },
    input: {
      width: 'calc(100% - 22px)',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccd0d5',
      borderRadius: '4px',
      fontSize: '0.95em',
      boxSizing: 'border-box',
    },
    textarea: {
      width: 'calc(100% - 22px)',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccd0d5',
      borderRadius: '4px',
      fontSize: '0.95em',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '80px',
      lineHeight: '1.5',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
    },
    button: { 
      padding: '8px 18px',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1em',
      fontWeight: 500,
      minWidth: '100px', 
      textAlign: 'center',
    },
    buttonSubmit: {
      backgroundColor: '#1877f2', 
    },
    buttonLogout: { 
      backgroundColor: '#e74c3c', 
    },
    postsHeader: {
      color: '#1c1e21',
      borderTop: '1px solid #dddfe2',
      paddingTop: '15px',
      marginTop: '20px',
      marginBottom: '15px',
      fontSize: '1.4em',
    },
    postsList: {
      listStyleType: 'none',
      padding: '0',
    },
    noMessages: {
      padding: '15px',
      color: '#606770',
      textAlign: 'center',
      backgroundColor: '#f5f6f7',
      borderRadius: '4px',
      fontSize: '1em',
    },
    postItem: {
      border: '1px solid #dddfe2',
      borderRadius: '6px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    postAuthor: {
      margin: '0 0 5px 0',
      fontWeight: 600,
      fontSize: '1.1em',
      color: '#050505',
    },
    postTitle: {
      margin: '0 0 8px 0',
      color: '#1877f2',
      fontSize: '1.05em',
      fontWeight: 500,
    },
    postText: {
      margin: '0 0 10px 0',
      color: '#1c1e21',
      whiteSpace: 'pre-wrap',
      lineHeight: '1.45',
      fontSize: '0.95em',
    },
    postDate: {
      color: '#606770',
      fontSize: '0.8em',
      display: 'block',
      textAlign: 'right',
      marginTop: '8px',
    },
    loginPrompt: {
      textAlign: 'center',
      marginTop: '40px',
      fontSize: '1.1em',
      color: '#1c1e21',
    }
  };

  if (!token && !error && !authError) { 
    return <p style={styles.loginPrompt}>Por favor, faça login para ver e enviar mensagens.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        Mural de Mensagens 
        {user && user.username ? (
          <>
            {' de: '} 
            <span style={styles.headerUsername}>{user.username}</span>
          </>
        ) : ''}
      </h2>
      
      {(error || authError) && <p style={styles.errorMessage}>{error || authError}</p>}
      
      <div style={styles.formContainer}>
        <h3 style={styles.formHeader}>Nova Mensagem</h3>
        <input
          value={newTitle}
          onChange={(e) => { setNewTitle(e.target.value); setError(''); if(authError && clearAuthError) clearAuthError(); }}
          placeholder="Título da mensagem"
          style={styles.input}
        />
        <textarea
          value={newMessage}
          onChange={(e) => { setNewMessage(e.target.value); setError(''); if(authError && clearAuthError) clearAuthError(); }}
          placeholder="Digite sua mensagem..."
          rows={3}
          style={styles.textarea}
        />
        <div style={styles.buttonContainer}>
          <button 
            onClick={sendMessage}
            style={{...styles.button, ...styles.buttonSubmit}}
          >
            Enviar
          </button>
          <button 
            onClick={logout} 
            style={{...styles.button, ...styles.buttonLogout}}
          >
            Sair
          </button>
        </div>
      </div>

      <h3 style={styles.postsHeader}>Posts Recentes</h3>
      <ul style={styles.postsList}>
        {messages.length === 0 && !error && !authError && ( 
          <li style={styles.noMessages}>
            Nenhuma mensagem para exibir.
          </li>
        )}
        
        {Array.isArray(messages) && messages.slice().reverse().map((msg) => (
          <li key={msg.id} style={styles.postItem}>
            {msg.author && msg.author.username && (
              <p style={styles.postAuthor}> 
                {msg.author.username}
              </p>
            )}
            
            <h4 style={styles.postTitle}>
              {msg.title || "Sem Título"}
            </h4>
            
            <p style={styles.postText}> 
              {msg.text}
            </p>

            {msg.date && (
              <small style={styles.postDate}>
                {new Date(msg.date).toLocaleDateString('pt-BR', { 
                  year: 'numeric', month: 'short', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit' 
                })}
              </small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}