import React, { useState } from 'react'
import {server} from "../index"
import axios from 'axios'
import { useEffect } from 'react'
import { Container, HStack, VStack, Image, Text, Heading } from '@chakra-ui/react'
import Loading from "../components/Loading"
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const fetchExchanges = async ()=> {
     try {
      const {data} = await axios.get(`${server}/exchanges`);
      setExchange(data);
      setLoading(false);
     } catch (error) {
      setError(error);
      setLoading(false);
     }
    }
    fetchExchanges();
  }, [])

  
  if (error) return <ErrorComponent message={"An error occured"}/>

  return (
    <Container maxWidth={"container.xl"}>
      {
      loading ? (<Loading/>):(<>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {
              exchange.map((i) => (
                  <ExchangeCard 
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                  />
                ))
            }
          </HStack>
      </>)
    }
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges