import ListCoin from "./ListCoin";

const ResultData = (props) => {
  const { searchResults, loading, error } = props;
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
    return <ListCoin searchResults={searchResults}></ListCoin>;
  }
};

export default ResultData;
