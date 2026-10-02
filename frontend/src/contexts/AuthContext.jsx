import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('navin_admin_token'));
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('navin_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.admin) {
          setAdmin(data.admin);
          localStorage.setItem('navin_admin_user', JSON.stringify(data.admin));
        } else {
          logout();
        }
      } catch (err) {
        console.error('Session validation error:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = (newToken, adminData) => {
    setToken(newToken);
    setAdmin(adminData);
    localStorage.setItem('navin_admin_token', newToken);
    localStorage.setItem('navin_admin_user', JSON.stringify(adminData));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('navin_admin_token');
    localStorage.removeItem('navin_admin_user');
  };

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };
    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated: !!token && !!admin,
        login,
        logout,
        authFetch,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
