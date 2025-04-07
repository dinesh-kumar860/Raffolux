import { Linking } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import InAppBrowser from 'react-native-inappbrowser-reborn'

import DrawerNavigation from './DrawerNavigation'
import { AuthContext } from '../Context/AuthContext'
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage'
import Loader from '../helpers/Loader'

const AppStackNavigation = ({ linking }) => {
	const { userToken, authLogin, isLoading } = useContext(AuthContext);


	const handleDeepLink = async (event) => {
		InAppBrowser.close()
		if (event?.url?.includes('authToken')) {
			let reqUrl = event.url?.split('authToken=%22')
			let Url = reqUrl[1].split('%22')
			authLogin(Url[0])
		}
		if (event?.url?.includes('refCode')) {
			let referralId = event.url.split('refCode=')
			await RaffoluxAsyncStorage.setItem('referralId', referralId[1])
		}
	}


	useEffect(() => {
		Linking.addEventListener('url', handleDeepLink);
		return () => {
			// Linking.removeEventListener('url', handleDeepLink);
		};
	},
		[]);

	return (
		<>
			{
				isLoading ? <Loader /> :
					<NavigationContainer linking={linking}>
						<DrawerNavigation userToken={userToken} />
					</NavigationContainer>
			}
		</>
	)
}

export default AppStackNavigation
