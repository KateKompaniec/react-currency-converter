import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyConvert from './CurrencyConvert';
import HeaderCurrencyRatesUAH from './HeaderCurrencyRatesUAH';

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest"
const ACCESS_KEY = "ES1bAiUliGSAJQwo6cOfWGX2z9Sat1mN"
var myHeaders = new Headers();
myHeaders.append("apikey", ACCESS_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};



function App() {
  const [currencyOptions, setOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [currentDate, setCurrentDate] = useState("")
  const [ratesToUAH, setRates] = useState([])
  

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(5)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(5)
  }

  useEffect(() => {
    fetch(`${BASE_URL}?symbols=USD%2CEUR%2CPLN&base=UAH`, requestOptions)
      .then(response => response.json())
      .then(data => setRates(data.rates))
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
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
  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  function getValidDate(date) {
    return date.split("-").reverse().join(".");
  }
  return (
    <>
      <header>
        <div className='currency-rates-UAH-text'>
          <h2>Currency rates for {`${getValidDate(currentDate)}`}</h2>

        </div>
        <div className='currency-rates-UAH'>
          {
            Object.entries(ratesToUAH).map(([key, value]) => (
              <HeaderCurrencyRatesUAH key={`${key, value}`} symbol={key} value={value} ></HeaderCurrencyRatesUAH>
            ))
          }
        </div>
      </header>
      <main>
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
      </main>
    </>
  );
}

export default App;
