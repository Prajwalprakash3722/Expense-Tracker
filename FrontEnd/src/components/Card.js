import React, { useEffect, useState } from "react";
import axios from "axios";
function Card() {
  const [token, setToken] = useState("");
  const [props, setProps] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      axios
        .get("http://localhost:3001/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProps(res.data);
        });
    }
  }, [token]);
  return (
    <>
      {props.length > 0 &&
        props.map((item) =>
          item.type === "DEBIT" ? (
            <>
              <div className="card lg:w-96 m-5">
                <div className="text-center flex flex-col p-2 md:text-left md:flex-row md:items-center md:justify-between md:p-5 bg-red-100 rounded-md">
                  <div className="text-2xl font-semibold">
                    <p className="text-red-500">{item.description}</p>
                    <p className="text-gray-700">{item.amount}</p>
                    <p className="text-lg font-semibold text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-2">
                    <div className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-white bg-red-500">
                      View Details
                    </div>
                    <div className="m-2 p-2 text-center rounded-md text-lg font-semibold text-white bg-gray-600">
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card lg:w-96 m-5">
                <div className="text-center flex flex-col p-2 md:text-left md:flex-row md:items-center md:justify-between md:p-5 bg-green-100 rounded-md">
                  <div className="text-2xl font-semibold">
                    <p className="text-green-500">{item.description}</p>
                    <p className="text-gray-700">{item.amount}</p>
                    <p className="text-lg font-semibold text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-2">
                    <div className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-white bg-green-500">
                      View Details
                    </div>
                    <div className="m-2 p-2 text-center rounded-md text-lg font-semibold text-white bg-gray-600">
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
    </>
  );
}

export default Card;
