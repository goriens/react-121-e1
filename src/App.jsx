import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [salarySort, setSalarySort] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData({ page, q, salarySort });
  }, [page, q, salarySort]);

  const fetchData = async ({ page, q, salarySort }) => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://json-server-mocker-masai.herokuapp.com/candidates",
      params: {
        _page: page,
        _limit: 5,
        q: q,
        _sort: "salary",
        _order: salarySort,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };
  console.log(data);

  return (
    <div className="App">
      <div>
        {loading && <div id="loading-container">...Loading</div>}
        {error && <div id="error-container">Something went wrong!</div>}

        <div onClick={() => setShow(!show)}>
          {show ? (
            <Button
              id="SORT_BUTTON"
              title={`Sort by Descending Salary`}
              disabled={salarySort === "DESC"}
              onClick={() => setSalarySort("DESC")}
            />
          ) : (
            <Button
              id="SORT_BUTTON"
              title={`Sort by Ascending  Salary`}
              disabled={salarySort === "ASC"}
              onClick={() => setSalarySort("ASC")}
            />
          )}
        </div>
        <Button
          title="PREV"
          id="PREV"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <Button id="NEXT" title="NEXT" onClick={() => setPage(page + 1)} />
        <PaginationComponent
          currentPage={page}
          lastPage={15}
          onPageChange={setPage}
        />
      </div>
      {data.map((item) => (
        <CandidateCard key={item.id} {...item} />
      ))}
    </div>
  );
}

const PaginationComponent = ({ currentPage, lastPage, onPageChange }) => {
  const arr = new Array(lastPage).fill(0);
  return (
    <div>
      {arr.map((item, page) => (
        <Button
          key={page}
          className="pag-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 === currentPage}
          title={page + 1}
        ></Button>
      ))}
    </div>
  );
};
