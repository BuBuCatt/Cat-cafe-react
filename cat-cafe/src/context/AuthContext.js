import { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);

  const logout = () => {
    setLoginUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    console.log("Successful logout");
  };

  const checkUserType = (user) => {
    if (user) {
      const userType = user.type;
      console.log("userType -> " + userType);
      return userType;
    } else {
      // Log or handle the case when user is null
      console.log("No user object provided.");
      return null;
    }
  }

  const loginUserContext = useMemo(
    () => ({
        loginUser,
        setLoginUser,
        logout,
        checkUserType
    }),
    [loginUser],
);


  return (
    <AuthContext.Provider value={loginUserContext}>
      {children}
    </AuthContext.Provider>
  );
};