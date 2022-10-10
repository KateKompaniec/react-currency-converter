import React from 'react'
import {  useEffect } from 'react';
import { fetchHeaderUAH } from '../../api';
import { useApi } from '../../hooks/useApi';
import HeaderCurrencyRatesUAH from './HeaderCurrencyRatesUAH';

const BASE_URL = "https://api.apilayer.com/fixer/latest"
//const BASE_URL ="https://api.currencyapi.com/v3/latest"



export default function Header() {
    const [currencyDataUAH, setcurrencyDataUAH] = useApi(()=>fetchHeaderUAH())

    //console.log(currencyDate);
    
    
     useEffect(() => {
        setcurrencyDataUAH();
          }
      , [])  

    function getValidDate(date) {
        return date.split("-").reverse().join(".");
      }

  return (
    <header>
        {!currencyDataUAH && <div className='loading'>Loading...</div>}
        <div className='currency-rates-UAH-text'>
            {currencyDataUAH &&  <h2>Currency rates for {`${getValidDate(currencyDataUAH.date)}`}</h2>}
        </div>
        <div className='currency-rates-UAH'>
          { currencyDataUAH &&
            Object.entries(currencyDataUAH.rates).map(([key, value]) => (
              <HeaderCurrencyRatesUAH key={`${key, value}`} symbol={key} value={value} ></HeaderCurrencyRatesUAH>
            ))
          }
        </div>
      </header>
  )
}
