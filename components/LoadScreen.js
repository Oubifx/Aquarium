import React, { useState } from "react";
import { Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { cond, Easing, multiply, sin, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

const LoadScreen = () => {

    const rocketX = useSharedValue(0);
    const rocketY = useSharedValue(0);

    // служит для того что бы потом повернуть ракету в другую сторону
    const isGoBack = useSharedValue(false);

    // определяем ширину экрана + запас за экраном для маршрута
    const rocketPathWidth = width + 100

    // горизонтальное движение. Запускается синхронно с вертикальным
    rocketX.value = withRepeat(
        withDelay(1000,
            withSequence(
                withTiming(rocketPathWidth, {
                    duration: 3000,
                    easing: Easing.bezier(1, 1, 1, 1),
                }),
                withTiming(0, {
                    duration: 3000,
                    easing: Easing.bezier(1, 0.8, 0.8, 0.2),
                }),
            ),
        ), -1
    )

    // вертикальное движение. Запускается синхронно с горизонтальным
    rocketY.value = withRepeat(
        withDelay(1000,
            withSequence(
                withTiming(50, {
                    duration: 3000,
                    easing: Easing.bezier(1, 1, 1, 1)
                }, () => isGoBack.value = true),
                withTiming(10, {
                    duration: 3000,
                    easing: Easing.bezier(1, 0.8, 0.8, 0.2),
                }, () => isGoBack.value = false),
            ),
        ), -1
    )

    
    // rocketPath помещается в стили вью с ракетой
    const rocketPath = useAnimatedStyle(() => {
        // Обычный синус обвешенный нужными мне множителями для достижения нужного эффекта на экране
        const transY = parseInt(`${26*Math.sin(rocketY.value/6)}`)
        // Та же самая формула, но с добавлением углаю | +8 служит для того что бы сделать поворот заранее
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
            <View style={{flex: 1, justifyContent:'center'}}>
                <Text style={style.loadText}>Rise and Grind with Da...</Text>
            </View>
            
            <View style={[{flex: 6, width: '100%'}]}>
                <Animated.Image 
                    source={require('../images/rocket.png')} 
                    resizeMode={'contain'} 
                    style={[style.rocket, rocketPath]}
                />
            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={style.loadText}>Loading</Text>
                <LoadingDot/>
            </View>
            
            <View style={{flex: 8, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                <HandShakeMan/>
            </View>
        </SafeAreaView>
    )
}



const LoadingDot = (animateStyle) => {

    const dotState = useSharedValue(0); 
    dotState.value = withRepeat(
        withDelay(500,
                withTiming(4, {
                    duration: 3000,
                    easing: Easing.bezier(1, 1, 1, 1),
                }),
        ), -1
    )

    const dotOpacity = (index) => useAnimatedStyle(() => {
        return {
            opacity: dotState.value>index ? 
                withTiming(1, {
                    duration: 1000,
                    easing: Easing.bezier(1, 1, 1, 1),
                }) : 
                withTiming(0, {
                    duration: 1000,
                    easing: Easing.bezier(1, 1, 1, 1),
                })
        }
    });

    return (
        <>
        <Animated.Text style={[style.loadText, dotOpacity(1)]}>.</Animated.Text>
        <Animated.Text style={[style.loadText, dotOpacity(2)]}>.</Animated.Text>
        <Animated.Text style={[style.loadText, dotOpacity(3)]}>.</Animated.Text>
        </>
    )
}



const HandShakeMan = () => {
    const handShake = useSharedValue(0); 
    handShake.value = withRepeat(
                withTiming(-20, {
                    duration: 400,
                    easing: Easing.bezier(0.2, 1, 1, 1),
                }), -1, true
    )

    const handShakeRotate = useAnimatedStyle(() => {
        return {
            transform: [{translateX: 30}, {translateY: 40}, {rotateZ: `${handShake.value}deg`}]
        }
    });

    return (
        <ImageBackground source={require('../images/Body.png')} resizeMode='contain' style={{width: 200, height: 200, transform: [{scale: 1}]}}>
            <Animated.View style={[{width: 100, height: 100, justifyContent: 'center' ,alignItems: 'center'}, handShakeRotate]}>
                <Image 
                    source={require('../images/Hand.png')} 
                    style={{transform: [{translateY: -12}, {translateX: -3}, {scale: 0.5}]}}
                />
            </Animated.View>
        </ImageBackground>
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
    },
    loadText: {
        fontWeight: 'bold',
        color: '#164687',
    }
})
