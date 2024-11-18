import React from 'react';
import { Text, View } from 'react-native';
import Navigation from './src/component/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { MenuProvider } from 'react-native-popup-menu';

const App =() => {
  return (
    <MenuProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </MenuProvider>
  );
}
export default App;
