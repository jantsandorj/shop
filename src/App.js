import "./App.css";
import { FcSearch } from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/productList")
      .then((res) => res.json())
      .then((dta) => setData(dta.result));
  }, []);
  const catArr = data
    .map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);
  console.log(search);

  const ShowData = () => {
    {
      catArr.filter((el) => {
        el === search && (
          <div>
            <p className="fw-bold">{el}</p>
            {data.map((e, i) => {
              return (
                e.category == search && (
                  <div className="d-flex gap-2">
                    <p>{data[i].product}</p>
                    <p>{data[i].inStock}</p>
                    <p>{data[i].price}</p>
                  </div>
                )
              );
            })}
          </div>
        );
      });
    }
  };

  return (
    <div className="container-md border">
      <div className="container">
        <div className="search">
          <input
            className="searchInput"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here ..."
          />
          <FcSearch class="icon" />
        </div>
      </div>
      <div class="container">
        <label for="sw" className="switch">
          <input className="inputSlider" type="checkbox" id="sw" />
          <div class="slider"></div>
        </label>
      </div>
      {search ? (
        <ShowData />
      ) : (
        catArr.map((el) => {
          return (
            <div>
              <p className="fw-bold">{el}</p>
              {data.map((e, i) => {
                if (e.category === el)
                  return (
                    <div className="d-flex gap-2">
                      <p>{data[i].product}</p>
                      <p>{data[i].inStock}</p>
                      <p>{data[i].price}</p>
                    </div>
                  );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
