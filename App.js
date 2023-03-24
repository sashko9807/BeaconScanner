import 'react-native-gesture-handler'

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { showSetupWizard } from './src/realm/firstBoot';

import routeNames from './src/globals/routeNames';

import BeginScreen from './src/screens/setup/BeginScreen';
import DownloadScren from './src/screens/setup/DownloadDataScreen';
import RequestPermScreen from './src/screens/setup/RequestPermScreen';
import SetupFinish from './src/screens/setup/SetupFinish';

import HomeScreen from './src/screens/HomeScreen';
import ShowBeaconDataScreen from './src/screens/ShowBeaconDataScreen'

export default function App() {
  const Stack = createStackNavigator();
  const showSetup = showSetupWizard();


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6A539D',
          },
          headerShadowVisible: false,
          headerTintColor: '#FFF',
        }}
        initialRouteName={showSetup ? routeNames.SETUP_BEGIN : routeNames.HOME}
      >
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            transparentCard: 'false',
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <Stack.Screen name={routeNames.SETUP_BEGIN} component={BeginScreen} />
          <Stack.Screen name={routeNames.SETUP_DOWNOAD_DATA} component={DownloadScren} />
          <Stack.Screen name={routeNames.SETUP_REQUEST_PERM} component={RequestPermScreen} />
          <Stack.Screen name={routeNames.SETUP_FINISHED} component={SetupFinish} />
        </Stack.Group>
        <Stack.Screen name={routeNames.HOME} component={HomeScreen} />
        <Stack.Screen
          screenOptions={{
            presentation: 'modal',
            transparentCard: 'false',
          }}
          options={{ headerShown: false, screenOrientation: 'all' }}
          name={routeNames.SHOW_BEACON_DATA}
          component={ShowBeaconDataScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

