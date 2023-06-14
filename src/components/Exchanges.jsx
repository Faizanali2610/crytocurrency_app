import React, { useState } from 'react'
import { server } from '../main'
import { useEffect } from 'react'
import axois from "axios"
import ErrorComponent from './ErrorComponent'
// import { Container } from 'postcss'
import Loader from './Loader'
const Exchanges = () => {
 
    const [exchanges,setExchanges] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
     useEffect(()=>{
      const fetchExchanges = async()=>{
      try {
         const {data} = await axois.get(`${server}/exchanges`);
         setExchanges(data);
         setLoading(false);
      } catch (error) {
         setError(true);
          setLoading(false);
      }
      };
      fetchExchanges()
     },[])
     if(error) return <ErrorComponent message={"Error While Fetching Exchanges"}  />;
  
  return (
  <div className='max-w-screen '>
   {loading ? (
   <Loader />
   ) : (<>
   <div className='flex-wrap flex'>
      {exchanges.map((i)=>(
         <Exchangescard 
         key = {i.id}
         name = {i.name}
         img = {i.image}
         rank = {i.trust_score_rank}
         url = {i.url}
         />
      ))}
   </div>
   </>
   )}
  </div>
  )}


const Exchangescard = ({name,img,rank,url}) => (
   <>
   <div className='py-16 ml-16 '>
    <a href={url} target={"blank"}>
    <div className='w-52 shadow-lg rounded-xl h-44 py-6 px-7 hover:translate-y-4 bg-white'>
      <img src={img} alt = {"exchange"} className='w-11 h-14 mx-14'  />
    
    <heading className="text-md flex px-16 mx-2 py-2">{rank}
    </heading>
    <h1 className='text-center'>{name}</h1>
    </div>
     </a>
</div>
    </>
)



export default Exchanges;


