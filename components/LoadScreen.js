import React from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const LoadScreen = () => {

    const rocketX = useSharedValue(0);
    const rocketY = useSharedValue(0);

    const flyRocket = () => {
        loadingStatus.value = withTiming(-10, {
            duration: 5000,
        }); 
    }
/*
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: rocketX.value, translateY: rocketY.value }],
        };
      });
*/
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{flex: 1}}>TEXT-TEXT-TEXT</Text>
            <Animated.View style={[{flex: 6, backgroundColor: 'pink', width: '100%'}]}>
                <View style={{width: 20, height: 40, backgroundColor: 'black', position: "absolute", bottom: 0, left: 0}}/>
            </Animated.View>
            <View style={{flex: 8}}>

            </View>
        </View>
    )
}

export default LoadScreen
