import {Platform, StyleSheet} from 'react-native';

export const shadowStyle = () => {
    return Platform.OS === 'ios'
        ? {
            shadowColor: '#333333',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            shadowOffset: {width: 2, height: 4},
        }
        : {elevation: 3};
};

export const  screenHP = 20

const commonStyles = StyleSheet.create({

})