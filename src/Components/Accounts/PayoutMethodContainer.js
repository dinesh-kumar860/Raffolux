import { View, Text } from 'react-native'
import React from 'react'
import PayoutMethod from './PayoutMethod'

const PayoutMethodContainer = (props) => {
  const {viewBackgroundColor} = props
  return (
  <PayoutMethod viewBackgroundColor={viewBackgroundColor}/>
  )
}

export default PayoutMethodContainer