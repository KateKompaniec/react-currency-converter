import React from 'react'
import { useState, useEffect } from 'react';
import useApiFetch from '../../hooks/useApiFetch';
import HeaderCurrencyRatesUAH from './HeaderCurrencyRatesUAH';

const BASE_URL = "https://api.apilayer.com/fixer/latest"


export default function Header() {
    const {data} = useApiFetch(`${BASE_URL}?symbols=USD%2CEUR%2CPLN&base=UAH`)
    /* const [currentDate, setCurrentDate] = useState("")
  const [ratesToUAH, setRates] = useState([]) */

    console.log(data);
    
    
    /* useEffect(() => {
          setRates(data.rates)
            setCurrentDate(data.date)}
      , [])  */

    function getValidDate(date) {
        return date.split("-").reverse().join(".");
      }

  return (
    <header>
        {!data && <div className='loading'>Loading...</div>}
        <div className='currency-rates-UAH-text'>
            {data &&  <h2>Currency rates for {`${getValidDate(data.date)}`}</h2>}
        </div>
        <div className='currency-rates-UAH'>
          { data &&
            Object.entries(data.rates).map(([key, value]) => (
              <HeaderCurrencyRatesUAH key={`${key, value}`} symbol={key} value={value} ></HeaderCurrencyRatesUAH>
            ))
          }
        </div>
      </header>
  )
}
