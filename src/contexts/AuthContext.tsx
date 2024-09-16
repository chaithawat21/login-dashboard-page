import { createContext, useState, useEffect } from 'react'

interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  position: string;
}

interface AuthContextType {
    isLogin: boolean;
    loggedInUser: User | null;
    login: (user: User) => void;
    logout: () => void;
  }
  
// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin") === "true";
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedLoginState && storedUser) {
      setIsLogin(true);
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = (user: User) => {
    setIsLogin(true);
    setLoggedInUser(user);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };
  
  const logout = () => {
    setIsLogin(false);
    setLoggedInUser(null);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("loggedInUser");
  };
  
  return (
    <AuthContext.Provider value={{ isLogin, loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};