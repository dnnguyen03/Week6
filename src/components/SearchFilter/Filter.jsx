import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { dataFilter } from "../../utils/data";

export default function Filter(props) {
  const listOption = useRef();
  const listFilter = useRef();
  const filter = useRef();
  const { setSearchResults, valueFilter, setValueFilter } = props;
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
  useEffect(() => {
    setSearchResults((data) => {
      const dataSort = [...data];
      dataSort.sort((a, b) => {
        if (valueFilter === "Giá tăng trong 24%") {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        } else if (valueFilter === "Giá giảm trong 24%") {
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        } else if (valueFilter === "Sắp xếp theo tên từ a đến z") {
          return a.name.localeCompare(b.name);
        } else {
          return b.market_cap - a.market_cap;
        }
      });
      return dataSort;
    });
  }, [valueFilter]);
  return (
    <div className="filter">
      <div className="valueFilter" ref={filter}>
        {valueFilter}
        <div className="icon">
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <div className="listFilter" ref={listFilter}>
        <ul className="listOption" ref={listOption}>
          {dataFilter.map((option) => (
            <li
              className="option"
              value={option.value}
              key={option.id}
              onClick={() => setValueFilter(option.value)}
            >
              <p>{option.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
