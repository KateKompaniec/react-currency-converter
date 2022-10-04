import React from 'react'
import { useState, useEffect } from 'react';
import useApiFixer from '../../hooks/useApiFixer';
import HeaderCurrencyRatesUAH from './HeaderCurrencyRatesUAH';

const BASE_URL = "https://api.apilayer.com/fixer/latest"
const ACCESS_KEY = "ES1bAiUliGSAJQwo6cOfWGX2z9Sat1mN"
const myHeaders = new Headers();
myHeaders.append("apikey", ACCESS_KEY);

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function Header() {
    const {data, loading, error} = useApiFixer(`${BASE_URL}?symbols=USD%2CEUR%2CPLN&base=UAH`)
    const [currentDate, setCurrentDate] = useState("")
  const [ratesToUAH, setRates] = useState([])

    console.log(data,loading,error);
    
    useEffect(() => {
        fetch(`${BASE_URL}?symbols=USD%2CEUR%2CPLN&base=UAH`, requestOptions)
          .then(response => response.json())
          .then(data => {setRates(data.rates)
            setCurrentDate(data.date)})
          .catch(error => console.log('error', error));
      }, []) 

    function getValidDate(date) {
        return date.split("-").reverse().join(".");
      }

  return (
    <header>
        <div className='currency-rates-UAH-text'>
          <h2>Currency rates for {`${getValidDate(currentDate)}`}</h2>

        </div>
        <div className='currency-rates-UAH'>
        {loading && <div className='loading'>Loading...</div>}
          {
            Object.entries(ratesToUAH).map(([key, value]) => (
              <HeaderCurrencyRatesUAH key={`${key, value}`} symbol={key} value={value} ></HeaderCurrencyRatesUAH>
            ))
          }
        </div>
      </header>
  )
}
