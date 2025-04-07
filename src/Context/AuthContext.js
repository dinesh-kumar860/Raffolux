import React, { createContext, useState, useEffect } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Common from '../helpers/common';
// import useFullPageLoader from "../helpers/useFullPageLoader";
import { RaffoluxAsyncStorage } from "../utils/RaffoluxAsyncStorage";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isHomePageCreateAccountLoginModalVisible, setIsHomePageCreateAccountLoginModalVisible] = useState(false);
    const [isUserExists, setIsUserExists] = useState(false);

    useEffect(() => {
        isLoggedIn();
    }, [])

    const authLogin = async (token) => {
        setIsLoading(true);
        setUserToken(token);
        await RaffoluxAsyncStorage.setItem(Common.Home.Token, `${token}`);
        setIsLoading(false);
    }


    const logout = async () => {
        // setIsLoading(true);
        setUserToken(null);
        await RaffoluxAsyncStorage.removeItem(Common.Home.Token);
        // setIsLoading(false);
        // Toast.show({ type: 'success', props: { text1: 'Successfully Logged Out' } });
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await RaffoluxAsyncStorage.getItem(Common.Home.Token);
            setUserToken(userToken);
            setIsLoading(false);
        }
        catch (e) {
            Toast.show({ type: 'error', props: { text1: `Authentication Error ${e}` } });
        }
    }
    return (
        <AuthContext.Provider value={{ authLogin, logout, isLoading, userToken, setIsNavVisible, isNavVisible, setIsHomePageCreateAccountLoginModalVisible, isHomePageCreateAccountLoginModalVisible, setIsUserExists, isUserExists }}>
            {children}
        </AuthContext.Provider>
    )
}