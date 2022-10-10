
const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest"
const ACCESS_KEY = "QD0hjzl3ojM3a9MBv0k6TiMMiem66S5d"
const myHeaders = new Headers();
myHeaders.append("apikey", ACCESS_KEY);
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export const fetchAllCurrency =  () => {
   const res = fetch(BASE_URL, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
    return res;
};


export const fetchFromToCurrency =  (fromCurrency,toCurrency) => {
    const res = fetch(`BASE_URL?base=${fromCurrency}&symbols=${toCurrency}`, requestOptions)
     .then(response => response.json())
     .catch(error => console.log('error', error));
     return res;
 };

export const fetchHeaderUAH =  () => {
    const res = fetch(`${BASE_URL}?symbols=USD%2CEUR%2CPLN&base=UAH`, requestOptions)
     .then(response => response.json())
     .catch(error => console.log('error', error));
     return res;
 };