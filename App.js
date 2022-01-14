import React from 'react';
import { SafeAreaView } from 'react-native';
import FlatListHorizontal from './components/FlatListHorizontal';
import LoadScreenSVG from './components/LoadScreenSVG';

const App = () => {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'darkgray',flexDirection: 'column'}}>
      <FlatListHorizontal/>
      <LoadScreenSVG/>
    </SafeAreaView>
  );
};

export default App;
