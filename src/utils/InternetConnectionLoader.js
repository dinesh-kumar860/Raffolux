import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InternetConnectionLoader = () => {
    return (
        <View style={styles.container}>
            <Text>No Internet Connection</Text>
        </View>
    )
}

export default InternetConnectionLoader

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})