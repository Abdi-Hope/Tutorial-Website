import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Force initial state to dark

  useEffect(() => {
    console.log('ThemeProvider: Initializing theme...');
    
    // Completely ignore any saved theme and force dark mode
    const forceDarkMode = () => {
      console.log('ThemeProvider: Forcing dark mode');
      setTheme('dark');
      // FIXED: Use dataset correctly (it's an object property, not a function)
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#1a202c';
      document.body.style.color = '#f7fafc';
      localStorage.setItem('theme', 'dark');
    };

    // Always force dark mode on initial load
    forceDarkMode();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Toggling theme to:', newTheme);
      // FIXED: Use dataset correctly
      document.documentElement.dataset.theme = newTheme;
      document.documentElement.style.colorScheme = newTheme;
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContext;