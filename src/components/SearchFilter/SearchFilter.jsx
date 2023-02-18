import axios from "axios";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import ResultData from "./ResultData";
import "./SearchFilter.css";

export default function SearchFilter() {
  const navigate = useNavigate();
  const local = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const queryParams = qs.parse(local.search).q;
  const baseURL = `https://coin-api-eta.vercel.app/all`;
  const [valueFilter, setValueFilter] = useState("mặc định");
  const fetchData = async (url) => {
    axios
      .get(baseURL, {
        params: {
          q: url,
        },
      })
      .then((res) => {
        setLoading(true);
        setSearchResults(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (local.search) {
      fetchData(queryParams);
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchTerm) {
      navigate(`?q=${searchTerm}`);
      fetchData(searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.children[0].value);
  };
  return (
    <div className="SearchFilter">
      <h1>cryptocurrency market</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="crypto"
          defaultValue={queryParams}
          maxLength={15}
          onKeyUp={(e) => {
            if (e.target.value === "") {
              fetchData();
              navigate("/");
              setSearchTerm("");
            }
          }}
        />
      </form>
      <Filter
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        valueFilter={valueFilter}
        setValueFilter={setValueFilter}
      ></Filter>
      <div className="container">
        <div className="information">
          <div className="rank">#</div>
          <div className="inforCoin">Name</div>
          <div className="price">price</div>
          <div className="percent24h">24h %</div>
          <div className="marketCap">market cap</div>
        </div>
        <ResultData
          searchResults={searchResults}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
