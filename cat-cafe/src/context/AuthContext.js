import { createContext, useState, useMemo } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);


  const logout = (loginUser) => {
    let request = new FormData();
    alert(JSON.stringify(loginUser))
    request.append("sid",loginUser.sessionID);
    request.append('email',loginUser.email);
    alert(loginUser? loginUser.sessionID:'sumiu')
    alert(loginUser? loginUser.email:'sumiu')

    // setLoginUser(null);
    // localStorage.removeItem("user");
    // sessionStorage.removeItem("user");
    // AuthService.logout(request).then(
    //   (response)=>{
    //     console.log(response.data);
    //   },
    //   (rej)=>{
    //     console.log(rej && rej.message?rej.message:'Unable to terminate session. Logout just from client-side');
    //   }
    // )
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