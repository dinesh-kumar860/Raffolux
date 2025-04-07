import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const ClaimTextInputFields = (props) => {
    const { title, formikName, touched, values, errors, handleChange, handleBlur, theme } = props;
    const styles = StyleSheet.create({
        singleInputFieldContainer: {
            gap: scale(6)
        },
        addressInputName: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            opacity: scale(0.7)
        },
        addressInputField: {
            height: scale(44),
            borderWidth: scale(1),
            borderRadius: scale(6),
            color: theme.color,
            backgroundColor: theme.theme === 'dark' ? 'rgba(216, 216, 216, 0.40)' : '#FAFAFC',
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.10)',
            paddingLeft: scale(20)
        },
        error: {
            color: 'red',
            textAlign: 'right'
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        }
    })


    return (
        <View style={styles.singleInputFieldContainer}>
            <Text style={styles.addressInputName}>{title}</Text>
            <TextInput style={[styles.addressInputField, touched[formikName] && errors[formikName] ? styles.inputError : null]}
                placeholder=""
                onChangeText={handleChange(formikName)}
                onBlur={handleBlur(formikName)}
                value={values[formikName]}
                keyboardType={formikName === 'sortCode' || formikName === 'phoneNumber' ? 'phone-pad' : null}
                maxLength={formikName === 'sortCode' ? 6 : formikName === 'accountNumber' ? 8 : formikName === 'phoneNumber' ? 11 : null}
            />
            {errors[formikName] && touched[formikName] && (<Text style={styles.error}>{errors[formikName]}</Text>)}
        </View>
    )
}

export default ClaimTextInputFields
