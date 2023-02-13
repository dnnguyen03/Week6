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

const ResultData = ({ searchResults, loading, error }) => {
  if (loading) {
    return (
      <div className="loading loader">
        <div className="loader-outter"></div>
        <div className="loader-inner"></div>
      </div>
    );
  } else if (error || searchResults.length < 1) {
    return (
      <div className="noData">
        <div className="circle">
          <div className="icon">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    );
  } else {
    return <ListCoin data={searchResults}></ListCoin>;
  }
};

const ListFilter = ({ listFilter, listOption, setFiter }) => {
  return (
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
  );
};

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
    async (url) => {
      axios
        .get(baseURL, {
          params: {
            q: url,
          },
        })
        .then((res) => {
          setLoangding(true);
          setSearchResults(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoangding(false);
        });
      setTimeout(() => {
        setLoangding(false);
      }, 1000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseURL]
  );

  useEffect(() => {
    if (valueFilter === "Giá tăng trong 24%") {
      console.log(2);
      setSearchResults(
        searchResults.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        )
      );
    } else if (valueFilter === "Giá giảm trong 24%") {
      setSearchResults(
        searchResults.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        )
      );
    } else if (valueFilter === "Sắp xếp theo tên từ a đến z") {
      setSearchResults(
        searchResults.sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  }, [valueFilter]);

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

  //Filter

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="filter">
        <div className="valueFilter" ref={filter}>
          {valueFilter}
          <div className="icon">
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>

        <ListFilter
          listFilter={listFilter}
          listOption={listOption}
          setFiter={(e) => setValueFilter(e.target.innerHTML)}
        />
      </div>
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
