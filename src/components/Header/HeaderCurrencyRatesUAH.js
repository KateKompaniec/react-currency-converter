import React from 'react'

export default function HeaderCurrencyRatesUAH(props) {
  const {
    symbol,
    value
  } = props
  return (
    <div className='rates-symbol'>
      <div>{symbol}</div>
      <div>{(1 / value).toFixed(2)}</div>
      <div>UAH</div>
    </div>
  )
}
