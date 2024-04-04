
export const isAuthenticated = () => {
    const token = localStorage.getItem('login-token');
    
    return token ? true : false;
  };
  