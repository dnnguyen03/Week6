import React from "react";
export default function ListCoin(props) {
  return (
    <div className="ListCoin">
      {props?.data &&
        props?.data.map((coin) => {
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
              <div
                className="percent24h"
                style={{
                  color:
                    price_change_percentage_24h > 0 ? "#16c784" : "#ea3943",
                }}
              >
                {Math.round(price_change_percentage_24h * 100) / 100}%
              </div>
              <div className="marketCap">${market_cap.toLocaleString()}</div>
            </div>
          );
        })}
    </div>
  );
}
