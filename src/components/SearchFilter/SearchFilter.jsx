import React from "react";
import ListCoin from "./ListCoin";
import "./SearchFilter.css";
export default function SearchFilter() {
  return (
    <div className="SearchFilter">
      <h1>cryptocurrency market</h1>
      <input type="text" placeholder="Search" className="crypto" />
      <div className="container">
        <div className="information">
          <div className="rank">#</div>
          <div className="inforCoin">Name</div>
          <div className="price">price</div>
          <div className="percent24h">24h %</div>
          <div className="marketCap">market cap</div>
        </div>
        <ListCoin></ListCoin>
      </div>
    </div>
  );
}
