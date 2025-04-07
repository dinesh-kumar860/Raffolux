import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { memo, useState } from 'react'
import { scale } from 'react-native-size-matters';

const TicketsList = (props) => {
  const { id, status, ticketNumber, viewBackgroundColor, ticketSelect, setTicketSelect, selections, setSelections, handleRemoveTicket, _setEntryCost, _entryCost } = props;
  const handleTicketButtonClick = (n) => {
    setTicketSelect(!ticketSelect);
    let selectionsArray = [...selections];
    !selectionsArray.includes(n) && selectionsArray.push(n);
    setSelections(selectionsArray);
  }

  const styles = StyleSheet.create({
    numberTextLightMode: {
      color: (viewBackgroundColor === '#FFFFFF' || viewBackgroundColor !== '#FFFFFF') && status === 2 ? "rgba(0, 6, 22, 0.6)" : (viewBackgroundColor === '#FFFFFF' && status === 3) ? "rgba(0, 6, 22, 0.2)" : (viewBackgroundColor !== '#FFFFFF' && status === 3) ? "#292e3b" : (viewBackgroundColor === '#FFFFFF' && status === 1) ? 'rgba(0, 6, 22, 0.6)' : "#070B1A",
      fontSize: scale(15),
      fontFamily: 'Gilroy-ExtraBold',
    },
    numberTextDarkMode: {
      color: status === 2 ? "rgba(255, 255, 255, 0.6)" : status === 3 ? "rgba(255, 255, 255, 0.15)" : status === 1 ? 'rgba(255, 255, 255, 0.6)' : "#070B1A",
      fontSize: scale(15),
      fontFamily: 'Gilroy-ExtraBold',
    },
    selectedTextLight: {
      color: '#000616',
      fontSize: scale(15),
      fontFamily: 'Gilroy-ExtraBold',
    },
    selectedTextDark: {
      color: '#000616',
      fontSize: scale(15),
      fontFamily: 'Gilroy-ExtraBold',
    },
    defaultButtonDark: {
      height: scale(47),
      width: scale(47),
      marginBottom: scale(12),
      backgroundColor: (viewBackgroundColor === '#FFFFFF' || viewBackgroundColor !== '#FFFFFF') && status === 2 ? "green" : (viewBackgroundColor === '#FFFFFF' && status === 3) ? "#c9cbce" : (viewBackgroundColor !== '#FFFFFF' && status === 3) ? "#292e3b" : (viewBackgroundColor === '#FFFFFF' && status === 1) ? '#FFFFFF' : "#070B1A",
      borderColor: (viewBackgroundColor === '#FFFFFF' || viewBackgroundColor !== '#FFFFFF') && status === 2 ? "green" : (viewBackgroundColor === '#FFFFFF' && status === 3) ? "#c9cbce" : (viewBackgroundColor !== '#FFFFFF' && status === 3) ? "#292e3b" : (viewBackgroundColor === '#FFFFFF' && status === 1) ? '#FFFFFF' : 'rgba(151, 151, 151, 0.6)',
      borderWidth: scale(1),
      borderRadius: scale(8),
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedButtonDark: {
      height: scale(47),
      width: scale(47),
      marginBottom: scale(12),
      backgroundColor: "#FFBD0A",
      borderColor: "rgba(151, 151, 151, 0.6)",
      borderWidth: scale(1),
      borderRadius: scale(8),
      justifyContent: 'center',
      alignItems: 'center'
    },
    defaultButtonLight: {
      height: scale(47),
      width: scale(47),
      marginBottom: scale(12),
      backgroundColor: (viewBackgroundColor === '#FFFFFF' || viewBackgroundColor !== '#FFFFFF') && status === 2 ? "green" : (viewBackgroundColor === '#FFFFFF' && status === 3) ? "#c9cbce" : (viewBackgroundColor !== '#FFFFFF' && status === 3) ? "#292e3b" : (viewBackgroundColor === '#FFFFFF' && status === 1) ? '#FFFFFF' : "#000616",
      borderColor: "rgba(151, 151, 151, 0.15)",
      borderWidth: scale(1),
      borderRadius: scale(8),
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedButtonLight: {
      height: scale(47),
      width: scale(47),
      marginBottom: scale(12),
      backgroundColor: "#FFBD0A",
      borderColor: "#FFBD0A",
      borderWidth: scale(1),
      borderRadius: scale(8),
      justifyContent: 'center',
      alignItems: 'center'
    },
  })

  return (
    <Pressable
      style={
        viewBackgroundColor === '#FFFFFF' ? selections.includes(ticketNumber) ? styles.selectedButtonLight : styles.defaultButtonLight : selections.includes(ticketNumber) ? styles.selectedButtonDark : styles.defaultButtonDark
      }
      onPress={() => (status === 3 || status === 2) ? null : (selections.includes(ticketNumber) ? handleRemoveTicket(ticketNumber) : handleTicketButtonClick(ticketNumber))}
    // disabled={(status === 3 || status === 2) ? true : false}
    // pointerEvents={(status === 3 || status === 2) ? 'box-none' : 'auto'}
    // pointerEvents='none'
    >
      <Text style={viewBackgroundColor === '#FFFFFF' ? selections.includes(ticketNumber) ? styles.selectedTextDark : styles.numberTextLightMode : selections.includes(ticketNumber) ? styles.selectedTextDark : styles.numberTextDarkMode}>{ticketNumber}</Text>
    </Pressable>
  )
}

export default memo(TicketsList);