import React from "react";
import CurrencyConvert from "./CurrencyConvert";
import { useState, useEffect } from "react";
import useApiFetch from "../../hooks/useApiFetch";

const BASE_URL = "https://api.apilayer.com/fixer/latest"
const ACCESS_KEY = "ES1bAiUliGSAJQwo6cOfWGX2z9Sat1mN"
const myHeaders = new Headers();
myHeaders.append("apikey", ACCESS_KEY);

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function Converter() {

    //const {data, loading, error} = useApiFetch(BASE_URL)
    //const {dataToConvert, loading, error} = useApiFetch(BASE_URL,[fromCurrency, toCurrency])
    const [currencyOptions, setOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [exchangeRate, setExchangeRate] = useState(0)

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = (amount * exchangeRate).toFixed(5)
    } else {
        toAmount = amount
        fromAmount = (amount / exchangeRate).toFixed(5)
    }

    useEffect(() => {
        fetch(BASE_URL, requestOptions)
          .then(response => response.json())
          .then(data => {
            const firstCurrency = Object.keys(data.rates)[0]
            setOptions([...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])
          })
          .catch(error => console.log('error', error));
      }, [])  
    
      useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
          fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`, requestOptions)
            .then(response => response.json())
            .then(data => setExchangeRate(data.rates[toCurrency]))
        }
      }, [fromCurrency, toCurrency])

     function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    } 
   
    return (
        <section className='main-conteiner'>
            <h2>
                CURRENCY CONVERTER
            </h2>
            <div className='currencies'>
                <CurrencyConvert
                    currencyOptions={currencyOptions}
                    selectCurrency={fromCurrency}
                    onChangeCurrency={e => setFromCurrency(e.target.value)}
                    amount={fromAmount}
                    onChangeAmount={handleFromAmountChange}
                />

                <CurrencyConvert
                    currencyOptions={currencyOptions}
                    selectCurrency={toCurrency}
                    onChangeCurrency={e => setToCurrency(e.target.value)}
                    amount={toAmount}
                    onChangeAmount={handleToAmountChange}
                />
            </div>

        </section>
    )
}
