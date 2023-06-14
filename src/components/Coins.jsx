import React, { useState } from 'react'
import { server } from '../main'
import { useEffect } from 'react'
import axois from "axios"
import CoinCard from './CoinCard'
import ErrorComponent from './ErrorComponent'
// import { Container } from 'postcss'
import Loader from './Loader'
import { HStack, Radio, RadioGroup } from '@chakra-ui/react'

    const Coins = () => {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [currency,setCurrency] = useState("inr")
    const [page,setPage] = useState(1);
    
    const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


      useEffect(()=>{
      const fetchCoins = async()=>{
      try {   
const {data} = await axois.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoins(data);   
      setLoading(false);
      console.log(data)
      } catch (error) {
      setError(true);
      setLoading(true);
      }
      };
      fetchCoins()
     },[currency,page])
     if(error) return <ErrorComponent  message={"Error While Fetching Coins"} />;
     
  
  return (
  <div className='max-w-screen '>
   {loading ? (
   <Loader />
   ) : (<>
   <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
     <HStack spacing={"4"}>
       <Radio value={"inr"}>INR</Radio>
       <Radio value={"usd"}>USD</Radio>
       <Radio value={"eur"}>EUR</Radio>
     </HStack></RadioGroup>

   <div className='flex-wrap flex'>
      {coins.map((i)=>(
      <CoinCard 
      id = {i.id}
      key = {i.id}
      price = {i.current_price}
      name = {i.name}
      img = {i.image}
      rank = {i.trust_score_rank}
      url = {i.url}
      currencySymbol={currencySymbol}
      />
      ))}
   </div>
   </>
   )}
  </div>
  )}


  export default Coins;