
export const TOKEN_KEY = "@quanta-Token";

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  return token != null && token.length > 0;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const requireAuth = (nextState, replace) => {
  if (!isAuthenticated()) {
    replace({
      pathname: '/'
    })
  }
};
