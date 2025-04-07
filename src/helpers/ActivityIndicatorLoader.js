import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const ActivityIndicatorLoader = (props) => {
  const { theme } = props
  return (
    <View style={styles.loader}>
      <Text style={[styles.loadingText, { color: theme.color }]}>Loading</Text>
      <ActivityIndicator color={theme.theme === 'dark' ? '#FFBD0A' : theme.color} />
    </View>
  )
}

export default ActivityIndicatorLoader

const styles = StyleSheet.create({
  loader: {
    flexDirection: 'row',
    gap: scale(10),
    alignSelf: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: responsiveFontSize(2),
  }
})