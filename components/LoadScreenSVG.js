import React from "react";
import { Button, Text } from "react-native";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import Svg, { Path, Polyline } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LoadScreenSVG = () => {
    const level = useSharedValue(50);

    const animatedProps = useAnimatedProps(() => {
        const myPath = 'M 0 50 V 0 H 100 V 50 C 93.3333 50 86.6667 50 ${80} 50 C 73.3333 50 66.6667 50 60 50 C 53.3333 50 46.6667 50 40 50 C 33.3333 50 26.6667 50 20 50 C 13.3333 50 6.6667 50 0 50'
      /*
        const path = `
      M 100, 100
      m -${radius.value}, 0
      a ${radius.value},${radius.value} 0 1,0 ${radius.value * 2},0
      a ${radius.value},${radius.value} 0 1,0 ${-radius.value * 2},0
      `;
      */
      return {
        d: myPath,
        fill: "none",
        stroke: "red",
      };
    });
    
    // attach animated props to an SVG path using animatedProps
    return (
        <Animated.View style={{backgroundColor: 'white', width: 100, height: 100, alignSelf: 'center', margin: 10}}>
            <Svg height="100" width="100">
            <Path
                d="M 0 50 V 0 H 100 V 50 C 93.3333 50 86.6667 50 80 50 C 73.3333 50 66.6667 50 60 50 C 53.3333 50 46.6667 50 40 50 C 33.3333 50 26.6667 50 20 50 C 13.3333 50 6.6667 50 0 50"
                fill={"blue"}
                stroke="none"
            />
            </Svg>
            <Button onPress={() => (level.value = 50)} title={"FILL"}/>
            <Button onPress={() => (level.value = 100)} title={"EMPTY"}/>
        </Animated.View>
    )
}

export default LoadScreenSVG