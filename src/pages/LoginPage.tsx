import { useState, useCallback } from "react";
import mockData from '../data/mockData.json';
import '../styles/LoginPage.css'
import eyeShow from '../assets/login/eye-show.png'
import eyeHide from '../assets/login/eye-hide.png'
import { useAuth } from "../hooks/useAuth";
import { comparePassword } from "../utils/bcrypt";




const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const errorMessages = {
    invalidCredentials: 'Invalid username or password',
    emptyFields: 'Username and password are required',
    emptyUsername: 'Username is required',
    emptyPassword: 'Password is required'
  };

  
  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate empty fields
      if (!username && !password) {
        setError(errorMessages.emptyFields);
        setLoading(false)
        return;
      }
      if (!username) {
        setError(errorMessages.emptyUsername);
        setLoading(false)
        return;
      }
      if (!password) {
        setError(errorMessages.emptyPassword);
        setLoading(false)
        return;
      }

      // Find user from mock data
      const user = mockData.users.find((user) => user.username === username);

     
      if (user) {
        const passwordMatch = await comparePassword(password, user.password); // Compare hashed password
        if (passwordMatch) {
          login(user); 
        } else {
          setError(errorMessages.invalidCredentials);
        }
      } else {
        setError(errorMessages.invalidCredentials);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false);
    }
  }, [username, password, login]);

// Show or hide password
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // change error to not error 
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setError('');
    setter(value);
  };

  return (
    <div className="container">
      <h1 className="text-login">LOGIN</h1>
      <form onSubmit={handleLogin} className="form-login">

      <div className={`container-username ${error && (error.includes(errorMessages.emptyUsername) || error.includes(errorMessages.emptyFields) || error.includes(errorMessages.invalidCredentials)) && 'error-username'}`}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="input-username"

          value={username}
          onChange={(e) => handleInputChange(setUsername, e.target.value)}
          autoComplete="off" 
           autoFocus
        />
      </div>

      <div className={`container-password ${error && (error.includes(errorMessages.emptyPassword) || error.includes(errorMessages.emptyFields) || error.includes(errorMessages.invalidCredentials)) && 'error-password'}`}>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          className="input-password"
          value={password}
          onChange={(e) => handleInputChange(setPassword, e.target.value)}
          autoComplete="off" 
        />
        <img
          onClick={handleShowPassword}
          src={showPassword ? eyeHide : eyeShow}
          alt={showPassword ? "Hide Password" : "Show Password"}
          className="icon-eye"
        />
      </div>
      {error ? <p className="text-error">{error}</p> : <p className="text-error">&nbsp;</p>}
      <button type="submit" className="button-submit">{loading ? 'LOADING...' : 'SUBMIT'}</button>
      
    </form>
    </div >
  )
}

export default LoginPage