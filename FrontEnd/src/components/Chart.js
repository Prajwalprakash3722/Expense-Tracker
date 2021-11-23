import React, { useEffect, useState } from "react";
import axios from "axios";
import Pie from "./AnalyticCharts/Pie";
import Ver from "./AnalyticCharts/Vertical";
import Line from "./AnalyticCharts/Line";
const Charts = ({ props }) => {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

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
          setData(res.data);
        });
    }
  }, [token]);

  const Expense = data.filter((item) => item.type === "DEBIT");
  const Income = data.filter((item) => item.type === "CREDIT");
  const CatLabel1 = Expense.map((item) => item.category);
  const CatLabel2 = Income.map((item) => item.category);
  const DateLabel = data.map((item) => item.date);
  const ExpenseData = Expense.map((item) => item.amount);
  const IncomeData = Income.map((item) => item.amount);
  const ExpenseTotal = Expense.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  const IncomeTotal = Income.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  localStorage.setItem("total", ExpenseTotal + IncomeTotal);
  return (
    <>
      <div className="bg-gray-50 p-5 m-2">
        <p>
          <span className="text-gray-500">Expense :</span>
        </p>

        <Pie label={CatLabel1} data1={Expense} />
      </div>
      <div className="bg-gray-50 p-5 m-2">
        <p>
          <span className="text-gray-500">Income :</span>
        </p>

        <Pie label={CatLabel2} data1={Income} />
      </div>
      <Ver label={DateLabel} data1={Expense} data2={Income} />
      <Line label={DateLabel} data1={Expense} data2={Income} />
    </>
  );
};

export default Charts;
