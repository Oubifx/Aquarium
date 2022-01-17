import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Animated, { Easing, interpolate, useAnimatedProps, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Path, Polyline } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LoadScreenSVG = () => {
    const loadingStatus = useSharedValue(90)

    const levelx1 = useSharedValue(6);
    const levelx2 = useSharedValue(-6);
    const levely = useSharedValue(3)

    const fillSVG = () => {
        loadingStatus.value = withTiming(-10, {
            duration: 5000,
        }); 
    }

    const emptySVG = () => {
        loadingStatus.value = withTiming(90, {
            duration: 5000,
        }); 
    }

    const wave = () => {

        levely.value = withRepeat(withSpring(-3), -1, true)
        levelx1.value = withRepeat(withSpring(levelx2.value), -1, true)
        levelx2.value = withRepeat(withSpring(levelx1.value), -1, true)
    }
    
    const animatedProps = useAnimatedProps(() => {
        const myPath = `
        M 100 100 H 100 V ${loadingStatus.value} 
        Q 90 ${levelx1.value+loadingStatus.value} ${80 + levely.value} ${loadingStatus.value}
        Q 70 ${levelx2.value+loadingStatus.value} ${60 + levely.value} ${loadingStatus.value} 
        Q 50 ${levelx1.value+loadingStatus.value} ${40 + levely.value} ${loadingStatus.value} 
        Q 30 ${levelx2.value+loadingStatus.value} ${20 + levely.value} ${loadingStatus.value} 
        Q 10 ${levelx1.value+loadingStatus.value} ${0}  ${loadingStatus.value} 
        V 100
        `
        
      return {
        d: myPath
      };
    });
    console.log("RESULT:",animatedProps)

    wave()
    return (
        <View>
        <Animated.View style={{backgroundColor: 'white', width: 100, height: 100, alignSelf: 'center', margin: 10}}>
            <Svg height="100" width="100">
            <AnimatedPath
                fill={"blue"}
                stroke="none"
                animatedProps={animatedProps}
            />
            </Svg>
        </Animated.View>
        <Button onPress={() => {fillSVG()}} title={"FILL"}/>
            <Button onPress={() => {emptySVG()}} title={"EMPTY"}/>
        </View>
    )
}

export default LoadScreenSVG