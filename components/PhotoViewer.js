import React from 'react';
import { Dimensions, FlatList, Image, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

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
const ITEM_SIZE = width

const PhotoViewer = () => {

    const renderItem = ({item}) => {
        console.log('images: ',item)
        return (
            <View style={{width: ITEM_SIZE, height: height/3, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', borderWidth: 2}}>
                <Image resizeMode={'contain'} style={{flex: 1, margin: 20}} source={item}/>
            </View>
        )
    }

    return (
        <FlatList
            bounces={false}
            data={IMAGES}
            renderItem={renderItem}
            style={{backgroundColor: 'pink', flex: 1}}
            snapToInterval={height/3}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'brown'}}
        />
    )
}

export default PhotoViewer