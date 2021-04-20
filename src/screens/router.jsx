import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Platform, StatusBar, Animated} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {useIsDrawerOpen} from '@react-navigation/drawer';
import {createDrawerNavigator} from 'components/drawer';

import {createTabNavigator} from 'components/bottom-tabs';
import {DrawerHeader, DrawerFooter, DrawerHeaderClient} from 'components';
import SplashScreen from 'react-native-splash-screen';
import {useTheme} from 'components/theme';

import {Home} from 'screens';

const Tabs = createTabNavigator();
const TabNavigator = props => {
  const isDrawerOpen = useIsDrawerOpen();

  return (
    <>
      {isDrawerOpen ? (
        <StatusBar barStyle="light-content" animated />
      ) : (
        <StatusBar barStyle="dark-content" animated />
      )}
      <Tabs.Navigator>
        <Tabs.Screen
          name="Home"
          options={{iconName: 'calendar-solid', iconStyle: 'outline'}}
          component={Home}
        />
      </Tabs.Navigator>
    </>
  );
};

const Drawer = createDrawerNavigator();
const DrawerScreen = props => {
  return (
    <Drawer.Navigator
      items={[
        {
          id: 'Instagram',
          type: 'external',
          route: 'https://www.instagram.com/legitfitcom/',
          displayName: 'Instagram',
          icon: 'instagram',
        },
        {
          id: 'facebook',
          type: 'external',
          route: 'https://www.facebook.com/LEGITFITcom/',
          displayName: 'Facebook',
          icon: 'facebook',
        },
        {
          id: 'twitter',
          type: 'external',
          route: 'https://twitter.com/legitfitcom/',
          displayName: 'Twitter',
          icon: 'twitter',
        },
        {
          id: 'divider',
          type: '',
          route: '',
          displayName: '',
          icon: '',
        },
        {
          id: 'licenses',
          type: 'external',
          route: 'https://www.legitfit.com',
          displayName: 'Licenses',
          icon: 'copyright',
        },
        {
          id: 'Support',
          type: 'external',
          route: 'https://www.legitfit.com',
          displayName: 'Support',
          icon: 'copyright',
        },
      ]}
      header={DrawerHeaderClient}
      footer={DrawerFooter}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const ModalStack = createStackNavigator();
const ModalNavigator = props => {
  const theme = useTheme();
  return (
    <LinearGradient colors={['#90295F', '#E71885']} style={{flex: 1}}>
      <StatusBar barStyle="light-content" animated />
      <ModalStack.Navigator
        screenOptions={{
          headerShown: false,
          cardOverlayEnabled: true,
          ...(Platform.OS === 'ios'
            ? TransitionPresets.ModalPresentationIOS
            : TransitionPresets.ModalTransition),
          cardOverlay: ({style}) => {
            return (
              <Animated.View
                style={[style, {flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}]}
              />
            );
          },
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
        mode="modal">
        <ModalStack.Screen name="Drawer" component={DrawerScreen} />
        <ModalStack.Screen name="Home" component={Home} />
      </ModalStack.Navigator>
    </LinearGradient>
  );
};

const OnBoardingStack = createStackNavigator();
const OnBoardingNavigator = props => {
  /*React.useEffect(() => {
    SplashScreen.hide();
  }, []);*/

  return (
    <>
      <StatusBar barStyle="light-content" animated />
      <OnBoardingStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({current, closing}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        mode="card"
        initialRouteName={'Main'}>
        <OnBoardingStack.Screen name="Main" component={ModalNavigator} />
      </OnBoardingStack.Navigator>
    </>
  );
};

export default OnBoardingNavigator;
