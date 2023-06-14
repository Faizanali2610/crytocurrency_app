
import { Badge, Box, Button, HStack, Progress, Radio, RadioGroup, Stat,StatArrow, 
StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Chart from './Chart';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { server } from "../main"
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = 
  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const params = useParams();

  const btns = ["24h","7d","14d","30d","60d","200d","365d","max"];

  const switchChartStats = (key)=>{
      
  switch (key) {
    case "24h":
    setDays("24h");
    setLoading(true);
    break;
    case "7d":
    setDays("7d");
    setLoading(true);
    break;
    case "14d":
    setDays("14d");
    setLoading(true);
    break;
    case "30d":
    setDays("30d");
    setLoading(true);
    break;
    case "60d":
    setDays("60d");
    setLoading(true);
    break;
    case "200d":
    setDays("200d");
    setLoading(true);
    break;
    case "365d":
    setDays("365d");
    setLoading(true);
    break;
    case "max":
    setDays("max");
    setLoading(true);
    break;
  
    default:
      setDays("24h");
      setLoading(true);
    break;
  }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
 const { data:chartdata } =
 await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setChartArray(chartdata.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id,currency,days])

  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;

  return (
    <div className='max-w-screen mx-24 py-6 '>
      {loading ? <Loader /> : <>
      <Box width={"full"} borderWidth={1}>
        <Chart className="w-9" arr={chartArray} currency={currencySymbol} days={days}/>
      </Box>      
    
    {
      btns.map((i)=>(
        <Button className='mx-6 my-2' key={i} onClick={()=>switchChartStats(i)} >{i}</Button>
      ))
    }




      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
      <HStack spacing={"4"}>
      <Radio value={"inr"}>INR</Radio>
      <Radio value={"usd"}>USD</Radio>
      <Radio value={"eur"}>EUR</Radio>
      </HStack>
      </RadioGroup>

      <div className='w-screen p-16 items-start'>
      <h1 className='text-2xl text-black self-center ml-72 '>
      Last Updated on {Date().split("G")[0]}
      </h1>

      <img src={coin.image.large} className="w-23 h-72 ml-96 my-9" />
      <Stat className='ml-[485px] flex flex-row text-xl'>
      <StatLabel>{coin.name}</StatLabel>
      <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
      <StatHelpText>
        <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
        {coin.market_data.price_change_percentage_24h}%
      </StatHelpText>
      </Stat>
      <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar 
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"6xl"} p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
      
       </div>
       </>}
       </div>
        )
        }

        const Item = ({ title, value }) => (
          <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
            <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
              {title}
            </Text>
            <Text>{value}</Text>
          </HStack>
        );
        
        const CustomBar = ({ high, low }) => (
          <VStack w={"6xl"}>

            <Progress value={50} colorScheme={"teal"} w={"6xl"} />
            <HStack justifyContent={"space-between"} w={"6xl"}>
              <Badge children={low} colorScheme={"red"} />
              <Text fontSize={"sm"}>24H Range</Text>
              <Badge children={high} colorScheme={"green"} />
            </HStack>
          </VStack>
        );
        
         export default CoinDetails;



