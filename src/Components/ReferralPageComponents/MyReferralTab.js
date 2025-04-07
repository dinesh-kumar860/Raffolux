import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import MyReferralsRewardBox from './MyReferralsRewardBox';
import MyReferralsCard from './MyReferralsCard';

import * as common from '../../helpers/common';

import ReferralPageRaffoluxSymbol from '../../assets/Images/ReferralPageRaffoluxSymbol.png';


const MyReferralTab = (props) => {
    const { theme, referralData, totalPoints, isAccountVerified, verifyAccount } = props;

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: scale(22)
        },
        accountVerifiedContainer: {
            flexDirection: "row",
            alignItems: 'center',
            marginTop: scale(30)
        },
        youHaveText: {
            fontFamily: 'Gilroy-ExtraBold',
            color: theme.color,
            fontSize: responsiveFontSize(2.5)
        },
        pointsContainer: {
            flexDirection: 'row',
            borderColor: theme.theme === 'dark' ? '#FFBD0A' : '#000616',
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#000616',
            paddingVertical: scale(2),
            paddingHorizontal: scale(7),
            gap: scale(5),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(5),
            borderWidth: scale(1)
        },
        iconStyle: {
            height: scale(15),
            width: scale(15),
            resizeMode: 'contain'
        },
        pointsText: {
            color: '#FFF',
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(2)
        },
        textContent: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(1.8),
            marginTop: scale(11),
            opacity: scale(0.8)
        },
        referBoxesContainer: {
            marginTop: scale(22),
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: scale(22),
        },
        niceJobText: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.theme === 'dark' ? '#FFBD0A' : '#000616',
             opacity: theme.theme === 'dark' ? scale(0.8) : null ,
            fontSize: responsiveFontSize(1.5),
            marginTop: scale(15),
            textAlign: 'center'
        },
        horizontalLine: {
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            marginVertical: scale(23),
            borderColor: theme.color,
            height:scale(1) 
        },
        referralStatus: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.5),
        },
        referralCardContainer: {
            marginTop: scale(15),
            gap: scale(8),
        },
        rewardBackgroundColorYellow: {
            backgroundColor: "#FFBD0A",
            width: 45,
            height: 45,
            borderRadius: scale(6),
            borderColor: 'theme.color',
            marginTop: scale(3),
            alignItems: 'center',
            justifyContent: "center"
        },
        rewardBackgroundColorYellowDark: {
            backgroundColor: "rgba(255, 189, 10, 0.20)",
            width: 45,
            height: 45,
            borderColor: '#FFBD0A',
            borderRadius: scale(6),
            borderWidth: scale(1.2),
            marginTop: scale(3),
            alignItems: 'center',
            justifyContent: "center"
        },
        rewardBackgroundColorNormal: {
            width: 45,
            height: 45,
            borderColor: theme.color,
            borderWidth: scale(1.2),
            opacity: scale(0.5),
            borderRadius: scale(6),
            marginTop: scale(3),
            alignItems: 'center',
            justifyContent: "center"
        },
        rewardTextColorYellow: {
            color: '#FFBD0A',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.2),
        },
        rewardTextColorNormal: {
            color: theme.color,
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.2),
            opacity: scale(0.5),
        },
        refferralStatusPending: {
            borderColor: theme.color,
            opacity: 0.5
        },
        refferralStatusComplete: {
            borderColor: '#FFBD0A',
            backgroundColor: 'rgba(255, 189, 10, 0.20)'
        },
        pendingText: {
            color: theme.color
        },
        completeText: {
            color: '#FFBD0A'
        },
        header: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.9),
            marginTop: scale(23)
        },
    });


    return (
        <View style={styles.container}>
            {
                isAccountVerified === false ?
                    null
                    :
                    <View style={styles.accountVerifiedContainer}>
                        <Text style={styles.youHaveText}>{common.Referral.YouHave}</Text>
                        <View style={styles.pointsContainer}>
                            <Image style={styles.iconStyle} source={ReferralPageRaffoluxSymbol} />
                            <Text style={styles.pointsText}>{Math.abs(totalPoints)}</Text>
                        </View>
                        <Text style={styles.youHaveText}>{common.Referral.points}</Text>
                    </View>
            }

            <Text style={styles.textContent}>{common.Referral.EarnPointsAsYouComplete}</Text>
            <View style={styles.referBoxesContainer}>
                {
                    [...Array(referralData?.referralDetails?.rewardLength)]?.map((ele, i) => {
                        if (i < referralData?.totalCompleted) {
                            return <MyReferralsRewardBox theme={theme} key={i} index={i} iconName={(i + 1) % 5 == 0 ? 'gift' : 'user-plus'} claimed={true} title={(i + 1) % 5 == 0 ? 'REWARD' : `REF${i + 1}`} rewardBackgroundColor={theme.theme === 'dark' ? styles.rewardBackgroundColorYellowDark : styles.rewardBackgroundColorYellow} rewardTextColor={styles.rewardTextColorYellow} />
                        }
                        else {
                            return <MyReferralsRewardBox theme={theme} key={i} index={i} iconName={(i + 1) % 5 == 0 ? 'gift' : 'user-plus'} title={(i + 1) % 5 == 0 ? 'REWARD' : `REF${i + 1}`} rewardBackgroundColor={styles.rewardBackgroundColorNormal} rewardTextColor={styles.rewardTextColorNormal} />
                        }
                    })
                }
            </View>
            {
                referralData?.totalCompleted >= 1 ?
                    isAccountVerified === true && <Text style={styles.niceJobText}>{common.Referral.NiceJobYouAre} {referralData?.totalCompleted === 5 ? `5` : `${5 - referralData?.totalCompleted}`} {common.Referral.referralsAwayFromEarningReward}</Text> : null
            }

            <View style={styles.horizontalLine}></View>
            {
                referralData?.referralStatus?.length > 0 &&
                <>
                    <Text style={styles.referralStatus}>{common.Referral.REFERRALSTATUS}</Text>
                    <View style={styles.referralCardContainer}>
                        {
                            referralData?.referralStatus?.map((ele, i) => (
                                <MyReferralsCard key={i} theme={theme} shortName={'shortName'} fullName={ele.invited} status={ele.status === 1 ? 'Pending' : 'Complete'} statusBorder={ele.status === 1 ? styles.refferralStatusPending : styles.refferralStatusComplete} time={ele.created} statusText={ele.status === 1 ? styles.pendingText : styles.completeText} />
                            ))
                        }
                    </View></>
            }

        </View>
    )
}

export default MyReferralTab

