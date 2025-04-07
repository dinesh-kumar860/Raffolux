import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux';
import { EventRegister } from 'react-native-event-listeners';
import Toast from 'react-native-toast-message';
import { ErrorBoundary } from "react-error-boundary";
import Orientation from 'react-native-orientation-locker';

import { store } from './src/ReduxToolKit/store';
import { AuthProvider } from "./src/Context/AuthContext";
import { toastConfig } from './src/utils/Toaster';
import ThemeContext from './src/utils/themes/themeWrapper';
import Theme from './src/utils/themes/themes';
import { RaffoluxAsyncStorage } from './src/utils/RaffoluxAsyncStorage';
import Fallback from './src/ErrorBoundary/Fallback';
import { AppConstants } from './src/helpers/common';
import { InternetProvider } from './src/utils/InternetConnection/InternetContextWrapper'
import InternetStatus from './src/utils/InternetConnection/InternetStatus'
import AppStackNavigation from './src/navigation/AppStackNavigation';
import messaging from '@react-native-firebase/messaging';
import { Alert, Linking, Platform } from 'react-native';
import { Klaviyo, Profile } from 'klaviyo-react-native-sdk';

import VersionCheck from 'react-native-version-check';

const App = () => {
    const [mode, setMode] = useState(false);

    useEffect(() => {
        const fetchThemeMode = async () => {
            try {
                const themeModeFromStorage = await RaffoluxAsyncStorage.getItem('themeMode');
                if (themeModeFromStorage !== null) {
                    setMode(themeModeFromStorage);
                }
            } catch (error) {
                console.error(AppConstants.ErrorFetchingThemeModeFromAsyncStorage, error);
            }
        };

        fetchThemeMode();

        let eventListener = EventRegister.addEventListener('changeTheme',
            async (data) => {
                setMode(data)
            });
        // return () => { EventRegister.removeEventListener(eventListener) }

        // To lock to portrait mode
        Orientation.lockToPortrait();
    }, []);

    // useEffect(() => {
    //     const checkAppVersion = async () => {
    //         try {
    //             const latestVersion = Platform.OS === 'ios' ? await fetch(`https://itunes.apple.com/in/lookup?bundleId=com.raffolux.app`)
    //                 .then(r => r.json())
    //                 .then((res) => { return res?.results[0]?.version })
    //                 : await VersionCheck.getLatestVersion({
    //                     provider: 'playStore',
    //                     packageName: 'com.raffolux.app',
    //                     ignoreErrors: true,
    //                 });

    //             const currentVersion = VersionCheck.getCurrentVersion();
    //                 console.log({latestVersion},{currentVersion})
    //             if (latestVersion > currentVersion) {
    //                 Alert.alert(
    //                     'Update Required',
    //                     'A new version of the app is available. Please update to continue using the app.',
    //                     [
    //                         {
    //                             text: 'Update Now',
    //                             onPress: () => {
    //                                 Linking.openURL(
    //                                     Platform.OS === 'ios'
    //                                         ? VersionCheck.getAppStoreUrl({ appID: 'com.raffolux.app' })
    //                                         : VersionCheck.getPlayStoreUrl({ packageName: 'com.raffolux.app' })
    //                                 );
    //                             },
    //                         },
    //                     ],
    //                     { cancelable: false }
    //                 );
    //             } else {
    //                 // App is up-to-date; proceed with the app
    //             }
    //         } catch (error) {
    //             // Handle error while checking app version
    //             console.error('Error checking app version:', error);
    //         }
    //     };

    //     checkAppVersion();
    // }, []);


    // useEffect(() => {
    //     VersionCheck.needUpdate({
    //         currentVersion: VersionCheck.getCurrentVersion(),
    //         latestVersion: '2.0',
    //     }).then((res) => {
    //         if (res.isNeeded) {
    //             Alert.alert(
    //                 'Update Required',
    //                 'A new version of the app is available. Please update to continue using the app.',
    //                 [
    //                     {
    //                         text: 'Update Now',
    //                         onPress: () => {
    //                             Linking.openURL(
    //                                 Platform.OS === 'ios'
    //                                     ? VersionCheck.getAppStoreUrl({ appID: 'com.raffolux.app' })
    //                                     : VersionCheck.getPlayStoreUrl({ packageName: 'com.raffolux.app' })
    //                             );
    //                         },
    //                     },
    //                 ],
    //                 { cancelable: false }
    //             );
    //         }
    //     })
    // }, [])

    const linking = { prefixes: ['raffoluxmobile://'], config: { screens: { Main: { path: 'open?', parse: { authToken: (authToken) => authToken, }, }, }, }, };


    const getToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        requestUserPermission();
        getToken();
    }, [])

    return (
        <AuthProvider>
            <InternetProvider>
                <ErrorBoundary FallbackComponent={Fallback}
                    onReset={(details) => {
                        // Reset the state of your app so the error doesn't happen again
                    }}
                >
                    <ThemeContext.Provider value={mode === true ? Theme.dark : Theme.light}>
                        <Provider store={store}>
                            <AppStackNavigation linking={linking} />
                            <InternetStatus />
                        </Provider>
                        <Toast config={toastConfig} />
                    </ThemeContext.Provider>
                </ErrorBoundary>
            </InternetProvider>
        </AuthProvider>
    )
}

export default App