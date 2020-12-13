import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { dozy_theme } from '../config/Themes';

function LoginScreen() {
  // Pull the theme manually
  const theme = dozy_theme;

  return (
    <Text
      style={StyleSheet.flatten([
        theme.typography.headline3,
        { marginTop: 200 }
      ])}
    >
      This text should really be Rubik Medium
    </Text>
  );
}

export default LoginScreen;
