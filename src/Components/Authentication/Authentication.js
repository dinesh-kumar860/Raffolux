import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import Login from './Login';
import SignUpNew from './SignUpNew';

import ThemeContext from '../../utils/themes/themeWrapper';
import { AuthContext } from '../../Context/AuthContext';


const Authentication = () => {
    const [activeTab, setActiveTab] = useState('signIn');

    const theme = useContext(ThemeContext)
    const { isUserExists } = useContext(AuthContext)

    const handleTabs = (tab) => setActiveTab(tab);

    const Tab = ({ title, tabName, pressed }) => {
        return (
            <Pressable style={styles.singleTabContainer1(tabName, pressed)} onPress={() => { handleTabs(tabName) }}>
                <Text style={styles.signText(pressed)} >{title}</Text>
            </Pressable>
        )
    };

    useEffect(() => {
        if (isUserExists) {
            setActiveTab('signIn')
        }
    }, [isUserExists])

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            paddingHorizontal: scale(18),
            marginBottom: scale(40)
        },
        tabsContainer: {
            marginHorizontal: responsiveWidth(14),
            flexDirection: 'row',
            borderWidth: scale(1.24),
            borderColor: 'rgba(0, 6, 22, 0.195995)',
            borderRadius: scale(6),
            marginVertical: responsiveHeight(4.2),
        },
        singleTabContainer1(tab, pressed) {
            return {
                height: responsiveHeight(5),
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.theme == 'light' ? pressed ? 'rgba(0, 6, 22, 0.05)' : null : pressed ? '#070B1A' : null,
                borderColor: theme.theme == 'light' ? pressed ? ' rgba(0, 6, 22, 0.195995)' : null : pressed ? 'rgba(151, 151, 151, 0.60)' : 'rgba(151, 151, 151, 0.60)',
                borderTopWidth: pressed ? scale(0.2) : theme.theme == 'dark' ? scale(0.2) : null,
                borderBottomWidth: pressed ? scale(0.2) : theme.theme == 'dark' ? scale(0.2) : null,
                borderTopRightRadius: tab == 'signIn' ? pressed ? scale(6) : null : scale(6),
                borderBottomEndRadius: tab == 'signIn' ? pressed ? scale(6) : null : scale(6),
                borderRightWidth: tab == 'signIn' ? pressed ? scale(1.24) : null : theme.theme == 'dark' ? scale(1.24) : null,
                borderTopLeftRadius: tab == 'signUp' ? pressed ? scale(6) : null : scale(6),
                borderBottomLeftRadius: tab == 'signUp' ? pressed ? scale(6) : null : scale(6),
                borderLeftWidth: tab == 'signUp' ? pressed ? scale(1.24) : null : theme.theme == 'dark' ? scale(1.24) : null
            }
        },
        signText(pressed) {
            return {
                fontFamily: 'NunitoSans-Regular',
                textAlign: 'center',
                fontSize: responsiveFontSize(2),
                color: theme.color,
                opacity: pressed ? scale(0.9) : scale(0.3)
            }
        },
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.tabsContainer}>
                        <Tab title={'Sign in'} tabName={'signIn'} pressed={activeTab == 'signIn'} />
                        <Tab title={'Sign up'} tabName={'signUp'} pressed={activeTab == 'signUp'} />
                    </View>
                    {
                        activeTab == 'signIn' && <Login isUserExists={isUserExists} />
                    }
                    {
                        activeTab == 'signUp' && <SignUpNew signInTab={() => setActiveTab('signIn')} />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Authentication;


