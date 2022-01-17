import React from "react";
import { Button, Text, View } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Svg, { Path, Polyline } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LoadScreenSVG = () => {
    const levelx1 = useSharedValue(50);
    const levelx2 = useSharedValue(50);
    const levelx3 = useSharedValue(50);

    const animatedProps = useAnimatedProps(() => {
        const myPath = `M 0 50 V 0 H 100 V 50 
        C 93.3333 ${levelx1.value} 86.6667 ${levelx2.value} 80 ${levelx3.value} 
        C 73.3333 ${levelx1.value} 66.6667 ${levelx2.value} 60 ${levelx3.value} 
        C 53.3333 ${levelx1.value} 46.6667 ${levelx2.value} 40 ${levelx3.value} 
        C 33.3333 ${levelx1.value} 26.6667 ${levelx2.value} 20 ${levelx3.value} 
        C 13.3333 ${levelx1.value} 6.6667  ${levelx2.value} 0  ${levelx3.value}`
        
      return {
        d: myPath
      };
    });
    console.log("RESULT:",animatedProps)
    // attach animated props to an SVG path using animatedProps
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
        <Button onPress={() => {
                levelx1.value = withSpring(60)
                levelx3.value = withSpring(50)
                levelx2.value = withSpring(50)
                }} title={"FILL"}/>
            <Button onPress={() => {
                levelx1.value = withSpring(50)
                levelx3.value = withSpring(50)
                levelx2.value = withSpring(60)
            }} title={"EMPTY"}/>
        </View>
    )
}

export default LoadScreenSVG