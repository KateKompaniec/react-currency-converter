import React, { useEffect, useState } from 'react';
import './App.css';
import Converter from './components/Converter/Converter';
import Header from './components/Header/Header';
//import CurrencyConvert from './components/Converter/CurrencyConvert';
import HeaderCurrencyRatesUAH from './components/Header/HeaderCurrencyRatesUAH';

const BASE_URL = "https://api.apilayer.com/fixer/latest"
const ACCESS_KEY = "ES1bAiUliGSAJQwo6cOfWGX2z9Sat1mN"
const myHeaders = new Headers();
myHeaders.append("apikey", ACCESS_KEY);

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};



function App() {
 /*  const [currencyOptions, setOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState(0) */
 

  /* const [currentDate, setCurrentDate] = useState("")
  const [ratesToUAH, setRates] = useState([]) */
  
 
  /* let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(5)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(5)
  }  */

  /* useEffect(() => {
    fetch(`${BASE_URL}?symbols=USD%2CEUR%2CPLN&base=UAH`, requestOptions)
      .then(response => response.json())
      .then(data => {setRates(data.rates)
        setCurrentDate(data.date)})
      .catch(error => console.log('error', error));
  }, []) */

   /* useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrentDate(data.date)
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
  }, [fromCurrency, toCurrency]) */


  /* function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }  */

 

  return (
    <>
      <Header/>
      <main>
        <Converter />
      </main>
    </>
  );
}

export default App;
