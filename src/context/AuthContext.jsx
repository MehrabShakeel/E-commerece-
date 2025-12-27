import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create context for authentication
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // Get backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // State variables
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set up authorization header when token changes
  useEffect(() => {
    if (token) {
      // Add token to all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch current user from backend
  const fetchUser = async () => {
    try {
      if (!backendUrl) {
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`${backendUrl}/api/auth/me`);
      
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email: email,
        password: password
      });

      if (response.data.success) {
        const userData = response.data.user;
        const userToken = response.data.token;
        
        // Update state
        setUser(userData);
        setToken(userToken);
        
        // Save token to localStorage
        localStorage.setItem('token', userToken);
        
        // Add token to axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        
        return { success: true, user: userData };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  // Register new user
  const register = async (name, email, password, phone, address) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address
      });

      if (response.data.success) {
        const userData = response.data.user;
        const userToken = response.data.token;
        
        // Update state
        setUser(userData);
        setToken(userToken);
        
        // Save token to localStorage
        localStorage.setItem('token', userToken);
        
        // Add token to axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        
        return { success: true, user: userData };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  // Check if user is logged in
  const isAuthenticated = () => {
    return user !== null && token !== null;
  };

  // Value to provide to context
  const value = {
    user: user,
    token: token,
    loading: loading,
    login: login,
    register: register,
    logout: logout,
    isAdmin: isAdmin,
    isAuthenticated: isAuthenticated,
    fetchUser: fetchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
