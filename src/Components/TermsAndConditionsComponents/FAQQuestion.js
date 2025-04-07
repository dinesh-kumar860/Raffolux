import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';

import { openLink } from '../../helpers/OpenBrowser';

import { AuthContext } from '../../Context/AuthContext';


const FAQQuestion = (props) => {
    const { theme, title } = props;
    const navigation = useNavigation()
    const [isPressed, setIsPressed] = useState(false);
    const { userToken } = useContext(AuthContext);


    const toggleQuestion = () => setIsPressed(!isPressed)


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: scale(22),
            alignItems: 'center'
        },
        imageContainer: {
            width: 40,
            height: 40,
            backgroundColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,6,22,0.05)',
            borderColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0,6,22,0.20)',
            borderWidth: scale(0.886),
            borderRadius: scale(4.286),
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: 16,
            height: 16,
            resizeMode: 'contain'
        },
        questionContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        expandCloseImage: {
            width: 24,
            height: 24,
            resizeMode: 'contain',
            marginLeft: scale(12)
        },
        title: {
            fontFamily: 'NunitoSans-ExtraBold',
            fontSize: responsiveFontSize(2),
            letterSpacing: scale(0.417),
            color: theme.color,
            flex: 1
        },
        openQuestionMainContainer: {
            marginTop: scale(15),
            gap: scale(15)
        },
        text: {
            color: theme.color,
            opacity: 0.8,
            letterSpacing: scale(0.5),
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
        },
        boldText: {
            fontFamily: 'NunitoSans-ExtraBold',
        }
    })
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={theme.theme === 'dark' ? require('../../assets/Images/FAQQuestionDark.png') : require('../../assets/Images/FAQQuestionLight.png')} />
                </View>
                <Pressable style={styles.questionContainer} onPress={() => toggleQuestion()}>
                    <Text style={styles.title}>{title}</Text>
                    <Image style={styles.expandCloseImage} source={!isPressed ? theme.theme === 'dark' ? require('../../assets/Images/FAQCloseDark.png') : require('../../assets/Images/FAQCloseLight.png') : theme.theme === 'dark' ? require('../../assets/Images/FAQExpandDark.png') : require('../../assets/Images/FAQExpandLight.png')} />
                </Pressable>
            </View>
            {
                isPressed && title === 'How do I enter a raffle?' || isPressed && title === 'What is Raffolux?' ?
                    <View style={styles.openQuestionMainContainer}>
                        <Text style={[styles.text, { flex: 1 }]}>1. Click into one of our raffles</Text>
                        <Text style={[styles.text, { flex: 1 }]}>2. Select how many tickets into the draw you would like to purchase. You can also choose to select which ticket number you want to buy by using the ticket selector!</Text>
                        <Text style={[styles.text, { flex: 1 }]}>3. Add those tickets to your cart. If you haven’t made an account with us or you’re not logged in, you will be asked to do so at this stage.</Text>
                        <Text style={[styles.text, { flex: 1 }]}>4. Go to your cart and checkout.</Text>
                        <Text style={[styles.text, { flex: 1 }]}>5. The winner is drawn securely and independently by random.org, and then posted to our winner's page <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text> around 15 minutes after the raffle closes! You can also find the public results of every draw on random.org's site <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://www.random.org/draws/records/?owner=34188')}>here</Text>.</Text>
                    </View>
                    : null
            }
            {
                isPressed && title === 'Who can play with Raffolux?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>To play Raffolux, you must be over 18 years old.</Text>
                </View>
            }
            {
                isPressed && title === 'How is the winner selected?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We draw all our raffles instantly and independently, using random.org's true randomisation software. Once Raffolux has compiled a list of tickets for the draw, we send the list over to random.org who draw the winning ticket number. Random.org then posts the winning ticket number on its <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://www.random.org/draws/records/?owner=34188')}>public register</Text></Text>
                    <Text style={[styles.text, { flex: 1 }]}>You can also find records of all our winners and draws <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text> !</Text>
                </View>
            }
            {
                isPressed && title === 'When is the draw?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Our draws all take place instantly on the date and time specified in the raffle description, using random.org's true randomisation software. If a raffle sells out early, it will draw immediately at that time so we can announce the winner faster!</Text>
                    <Text style={[styles.text, { flex: 1 }]}>Our raffles are (almost always) drawn at 10pm in the evening every day.</Text>
                </View>
            }
            {
                isPressed && title === "What if Raffolux doesn't sell enough tickets?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We will <Text style={styles.boldText}>always</Text> go ahead and draw a winner, regardless of the number of tickets that are sold.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>We will also <Text style={styles.boldText}>never</Text> extend the draw date, even if we've hugely undersold the raffle. So, if you've got the only ticket in the draw when the raffles closes, we'll be sending you a winner's email the next day!</Text>
                </View>
            }
            {
                isPressed && title === 'How many tickets can I buy for a raffle?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>If a ticket limit per person applies, we will state it in the description on the raffle page.</Text>
                </View>
            }
            {
                isPressed && title === 'How long do the raffles last?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Our raffles last for a fixed number of days, and are drawn instantly on the time and date specified on the raffle description. If the tickets sell out early, then the raffle will be drawn at the point of sell-out.</Text>
                </View>
            }
            {
                isPressed && title === 'Can I get my tickets refunded?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Unfortunately we aren’t able to remove or refund tickets purchased for a raffle, apart from in exceptional circumstances listed in our <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('TermsAndConditions')}>terms</Text></Text>
                </View>
            }
            {
                isPressed && title === 'How much does it cost to enter a raffle?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>The ticket prices are shown on each raffle!</Text>
                </View>
            }
            {
                isPressed && title === 'How do I know if I have won?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>15 minutes after the draw closes, we will email you to congratulate you on your win! We may also give you a quick call to celebrate, particularly if it's amazing news. You can also check our winner list <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text> at any time, which we update after each draw.</Text>
                </View>
            }
            {
                isPressed && title === "Where can I view my tickets?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>When you are logged in, you can view your tickets and raffles entered in the <Text style={{ textDecorationLine: 'underline' }} onPress={() => userToken ? navigation.navigate('MyRaffles') : navigation.navigate('Authentication')}>My Raffles</Text> section at the top of the website. These are separated by active raffles (those that are yet to be drawn), and recently ended raffles (those that have already been drawn).</Text>
                    <Text style={[styles.text, { flex: 1 }]}>We’ll also email your ticket numbers to you after every purchase.</Text>
                </View>
            }
            {
                isPressed && title === "Why should I play with Raffolux?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>1) Guaranteed Winners! Regardless of the number of tickets sold, the prize will always be drawn and awarded to the lucky winner.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>2) No extensions! We will never extend the draw time, even if we have only sold one ticket.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>3) You’ll be supporting our amazing charity partners! We donate 10% of our net proceeds to charity, with 8% going towards the charity of your choice, and 2% spread equally among our remaining charity partners. Thanks to our players, over £600,000 has been donated to charities across the UK so far.</Text>
                </View>
            }
            {
                isPressed && title === "How does the 'instant draw' work?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Our ‘instant draws’ are run within a minute of the raffle closing, and the draw is performed independently by random.org’s true randomisation software. When the draw is complete, random.org automatically stamps it in their <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://www.random.org/draws/records/?owner=34188')}>public register</Text>, where the winning ticket number and raffle entrants can be viewed.</Text>
                </View>
            }
            {
                isPressed && title === "If my ticket is drawn, how will I find out?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We follow up with all our winners over email (and sometimes by phone, if it's a special prize or we can't reach you by email) after every draw! You can also check the winner list <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text>, which includes the draw details for each raffle.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>There's no need to remember your ticket numbers - we do that for you!</Text>
                </View>
            }
            {
                isPressed && title === 'Is there a list of all previous draws and winners?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>You can find every single Raffolux winner to date in random.org's <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://www.random.org/draws/records/?owner=34188')}>public register</Text>, and you can also see the most recent month's winners on our own winner's page <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text></Text>
                </View>
            }
            {
                isPressed && title === "How do prizes get delivered?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We send our prizes directly to our winners’ doorsteps by courier! Should the prize be too large or valuable to send by mail, we will arrange for it to be delivered personally.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>For all cash prizes, we send these directly to your bank account.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>For prizes worth over £10,000, we often invite our winners to our offices (with all travel covered) to collect their prize!</Text>
                </View>
            }
            {
                isPressed && title === 'Can I receive a cash alternative to my prize?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>You can receive a cash alternative to the prize on almost every occasion. Just ask us when you’re claiming your prize and we’ll see what we can do!</Text>
                </View>
            }
            {
                isPressed && title === 'Do holiday and experience prizes need to be taken on specific dates?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Most of the time, we’ll be able to offer a range of dates for each holiday. The exact details will be stated on the raffle itself. If the range of dates on offer don't work for you, then we can offer a cash alternative or try to find another holiday of the same value.</Text>
                </View>
            }
            {
                isPressed && title === 'Can I suggest a prize?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Absolutely! Please do send in your suggestions, we’d love to hear them – just click the chat icon in the bottom-right of the screen, or get in touch with support@raffolux.com if it’s after 6pm.</Text>
                </View>
            }
            {
                isPressed && title === "What happens if the prize isn’t claimed?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We will always email and call our players to let them know that they’ve won! If we can't get through, we will of course keep trying.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>Our claim period is 180 days from the date of the draw. For any prizes that have not been claimed during that period, we reserve the right to distribute the cash alternative to our charity partners.</Text>
                </View>
            }
            {
                isPressed && title === "What does Raffolux do for charity?" &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Charity is right at the heart of our mission at Raffolux, and we’ve currently raised over £600,000 for charities across the UK.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>Every time you play, you’ll be supporting a charity of your choice which you can <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Charity')}>change at any time</Text>. We donate 10% of all net proceeds (revenue minus marketing, prize and payment handling costs) to charities. 8% is donated to charities our players select, and 2% is spread equally across all of our charity partners.</Text>
                    <Text style={[styles.text, { flex: 1 }]}>We also run raffles for the exclusive benefit of particular good causes, where the majority of ticket sales will be donated directly to the specified charity.</Text>
                </View>
            }
            {
                isPressed && title === 'What charities does Raffolux support?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We work with some fantastic charities such as Alzheimer's Society, Great Ormond Street Hospital Children's Charity, Mental Health UK and many more - you can see our list of sponsored charities <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Charity')}>here</Text>!</Text>
                </View>
            }
            {
                isPressed && title === 'Can I change my sponsored charity?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Yes, you can do so at any time by changing your selection <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Charity')}>here</Text>!</Text>
                </View>
            }
            {
                isPressed && title === 'Can my business or charity become a Raffolux partner?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We are always open to talking about partnerships with new organisations and would love to hear from you! Please send us an email to support@raffolux.com, and one of our partnerships team will follow up with you directly.</Text>
                </View>
            }
            {
                isPressed && title === 'Are card payments secure?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>We use secure, encrypted connections across our website and do not hold your card details on our servers. Our payment providers are fully PCI and ISO compliant, and we leave all of the financial processing to them. Raffolux will never share any of your financial data.</Text>
                </View>
            }
            {
                isPressed && title === 'How can I pay?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>You can pay by debit card, PayPal, Apple Pay or Google Pay with our platform.</Text>
                </View>
            }
            {
                isPressed && title === 'Can I save card details for future use?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>Yes, you can save your card details!</Text>
                </View>
            }
            {
                isPressed && title === 'What if I’ve lost my email or password?' &&
                <View style={styles.openQuestionMainContainer}>
                    <Text style={[styles.text, { flex: 1 }]}>No need to worry! If you have lost or forgotten your password, just go to the ‘sign in’ page and then click ‘reset password’. If you’ve forgotten the email associated with your account, then please do get in contact with us by sending an email to support@raffolux.com and we will locate and verify your account.</Text>
                </View>
            }
        </View>
    )
}

export default FAQQuestion

