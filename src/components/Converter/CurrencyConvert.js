
import React from 'react'

export default function CurrencyConvert(props) {
    const {
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props
    return (
        <div className="block">
            <input type="number" className='input' value={amount} onChange={onChangeAmount}/>
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option=>(
                    <option key={option} value={option}> {option}</option>
                )
                )}
        
            </select>
        </div>
    )
}
