import { Modal, Pressable, StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../utils/themes/themeWrapper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ClaimAddDetailsModal from './ClaimAddDetailsModal';
import { deleteBankDetailsWithLogin, deletePaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';
import Toast from 'react-native-simple-toast';

const ClaimPayoutData = (props) => {
    const { id, idToSend, mainText, subText, setSelectedPayoutId, isSelected, validationSchema, initialValues, inputFields, buttonText, type, fetchDetails } = props
    const theme = useContext(ThemeContext);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isDataDeleting, setIsDataDeleting] = useState(false)

    const styles = StyleSheet.create({
        container: {
            paddingLeft: 17,
            paddingRight: 11,
            paddingTop: 11,
            paddingBottom: 11,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: isSelected ? '#FFBD0A' : theme.theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        },
        closeIconContainer: {
            alignSelf: 'flex-end'
        },
        contentContainer: {
            flexDirection: 'row',
            flex: 1,
            gap: responsiveWidth(6),
            alignItems: 'center',
            marginRight: responsiveWidth(10)
        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 50,
            borderWidth: !isSelected ? 1 : 0,
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            backgroundColor: isSelected ? '#FFBD0A' : null,
            alignItems: 'center',
            justifyContent: 'center'
        },
        editContainer: {
            alignSelf: 'flex-end',
            width: responsiveWidth(10),
            height: responsiveHeight(3),
            backgroundColor: '#FFBD0A',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3
        },
        editText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            color: '#000616',
        },
        contentDataContainer: {
            flex: 1,
            gap: responsiveHeight(1)
        },
        mainText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            opacity: isSelected ? 1 : 0.8
        },
        dataTextFont: {
            fontFamily: 'NunitoSans-Regular'
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(3)
        }
    });

    const handleOnPress = () => setSelectedPayoutId(id)


    const handleDelete = async () => {

        let apiFunction, params;

        if (type === 'paypalEdit') {
            apiFunction = deletePaypalDetailsWithLogin;
            params = { payPalId: idToSend };
        } else if (type === 'bankEdit') {
            apiFunction = deleteBankDetailsWithLogin;
            params = { bankId: idToSend };
        } else {
            return;
        }

        setIsDataDeleting(true);

        try {
            const response = await apiFunction(params);
            if (response) {
                fetchDetails();
                isSelected && setSelectedPayoutId(null)
                Toast.show('Deleted Successfully', Toast.SHORT);
            }
        } finally {
            setIsDataDeleting(false);
        }
    };


    return (
        <>
            <Pressable style={styles.container} onPress={() => handleOnPress()}>
                <Pressable style={styles.closeIconContainer} onPress={() => handleDelete()}>
                    {
                        isDataDeleting ? <ActivityIndicator color={theme.color} /> : <Ionicons name={'close'} size={15} color={theme.color} />
                    }
                </Pressable>
                <View style={styles.contentContainer}>
                    <View style={styles.radioButton}>
                        {isSelected && <Feather name={'check'} size={10} color={theme.background} />}
                    </View>
                    <View style={styles.contentDataContainer}>
                        <Text style={styles.mainText} >{mainText}</Text>
                        {subText && <Text style={[styles.mainText, styles.dataTextFont]}>{subText}</Text>}
                    </View>
                </View>
                <TouchableOpacity style={styles.editContainer} onPress={() => setEditModalVisible(!editModalVisible)} >
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </Pressable>
            <Modal animationType='slide' visible={editModalVisible} transparent={true} onRequestClose={() => setEditModalVisible(!editModalVisible)}   >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.modalBackgroundOpacity}>
                        <ClaimAddDetailsModal modalVisible={editModalVisible} setModalVisible={setEditModalVisible} initialValues={initialValues} validationSchema={validationSchema} inputFields={inputFields} buttonText={buttonText} type={type} fetchDetails={fetchDetails} id={idToSend} />
                    </View>
                </ScrollView>
            </Modal>
        </>

    )
}

export default ClaimPayoutData


