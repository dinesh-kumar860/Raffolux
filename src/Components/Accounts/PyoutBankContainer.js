import React from 'react'
import PayoutBankMethod from './PayoutBankMethod'

const PyoutBankContainer = (props) => {
    const { viewBackgroundColor, fetchBankDetails, bank_name, account_number, sort_code, id } = props

    return (
        <PayoutBankMethod viewBackgroundColor={viewBackgroundColor} fetchBankDetails={fetchBankDetails} bank_name={bank_name} account_number={account_number} sort_code={sort_code} id={id} />
    )
}

export default PyoutBankContainer;
