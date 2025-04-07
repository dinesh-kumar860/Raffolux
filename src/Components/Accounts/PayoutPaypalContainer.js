import React, { memo } from 'react'
import PayoutPaypalMethod from './PayoutPaypalMethod'

const PayoutPaypalContainer = (props) => {
    const { viewBackgroundColor, mail_id, id, fetchPaypalDetails } = props;
    return (
        <PayoutPaypalMethod mail_id={mail_id} id={id} viewBackgroundColor={viewBackgroundColor} fetchPaypalDetails={fetchPaypalDetails} />
    )
}

export default memo(PayoutPaypalContainer)
