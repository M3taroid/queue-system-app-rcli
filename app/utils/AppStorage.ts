import AsyncStorage from '@react-native-async-storage/async-storage';

const setStringItem = async (key: string, value: string) => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log('async err', key, e);
    }
};

const setObjectItem = async (key: string, value: object) => {
    try {
        const jsonValue = JSON.stringify(value);
        return await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('async err', e);
    }
};

const getStringItem = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        // error reading value
    }
};

const getObjectItem = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};

const removeItem = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (e) {
        // error reading value
    }
};

const clearItems = async () => {
    try {
        return await AsyncStorage.clear();
    } catch (e) {
        // error reading value
    }
};

const exps = {
    setStringItem,
    setObjectItem,
    getStringItem,
    getObjectItem,
    removeItem,
    clearItems,
};

export default exps;