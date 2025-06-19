import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:8000";

  const login = async (username, password) => {
    setAuthError(null);
    const payload = { username, password };

    try {
      const response = await axios.post(`${API_URL}/login/`, payload);

      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        try {
            const tokenParts = response.data.access_token.split('.');
            if (tokenParts.length === 3 && tokenParts[1]) {
                const decodedPayload = JSON.parse(atob(tokenParts[1]));
                if (decodedPayload && decodedPayload.sub) {
                    setUser({ username: decodedPayload.sub });
                } else {
                    setUser({ username }); // Fallback
                }
            } else {
                 setUser({ username }); // Fallback
            }
        } catch (e) {
            setUser({ username }); // Fallback em caso de erro na decodificação
        }
        navigate('/');
      } else {
        setAuthError("Resposta de login inesperada do servidor.");
      }
    } catch (err) {
      if (err.response) {
        setAuthError(err.response.data.detail || 'Falha no login. Verifique suas credenciais.');
      } else if (err.request) {
        setAuthError('Sem resposta do servidor ao tentar fazer login.');
      } else {
        setAuthError('Erro ao configurar requisição de login.');
      }
    }
  };

  const register = async (username, email, password) => {
    setAuthError(null);
    const payload = { username, email, password };

    try {
      const response = await axios.post(`${API_URL}/register/`, payload);

      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        setUser({ username }); 
        navigate('/');
      } else {
        setAuthError("Registro bem-sucedido, mas falha ao logar automaticamente. Por favor, faça login.");
        navigate('/login');
      }
    } catch (err) {
      if (err.response) {
        let errorMessage = "Falha no registro.";
        if (err.response.data && err.response.data.detail) {
          if (Array.isArray(err.response.data.detail)) {
            errorMessage = err.response.data.detail.map(d => `${d.loc.join('.')} - ${d.msg}`).join('; ');
          } else {
            errorMessage = err.response.data.detail;
          }
        }
        setAuthError(errorMessage);
      } else if (err.request) {
        setAuthError('Sem resposta do servidor ao tentar registrar.');
      } else {
        setAuthError('Erro ao configurar requisição de registro.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthError(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        if (payloadBase64) {
            const decodedPayload = JSON.parse(atob(payloadBase64));
            if (decodedPayload && decodedPayload.sub && decodedPayload.exp * 1000 > Date.now()) {
                setUser({ username: decodedPayload.sub });
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
      } catch (e) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const value = {
    user,
    authError,
    login,
    logout,
    register,
    clearAuthError: () => setAuthError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);