import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atmos";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  padding: 0px 20px;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.5s ease-in;
    /* 카드끝까지 클릭가능함. */
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  //same As react setState.
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  console.log(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  //reactquery keeps data -> 캐싱으로 저장을 한다. 로딩화면 안나옴. 한결빠름.
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  //isloading = fetcher함수가 로딩중인지 알려주고
  //Fetcher함수 끝나면 그 데이터를 data에다가 집어넣어서 데이터에 접근함.

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // const getCoins = async () => {
  //   const res = await axios("https://api.coinpaprika.com/v1/coins");
  //   setCoins(res.data.slice(0, 100));
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   // getCoins();
  // }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <CoinsList>
          {/* state값을 props로 넘김. */}
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{ pathname: `/${coin.id}` }} state={coin}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
