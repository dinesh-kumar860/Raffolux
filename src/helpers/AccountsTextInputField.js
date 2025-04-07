import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const AccountsTextInputField = (props) => {
    const { title, formikName, placeHolder, touched, values, errors, handleChange, handleBlur, viewBackgroundColor } = props;

    const styles = StyleSheet.create({
        container: {
            gap: 2
        },
        fieldNameText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.8),
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.8)',
        },
        input: {
            height: responsiveHeight(6.2),
            paddingLeft: scale(15),
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: scale(6),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: placeHolder ? 2 : 1,
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.1)',
            color: viewBackgroundColor === '#FFFFFF' ? '#070B1A' : '#FFFFFF',
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        error: {
            color: 'red',
            textAlign: 'right',
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.fieldNameText}>{title}</Text>
            <TextInput
                style={[styles.input, touched[formikName] && errors[formikName] ? styles.inputError : null]}
                placeholder={placeHolder ? placeHolder : ""}
                onChangeText={handleChange(formikName)}
                onBlur={handleBlur(formikName)}
                value={values[formikName]}
                keyboardType={formikName === 'phoneNumber' ? "phone-pad" : null}
                maxLength={formikName === 'phoneNumber' ? 15 : formikName === 'sortCode' ? 6 : formikName === 'accountNumber' ? 8 : null}
                placeholderTextColor={viewBackgroundColor === '#FFFFFF' ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
            />
            {errors[formikName] && touched[formikName] && (<Text style={styles.error}>{errors[formikName]}</Text>)}
        </View>
    )
}

export default AccountsTextInputField

