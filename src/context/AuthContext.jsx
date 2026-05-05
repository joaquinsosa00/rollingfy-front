import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRollingfy'));
    if (usuarioGuardado) {
      setUsuarioLogueado(usuarioGuardado);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem('usuarioRollingfy');
    setUsuarioLogueado(null);
  };

  return (
  
    <AuthContext.Provider value={{ usuarioLogueado, setUsuarioLogueado, logout }}>
      {children}
    </AuthContext.Provider>
  );
};