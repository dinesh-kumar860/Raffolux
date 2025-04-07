import { createSlice } from '@reduxjs/toolkit';

import { fetchAccountWithLogin } from '../api/accountsApi';
import { fetchPointsStoreBalanceWithLogin } from '../api/pointsStoreApi';
import { fetchMyCreditWithLogin } from '../api/myCreditApi';
import { fetchMyPrizeClaimsCountWithLogin } from '../api/PrizeSummaryApi';
import { fetchMyRafflesWithLogin } from '../api/myRafflesApi';
import { fetchTicketsSelectorWithLogin } from '../api/instantNonInstantApi';

import { apiSliceConstants } from '../helpers/common';
import * as common from '../helpers/common';

import { API_URL } from '@env'

import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';
import { fetchMyPrizeCashClaimsWithLogin } from '../api/homeApi';

const apiSlice = createSlice({
    name: 'getAccountData',
    initialState: {
        data: [],
        ticketsData: [],
        storeBalance: null,
        creditBlance: null,
        claimPrizesCount: null,
        activeRafflesCount: null,
        cartCount: null,
        prizeClaimCashData: []
    },
    reducers: {
        AccountInfo: (state, action) => {
            state.data = action.payload;
        },
        setStoreBalance: (state, action) => {
            state.storeBalance = action.payload;
        },
        setCreditBalance: (state, action) => {
            state.creditBlance = action.payload;
        },
        setClaimPrizesCount: (state, action) => {
            state.claimPrizesCount = action.payload;
        },
        setActiveRafflesCount: (state, action) => {
            state.activeRafflesCount = action.payload;
        },
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        setTicketsData: (state, action) => {
            state.ticketsData = action.payload;
        },
        setPrizeClaimCashData: (state, action) => {
            state.prizeClaimCashData = action.payload;
        },
    },
});

// Export any actions you might want to dispatch here
export const { AccountInfo, setStoreBalance, setCreditBalance, setClaimPrizesCount, setActiveRafflesCount, setCartCount, setTicketsData, setPrizeClaimCashData } = apiSlice.actions
export default apiSlice.reducer;


export const fetchAccount = () => async (dispatch) => {
    try {
        const response = await fetchAccountWithLogin();
        if (response) {
            dispatch(AccountInfo(response.userprofile));
        }
    } catch (error) {
        // Handle error cases
    }
};

export const getStoreBalance = () => async (dispatch) => {
    try {
        const response = await fetchPointsStoreBalanceWithLogin();
        if (response) {
            dispatch(setStoreBalance(response.balance));
        }
    } catch (error) {
        // Handle error cases
    }
};

export const getCreditBalance = () => async (dispatch) => {
    try {
        const response = await fetchMyCreditWithLogin();
        if (response) {
            dispatch(setCreditBalance(response.credit_wallet[0].balance));
        }
    } catch (error) {
        // Handle error cases
    }
};

export const getClaimPrizeCount = () => async (dispatch) => {
    try {
        const response = await fetchMyPrizeClaimsCountWithLogin();
        if (response) {
            if (response.message === apiSliceConstants.NoPrizeToClaim) {
                dispatch(setClaimPrizesCount(0));
            }
            else if (response.winningTicketsCount > 0) {
                dispatch(setClaimPrizesCount(response.winningTicketsCount));
            }
        }

    } catch (error) {
        // Handle error cases
    }
};

export const getActiveRafflesCount = (data) => async (dispatch) => {
    try {
        const response = await fetchMyRafflesWithLogin(data);
        if (response) {
            dispatch(setActiveRafflesCount(response.raffles_active_count));
        }
    } catch (error) {
        // Handle error cases
    }
};

export const _fetchCartCountWithLogin = () => async (dispatch) => {
    const _token = await RaffoluxAsyncStorage.getItem(common.Home.Token);
    try {
        await fetch(`${API_URL}fetchCartCountWithLogin`, {
            method: "POST",
            headers: {
                'Authorization': _token
            },
        })
            .then((response) => response.json())
            .then(async (data) => {
                dispatch(setCartCount(data?.numberOfCartItems));
            })

    } catch (error) {
        console.log({ error })
    }
};



export const fetchTicketsData = (data) => async (dispatch) => {
    try {
        const result = await fetchTicketsSelectorWithLogin(data);
        if (result) {
            dispatch(setTicketsData(responseData));
        }
    }
    catch (error) {
        // Handle error cases
    }
};

export const fetchMyPrizeCashClaims = () => async (dispatch) => {
    try {
        const response = await fetchMyPrizeCashClaimsWithLogin();
        if (response) {
            dispatch(setPrizeClaimCashData(response.data));
        }
    } catch (error) {
        // Handle error cases
    }
};