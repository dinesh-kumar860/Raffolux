import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const StepperComponentConfirmation = (props) => {
    const { theme } = props
    return (
        <View style={styles.container}>
            <View style={styles.stepperSection}>
                <View style={styles.stepperLinks}>
                    <View style={{ flex: 1 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginLeft: scale(22) }}>
                            <View style={[styles.darkCircle, { backgroundColor: '#FFBD0A', opacity: scale(1) }]}></View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                {/* <View style={[styles.yellowLine, { opacity: scale(1) }]}></View> */}
                                <View style={[styles.yellowLine, { opacity: scale(1) }]}></View>
                            </View>
                        </View>
                        <Text style={[styles.stepperText, { color: '#FFBD0A' }]}>Prize Claim</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <View style={[styles.yellowLine, { opacity: scale(1) }]}>
                            </View>
                            <View style={[styles.darkCircle, { backgroundColor: '#FFBD0A', opacity: scale(1) }]}></View>
                            <View style={[styles.yellowLine, { opacity: scale(1) }]}>
                            </View>
                        </View>
                        <Text style={[styles.stepperText, { textAlign: "center", color: '#FFBD0A' }]}>Summary</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginRight: scale(22) }}>
                            <View style={[styles.yellowLine, { opacity: scale(1) }]}>
                            </View>
                            <View>
                                <View style={[styles.stepperCircle]}></View>
                            </View>

                        </View>
                        <Text style={[styles.stepperText, { textAlign: "right", color: '#FFBD0A'  }]}>Confirmation</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: scale(7),
        marginRight: scale(2)

    },
    stepperSection: {
        flex: 1,
    },
    stepperLinks: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    stepperCircle: {
        width: scale(15),
        height: scale(15),
        borderRadius: scale(10),
        borderWidth: scale(3.5),
        borderColor: '#FFAE03',
    },
    yellowLine: {
        flex: 1,
        height: scale(4),
        backgroundColor: '#FFBD0A',
        opacity: scale(0.5)
    },
    blackLine: {
        flex: 1,
        height: scale(4),
        backgroundColor: '#FFBD0A',
        backgroundColor: '#000',
        opacity: scale(0.1000000014901161),
    },
    darkCircle: {
        height: scale(10),
        width: scale(10),
        backgroundColor: '#000',
        borderRadius: scale(10),
        opacity: scale(0.1000000014901161),
    },
    stepperLinksText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stepperText: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(1.5),
        marginTop: scale(12),
        color: '#000616',
    }
});

export default StepperComponentConfirmation;









