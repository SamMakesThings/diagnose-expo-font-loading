import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

// Root app component
export default function App() {
  // Using auth functions from react-navigation guide
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            profileData: action.profileData
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            onboardingComplete: action.onboardingComplete,
            authLoading: action.isAuthLoading,
            profileData: action.profileData
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
        case 'UPDATE_USERDATA':
          return {
            ...prevState,
            userData: action.userData,
            onboardingComplete: action.onboardingComplete
          };
        case 'SET_SLEEPLOGS':
          return {
            ...prevState,
            sleepLogs: action.sleepLogs
          };
        case 'AUTH_LOADING':
          return {
            ...prevState,
            authLoading: action.isAuthLoading
          };
        case 'FINISH_LOADING':
          return {
            ...prevState,
            isLoading: false
          };
        case 'FINISH_ONBOARDING':
          return {
            ...prevState,
            onboardingComplete: true
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      onboardingComplete: true,
      profileData: null,
      sleepLogs: [],
      selectedMonth: new Date().getMonth()
    }
  );

  // Load assets async w/Expo tools. Problem seems to be Font.loadAsync not working.
  async function _loadResourcesAsync() {
    await Font.loadAsync({
      ...Icon.Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      RubikRegular: require('./assets/fonts/RubikRegular.ttf'),
      RubikMedium: require('./assets/fonts/RubikMedium.ttf'),
      RubikBold: require('./assets/fonts/RubikBold.ttf')
    });
    // dispatch({ type: 'FINISH_LOADING' });
  }

  // Trigger the switch from the loading screen to the app
  function _handleFinishLoading() {
    dispatch({ type: 'FINISH_LOADING' });
  }

  const _handleLoadingError = (error) => {
    // Add error reporting here
    console.error('There was a loading error in _handleLoadingError!');
    console.error(error);
  };

  // Render a loading screen if loading, otherwise load the main app
  if (state.isLoading) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <NavigationContainer>
        <View style={styles.container}>
          {Platform.OS === 'ios' ? <StatusBar barStyle="light-content" /> : []}
          <AppNavigator
            userToken={state.userToken}
            authLoading={state.authLoading}
            onboardingComplete={state.onboardingComplete}
          />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232B3F'
  }
});
