import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, { event, Extrapolate, Extrapolation, interpolate, interpolateNode, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

const ITEM_SIZE = width * 0.2;
//const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const FlatListHorizontalOnScroll = () => {
    const scrollX = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });

    return (
        <View>
            <Animated.FlatList
                onScroll={onScroll}
                bounces={false}
                data={[...Array(64).keys()]}
                horizontal={true}
                renderItem={({ item, index }) => {
                    return <ImageView item={item} index={index} scrollX={scrollX} />
                    }}
                snapToInterval={ITEM_SIZE}
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: true}}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => item.toString()}
            />
        </View>
    )
}

const ImageView = ({ item, index, scrollX }) => {
    const animatedStyles = useAnimatedStyle(() => {
        const scale = interpolate(scrollX.value, [(index) * ITEM_SIZE, (index+2) * ITEM_SIZE], [1, 2], { extrapolateRight: Extrapolation.CLAMP });
        console.log(scrollX.value, ' Index:', index, ' Interpolate: ', scale)
        return {
          transform: [{ scale: scale }],
        };
      });



    return (
        <Animated.View style={{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center',backgroundColor: 'red'}}>
            <Animated.Text style={[{textAlign: 'center' ,fontSize: 14, backgroundColor: 'darkorange', width: ITEM_SIZE/2, height: ITEM_SIZE/2}, animatedStyles]}>{item}</Animated.Text>
        </Animated.View>
    )
}

export default FlatListHorizontalOnScroll