import React from 'react'
import PrizeDeliveryAddress from './PrizeDeliveryAddress'

const PrizeDeliveryAddressContaier = (props) => {
  const { viewBackgroundColor, _displayAddressWithLogin, id, full_name, phone_no, post_code, address_line_1, address_line_2, city, payoutEditLight, payoutTrashLight, addressPlus, payoutEditDark, payoutTrashDark, addressPlusDark } = props;

  return (
    <PrizeDeliveryAddress viewBackgroundColor={viewBackgroundColor} _displayAddressWithLogin={_displayAddressWithLogin} id={id} full_name={full_name} phone_no={phone_no} post_code={post_code} address_line_1={address_line_1} address_line_2={address_line_2} city={city} payoutEditLight={payoutEditLight} payoutTrashLight={payoutTrashLight} addressPlus={addressPlus} payoutEditDark={payoutEditDark} payoutTrashDark={payoutTrashDark} addressPlusDark={addressPlusDark} />
  )
}

export default PrizeDeliveryAddressContaier