import React, { useEffect, useState } from "react";
import axios from "axios";
export default function useAxios(param) {
  const [data, setData] = useState([]);
  // const [loading, setLoangding] = useState(false);
  // const [error, setError] = useState("");
  // const fetchData = async () => {
  //   try {
  //     setLoangding(true);
  //     const result = await axios.get(param);
  //     setResponse(result.data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoangding(false);
  //   }
  // // };
  // const data2 = React.useMemo(() => {
  //   return data.length;
  // }, []);
  // console.log("data2", data2);
  useEffect(() => {
    // fetchData(param);
    const fetchData = async () => {
      try {
        const reponse = await axios.get(param);
        setData(reponse?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [param]);
  // const beforeData = React.useMemo(() => {
  //   let list = [];
  //   list = data;
  //   return list;
  // }, [data]);
  // console.log("beforeData", beforeData);
  return {
    data,
    // loading,
    // error,
  };
}
