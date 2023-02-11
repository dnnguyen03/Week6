import axios from "axios";
import qs from "query-string";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dataFilter } from "../../utils/data";

import ListCoin from "./ListCoin";
import "./SearchFilter.css";
export default function SearchFilter() {
  const navigate = useNavigate();
  const local = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoangding] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const queryParams = qs.parse(local.search).q;
  const [valueFilter, setValueFilter] = useState("mặc định");
  const baseURL = `https://coin-api-eta.vercel.app/all`;
  const listOption = useRef();
  const listFilter = useRef();
  const filter = useRef();

  const fetchData = useCallback(
    async (url, filter) => {
      axios
        .get(baseURL, {
          params: {
            q: url,
          },
        })
        .then((res) => {
          setLoangding(true);
          console.log(filter);
          if (filter === "Giá tăng trong 24%") {
            setSearchResults(
              res.data.sort(
                (a, b) =>
                  b.price_change_percentage_24h - a.price_change_percentage_24h
              )
            );
          } else if (filter === "Giá giảm trong 24%") {
            setSearchResults(
              res.data.sort(
                (a, b) =>
                  a.price_change_percentage_24h - b.price_change_percentage_24h
              )
            );
          } else if (filter === "Sắp xếp theo tên từ a đến z") {
            setSearchResults(
              res.data.sort((a, b) => a.name.localeCompare(b.name))
            );
          } else {
            setSearchResults(res.data);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoangding(false);
        });
      setTimeout(() => {
        setLoangding(false);
      }, 1500);
    },
    [baseURL, valueFilter]
  );

  useEffect(() => {
    if (local.search) {
      fetchData(queryParams);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      navigate(`?q=${searchTerm}`);
      fetchData(searchTerm);
    }
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.children[0].value);
  };

  //Filter

  const setFiter = (e) => {
    setValueFilter(e.target.innerHTML);
    fetchData(null, e.target.innerHTML);
  };

  const toggleFilter = () => {
    if (filter.current.classList.contains("active")) {
      listFilter.current.style.height = 0;
      filter.current.classList.remove("active");
      return;
    } else {
      listFilter.current.style.height =
        listOption.current.clientHeight + 1 + "px";
      filter.current.classList.add("active");
    }
  };
  useLayoutEffect(() => {
    filter.current.addEventListener("click", toggleFilter);
    listOption.current.addEventListener("click", () => {
      filter.current.classList.remove("active");
      listFilter.current.style.height = 0;
    });
    return () => {
      filter.current.removeEventListener("click", toggleFilter);
    };
  });

  return (
    <div className="SearchFilter">
      <h1>cryptocurrency market</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="crypto"
          defaultValue={queryParams}
          onKeyUp={(e) => {
            if (e.target.value === "") {
              fetchData();
              navigate("/");
              setSearchTerm("");
            }
          }}
        />
      </form>
      <div className="filter">
        <div className="valueFilter" ref={filter}>
          {valueFilter}
          <div className="icon">
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div className="listFilter" ref={listFilter}>
          <div className="listOption" ref={listOption}>
            {dataFilter.map((option) => (
              <li
                className="option"
                value={option.value}
                key={option.value}
                onClick={setFiter}
              >
                {option.filter}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="information">
          <div className="rank">#</div>
          <div className="inforCoin">Name</div>
          <div className="price">price</div>
          <div className="percent24h">24h %</div>
          <div className="marketCap">market cap</div>
        </div>
        {loading ? (
          <div className="loading loader">
            <div class="loader-outter"></div>
            <div class="loader-inner"></div>
          </div>
        ) : (
          <ListCoin data={searchResults}></ListCoin>
        )}
      </div>
    </div>
  );
}
