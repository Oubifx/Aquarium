import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import RenderItem from "./RenderItem";

const FlatListHorizontal = () => {

    const selectedElm = useSharedValue(0);

    const renderItem = ({item, index}) => {
        return <RenderItem item={item} index={index} selectedElm={selectedElm}/>
    }
    
    const onViewableItemsChanged = ({ viewableItems, changed }) => {
        let visible = viewableItems
        console.log(visible)
        visible[3]?.["index"] ? selectedElm.value = visible[3]["index"] : null
    }
    
    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ scale: selectedElm.value/10 }],
        };
      });

    return (
        <View>
            <Animated.FlatList
                data={[...Array(64).keys()]}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 60,
                    minimumViewTime: 100
                }}
                renderItem={renderItem}
                horizontal={true}
                style={{height: 100, backgroundColor: 'red'}}
                contentContainerStyle={{justifyContent: 'center', alignSelf: 'center'}}
                snapToAlignment={'center'}  
                snapToInterval={48} 
                getItemLayout={(data, index) => (
                    {length: 48, offset: 48*index, index}
                )}
            />
        </View>
    )
}

export default FlatListHorizontal

const style = StyleSheet.create({
    item: {
        backgroundColor: 'darkgreen',
        width: 40,
        height: 40,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 60,
        height: 60,
        backgroundColor: 'red'
    }
})