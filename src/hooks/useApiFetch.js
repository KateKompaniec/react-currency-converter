import React from 'react'
import { useState, useEffect } from 'react'

const ACCESS_KEY = "ES1bAiUliGSAJQwo6cOfWGX2z9Sat1mN"
const myHeaders = new Headers();
myHeaders.append("apikey", ACCESS_KEY);
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export default function useApiFetch(url, deps=[]) {
  const [data,setData] = useState(null)
  const [error, setError] =useState(null)

  const fetchAPI = ()=> {
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
       
        setData(data)
      })
      .catch(error=> setError(error)) 
  }

  useEffect(()=>{
    fetchAPI();
  },deps)



  return {data,error}
}
