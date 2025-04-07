import AsyncStorage from '@react-native-async-storage/async-storage';

export const RaffoluxAsyncStorage = {
    setItem: async (key, value) => { await AsyncStorage.setItem(key, JSON.stringify(value)) },
    getItem: async (key) => {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    },
    removeItem: async (key) => { await AsyncStorage.removeItem(key); },
    clearAll: async () => { await AsyncStorage.clear(); }
}