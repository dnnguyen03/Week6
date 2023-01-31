import React from "react";
import useAxios from "../../hook/useAxios";
// import { uuid } from "uuid";
export default function ListCoin() {
  const { data } = useAxios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=10&sparkline=false`
  );
  console.log(data);
  return (
    <div className="ListCoin">
      {data &&
        data.map((coin) => {
          const {
            name,
            market_cap_rank: rank,
            image,
            current_price: price,
            symbol,
            price_change_percentage_24h,
            market_cap,
          } = coin;
          return (
            <div className="coin" key={rank}>
              <div className="rank">{rank}</div>
              <div className="inforCoin">
                <div className="imgCoin">
                  <img src={image} alt="" />
                </div>
                <div className="name">{name}</div>{" "}
                <div className="symbol">{symbol}</div>
              </div>

              <div className="price">${price}</div>
              <div className="percent24h">
                {Math.round(price_change_percentage_24h * 100) / 100}%
              </div>
              <div className="marketCap">${market_cap}</div>
            </div>
          );
        })}
    </div>
  );
}
