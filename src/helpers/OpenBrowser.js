import InAppBrowser from "react-native-inappbrowser-reborn"

export  const openLink = async (url) => {
    try {
        await InAppBrowser.isAvailable();
        await InAppBrowser.open(url, {
            // iOS Properties
            dismissButtonStyle: 'cancel',
            preferredBarTintColor: 'gray',
            preferredControlTintColor: 'white',
            // Android Properties
            showTitle: true,
            toolbarColor: '#6200EE',
            secondaryToolbarColor: 'black',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: true,
            incognito:true,
            
        }).then((result) => {
            // Alert.alert(JSON.stringify(result))
            return result
        })
    } catch (error) {
        // Alert.alert(error.message)
        console.log(error)
    }
    
}