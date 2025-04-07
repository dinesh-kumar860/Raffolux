import React, { useContext, useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import * as Common from '../../helpers/common';
import ThemeContext from '../../utils/themes/themeWrapper';
import { useInternet } from '../../utils/InternetConnection/InternetContextWrapper';

import { updateServiceOptsWithLogin } from '../../api/accountsApi';
import { fetchAccount } from '../../ReduxToolKit/apiSlice';


const MarketingPreferences = () => {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch()
    const { isConnected } = useInternet()
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefreshing] = useState(false);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [toggleCheckBox1, setToggleCheckBox1] = useState(route.params.apiFormData.is_email_opts);
    const [toggleCheckBox2, setToggleCheckBox2] = useState(route.params.apiFormData.is_sms_opts);

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    const handleUpdateServiceOptsWithLogin = async () => {
        const data = { emailOpts: toggleCheckBox1, smsOpts: toggleCheckBox2 }
        const response = await updateServiceOptsWithLogin(data);
        if(response){
            dispatch(fetchAccount())
        }
    }

    useEffect(() => {
        if (isConnected === true) {
            handleUpdateServiceOptsWithLogin();
            dispatch(fetchAccount())
        }
    }, [toggleCheckBox1, toggleCheckBox2, isConnected]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            handleUpdateServiceOptsWithLogin();
            dispatch(fetchAccount())
        }, 1000);
    }, []);

    const CheckboxContent = ({ title, toggleCheckBox, setToggleCheckBox }) => {

        return (
            <View style={styles.formContainer}>
                <View style={[styles.addressBoxConatiner]} >
                    <CheckBox
                        style={[styles.checkBox, { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }]}
                        tintColors={{ true: '#FFBD0A', false: viewBackgroundColor === '#FFFFFF' ? '#474750' : '#d0d0d4' }}
                        onCheckColor={viewBackgroundColor}
                        // disabled={toggleCheckBox}
                        value={toggleCheckBox}
                        onValueChange={newValue => setToggleCheckBox(!toggleCheckBox)}
                        boxType='square'
                        onFillColor='#FFBD0A'
                        // tintColor={viewBackgroundColor === '#FFFFFF' ? '#474750' : '#d0d0d4'}
                        onTintColor='#FFBD0A'
                    />
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>{title}</Text>
                    </View>
                </View>
            </View>
        )
    };


    const styles = StyleSheet.create({
        MainContainer: {
            flex: 1,
            paddingHorizontal: scale(16),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616'
        },
        headerBar: {
            height: scale(48),
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        headerBarIcon: {
            textAlign: 'left',
            flex: 0.1
        },
        headerTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontSize: responsiveFontSize(3.5),
            fontFamily: 'Gilroy-ExtraBold',
            marginBottom: scale(24),
        },
        useDetailsStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(24)
        },
        formContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            borderRadius: scale(12),
            marginBottom: scale(16),
            paddingVertical: scale(17),
        },
        addressBoxConatiner: {
            borderRadius: scale(6),
            flexDirection: 'row',
            alignItems: "center",
            paddingLeft: scale(22),
            paddingRight: scale(25),
            gap: scale(22),
        },
        addressContainer: {
            flex: 1,
        },
        addressText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.7),
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
        }
    });


    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                    <View style={styles.headerBar}>
                        <Pressable style={styles.headerBarIcon} onPress={() => navigation.goBack()} >
                            <AntDesign name={'left'} size={18} color={theme.color} />
                        </Pressable>
                    </View>
                <Text style={styles.headerTextStyle}>{Common.account.MarketingPreferences}</Text>
                <View>
                    <Text style={styles.useDetailsStyle}>{Common.account.HowShouldWeContactYou}</Text>
                    <CheckboxContent title={Common.account.IWouldLikeToReceiveExcitingUpdates} toggleCheckBox={toggleCheckBox1} setToggleCheckBox={setToggleCheckBox1} />
                    <CheckboxContent title={Common.account.IWantToOptInForOccasionalSMSMarketing} toggleCheckBox={toggleCheckBox2} setToggleCheckBox={setToggleCheckBox2} />
                </View>
            </ScrollView>
        </View>
    )
}

export default MarketingPreferences