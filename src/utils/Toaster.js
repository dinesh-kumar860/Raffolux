// App.jsx
import { scale } from 'react-native-size-matters';
import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

export const toastConfig = {

    success: ({ props }) => (
        <BaseToast
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 15, fontWeight: '400', color: 'black' }}
            text2Style={{ fontSize: 15, fontWeight: '400', color: 'black' }}
            text1={props.text1}
            text2={props.text2}
        />
    ),

    error: ({ props }) => (
        <ErrorToast
            style={{ borderLeftColor: 'red' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 15, fontWeight: '400', color: 'red' }}
            text2Style={{ fontSize: 15, fontWeight: '400', color: 'red' }}
            text1={props.text1}
            text2={props.text2}
            />
    ),

    info: ({ props }) => (
        <InfoToast
            style={{ borderLeftColor: 'blue' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 15, fontWeight: '400', color: 'black' }}
            text2Style={{ fontSize: 15, fontWeight: '400', color: 'black' }}
            text1={props.text1}
            text2={props.text2}
            />
    ),
};