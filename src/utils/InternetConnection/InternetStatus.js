// InternetStatus.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useInternet } from './InternetContextWrapper';

const InternetStatus = () => {
    const { isConnected } = useInternet();

    return (
        <>
            {
                isConnected === false ?
                    <View style={[styles.container, { backgroundColor: 'red' }]}>
                        <Text style={styles.text}>Internet Disconnected</Text>
                    </View>
                    :
                    null
            }

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});

export default InternetStatus;
