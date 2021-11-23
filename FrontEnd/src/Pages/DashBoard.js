import Timeline from "../components/TimeLine/Timeline";
import Card from "../components/Card";
import Chart from "../components/Chart";
import PassBook from "../components/PassBook";
import React, { useEffect, useState } from "react";
import axios from "axios";
function DashBoard() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      axios
        .get("http://localhost:3001/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data[0].transactions || []);
        });
    }
    console.log(data);
  }, [token]);
  return (
    <>
      {data.length > 0 && (
        <>
          <div className="block lg:grid grid-flow-col grid-cols-3">
            <div className="flex flex-col items-center">
              <p class="text-3xl font-bold text-gray-500 md:text-4xl leading-normal md:leading-relaxed mb-2">
                Transactions
              </p>
              <Card />
            </div>
            <div className="flex flex-col items-center">
              <p class="text-3xl font-bold text-gray-500 md:text-4xl leading-normal md:leading-relaxed mb-2">
                PassBook View
              </p>
              <PassBook />
            </div>
            <div className="flex flex-col items-center">
              <p class="text-3xl font-bold text-gray-500 md:text-4xl leading-normal md:leading-relaxed mb-2">
                Analytics
              </p>
              <Chart />
            </div>
          </div>
        </>
      )}
      {data.length === 0 && <Timeline />}
    </>
  );
}

export default DashBoard;
