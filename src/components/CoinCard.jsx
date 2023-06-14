
import React from "react";
import { Link } from "react-router-dom";


const CoinCard = ({id,name,img,symbol,price,currencySymbol}) => (
  <>

  
    <div className='py-16 ml-16 '>
     <Link to={`/coin/${id}`} target={"blank"}>
     <div className='w-52 shadow-lg rounded-xl h-44 py-6 px-7 hover:-translate-y-3.5'>
       <img src={img} alt = {"exchange"} className='w-11 h-14 mx-14'  />
     
     <heading className="text-md flex px-16 mx-2 py-2">{symbol}</heading>
     <h1 className='text-center'>{name}</h1>
     <h2 className='text-center'>{currencySymbol}{price}</h2>
     
     </div>
      </Link>
 </div>
     </>
 )
 
 
 
 export default CoinCard;
 
 