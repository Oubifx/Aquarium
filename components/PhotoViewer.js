import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const IMAGES = [
    require('../images/planet1.png'),
    require('../images/planet2.png'),
    require('../images/planet3.png'),
    require('../images/planet4.png'),
    require('../images/planet1.png'),
    require('../images/planet2.png'),
    require('../images/planet3.png'),
    require('../images/planet4.png'),
    require('../images/planet1.png'),
    require('../images/planet2.png'),
    require('../images/planet3.png'),
    require('../images/planet4.png'),
    require('../images/planet1.png'),
    require('../images/planet2.png'),
    require('../images/planet3.png'),
    require('../images/planet4.png'),
    require('../images/planet1.png'),
    require('../images/planet2.png'),
    require('../images/planet3.png'),
    require('../images/planet4.png'),
    require('../images/planet1.png'),
    require('../images/planet2.png'),
    require('../images/planet3.png'),
    require('../images/planet4.png'),
];

const {height, width} = Dimensions.get('screen')
const ITEM_HEIGHT = height/5
const ITEM_IDENT = 20

const PhotoViewer = () => {

    const scrollY = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollY.value = e.contentOffset.y
            //console.log(scrollY.value)
        },
    });
/*
                [ITEM_HEIGHT*(index+1),ITEM_HEIGHT*index],
                [0.5, 1],
*/
    const Planet = ({item, index}) => {
        const scaleAnim = useAnimatedStyle(() => {
            const scale = interpolate(
                index * ITEM_HEIGHT - scrollY.value, 
                [-ITEM_HEIGHT,0, height-ITEM_HEIGHT, height],
                [0.5, 1, 1 ,0.5],
                { extrapolateRight: Extrapolation.CLAMP });
                console.log(scale)
            return {
              transform: [{ scale: scale }],
            };
        });

        return (
            <View style={style.itemContainer}>
                <Animated.View style={[style.item, scaleAnim]}>
                    <Image resizeMode={'contain'} style={{width: '100%', height: '100%'}} source={item}/>
                </Animated.View>
            </View>
        )
    }
    
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Animated.FlatList
                bounces={false}
                data={IMAGES}
                renderItem={({ item, index }) => {
                    return <Planet item={item} index={index}/>
                    }}
                //snapToInterval={ITEM_HEIGHT}
                style={{flex: 1}}
                onScroll={onScroll}
            />
        </View>

    )
}

export default PhotoViewer

const style = StyleSheet.create({
    item: {
        backgroundColor: 'black', 
        width: width-ITEM_IDENT, 
        height: ITEM_HEIGHT-ITEM_IDENT, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 12, 
        padding: 20
    },
    itemContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: width, height: 
        ITEM_HEIGHT
    }
})