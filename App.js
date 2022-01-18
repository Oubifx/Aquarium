import React from 'react';
import { SafeAreaView } from 'react-native';
import FlatListHorizontal from './components/FlatListHorizontal';
import FlatListHorizontalOnScroll from './components/FlatListHorizontalOnScroll';
import LoadScreenSVG from './components/LoadScreenSVG';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PhotoViewer from './components/PhotoViewer';
import LoadScreen from './components/LoadScreen';


function ScreenOne() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'darkgray',flexDirection: 'column'}}>
      <FlatListHorizontal/>
      <LoadScreenSVG/>
      <FlatListHorizontalOnScroll/>
    </SafeAreaView>
  );
}

function ScreenTwo() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'darkgray',flexDirection: 'column'}}>
      <PhotoViewer/>
    </SafeAreaView>
  );
}

function ScreenThree() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'darkgray',flexDirection: 'column'}}>
      <LoadScreen/>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  /*
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='ScreenTwo'>
        <Tab.Screen name="ScreenOne" component={ScreenOne} />
        <Tab.Screen name="ScreenTwo" component={ScreenTwo} />
        <Tab.Screen name="ScreenThree" component={ScreenThree}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
  */
 //<PhotoViewer/>
 return (
    <LoadScreen/>
 )
};

export default App;
