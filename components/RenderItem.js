import { transform } from "@babel/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, PanGestureHandler} from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const RenderItem = ({item, index, selectedElm}) => {

    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {

        if (selectedElm.value===index)  {   
            return {
                transform: [
                    {
                        scale: withTiming(1.2, {
                            duration: 500,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                        }),
                    },
                    {
                        translateY: withTiming(-20, {
                            duration: 600,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                        }),
                    }
                ],
            };
        } else if (selectedElm.value+1 === index || selectedElm.value-1 === index) {
            return {
                transform: [
                    { 
                        scale: withTiming(1, {
                            duration: 500,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                        }) 
                    },
                    {
                        translateY: withTiming(-10, {
                            duration: 600,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                        }),
                    }
                ],
            };
        } else {
            return {
                transform: [
                    { 
                        scale: withTiming(0.8, {
                            duration: 500,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                        }) 
                    },
                    {
                        translateY: withTiming(0, {
                            duration: 600,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                        }),
                    }
                ],
            };
        }
    });

    const x = useSharedValue(0);
    const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: ({translationX,translationY}) => {
      x.value = translationX;
      y.value = translationY;
    },
  });

  const move = useAnimatedStyle(() => {
    return {
      transform: [
        {
            translateX: x.value,
          
        },
        {
            translateY: y.value
        }
      ],
    };
  });

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[style.item, animatedStyles, move]}>
                <Text  style={{color: 'white'}}>{item}</Text>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default RenderItem

const style = StyleSheet.create({
    item: {
        backgroundColor: 'darkgreen',
        width: 40,
        height: 40,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
})