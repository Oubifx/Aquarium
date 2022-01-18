import React from "react";
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, multiply, sin, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

const LoadScreen = () => {

    const rocketX = useSharedValue(0);
    const rocketY = useSharedValue(0);
    const isGoBack = useSharedValue(false);
    const rocketPathWidth = width + 100

    const flyRocket = () => {
        
        rocketX.value = 0
        rocketY.value = 0
        rocketX.value = withSequence(
            withTiming(rocketPathWidth, {
                duration: 3000,
                easing: Easing.bezier(1, 1, 1, 1),
            }),
            withTiming(0, {
                duration: 3000,
                easing: Easing.bezier(1, 0.8, 0.8, 0.2),
            }),
        )

        rocketY.value = withSequence(
            withTiming(50, {
                duration: 3000,
                easing: Easing.bezier(1, 1, 1, 1)
            }, () => isGoBack.value = true),
            withTiming(10, {
                duration: 3000,
                easing: Easing.bezier(1, 0.8, 0.8, 0.2),
            }, () => isGoBack.value = false),
        )
    }
    
    
    const rocketPath = useAnimatedStyle(() => {

        const transY = parseInt(`${26*Math.sin(rocketY.value/6)}`)
        const rotateZ = isGoBack.value ? `${270+(26*Math.sin((rocketY.value+8)/6))}deg` : `${90+(26*Math.sin((rocketY.value+8)/6))}deg`
        return {
            transform: [
                {translateX: rocketX.value}, 
                {translateY: transY},
                {rotateZ: rotateZ }
            ],
        };
    });


    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{flex: 1}}>TEXT-TEXT-TEXT</Text>
                <View style={[{flex: 6, backgroundColor: 'pink', width: '100%'}]}>
                    <Animated.Image 
                        source={require('../images/rocket.png')} 
                        resizeMode={'contain'} 
                        style={[style.rocket, rocketPath]}
                    />
                </View>
            <View style={{flex: 8}}>
            <Button title="SpaceX" onPress={() => flyRocket()}/>

            </View>
        </SafeAreaView>
    )
}

export default LoadScreen

const style = StyleSheet.create({
    rocket: {
        width: 25, 
        height: 50, 
        position: "absolute",
        bottom: '50%',
        left: -50,
    }
})
