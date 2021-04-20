import React, { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

const ThemeContext = createContext({});

export const ThemeProvider = ({ theme, children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const makeStyles = (styles) => (props) => {
  return StyleSheet.create(styles(useTheme(), props));
};
