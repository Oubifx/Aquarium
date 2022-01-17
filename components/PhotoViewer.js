import React from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

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

    const scrollX = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            console.log(e.contentOffset.y)
        },
    });

    const renderItem = ({item}) => {
        return (
            <View style={{backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', width: width, height: ITEM_HEIGHT, borderWidth: 1, borderColor: 'white'}}>
                <View style={{margin: 50, backgroundColor: 'darkgreen', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image resizeMode={'contain'} style={{backgroundColor: 'black', width: width-ITEM_IDENT, height: ITEM_HEIGHT-ITEM_IDENT}} source={item}/>
                </View>
            </View>
        )
    }
    
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Animated.FlatList
                bounces={false}
                data={IMAGES}
                renderItem={renderItem}
                snapToInterval={ITEM_HEIGHT}
                style={{flex: 1}}
                onScroll={onScroll}
            />
        </View>

    )
}

export default PhotoViewer