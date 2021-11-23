import React, { useEffect, useState } from "react";
import axios from "axios";
import generatePDF from "./PdfGen/GenPdf";
import WholePdfGen from "./PdfGen/WholePdfGen";
const PassBook = () => {
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
  console.log(Expense);
  const ExpenseData = Expense.map((item) => item.amount);
  const IncomeData = Income.map((item) => item.amount);
  const ExpenseTotal = Expense.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  const IncomeTotal = Income.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  const Balance = IncomeTotal - ExpenseTotal;
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg font-bold text-gray-500 md:text-xl leading-normal md:leading-relaxed mb-2">
        Expense: <span className="text-red-400">{ExpenseTotal}</span>
        <br />
        Total Income: <span className="text-green-400">{IncomeTotal}</span>
        <br />
        {IncomeTotal - ExpenseTotal < 0 ? (
          <span className="text-red-400">You are Deep in Credit</span>
        ) : (
          <span className="text-green-400">
            {IncomeTotal - ExpenseTotal + " left"}
          </span>
        )}
      </p>
      {
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-gray-500 md:text-4xl leading-normal md:leading-relaxed mb-2">
            Expense:
          </p>
          <table>
            <thead>
              <tr>
                <th className="bg-blue-100 border text-center px-8 py-4">
                  Date
                </th>
                <th className="bg-blue-100 border text-center px-8 py-4">
                  Amount
                </th>
                <th className="bg-blue-100 border text-center px-8 py-4">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {Expense.map((item) => (
                <tr>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                    {item.amount}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                    {item.category}
                  </td>
                </tr>
              ))}
              <tr className="group bg-red-300">
                <td className="border text-center px-8 py-4  group-hover:bg-gray-100">
                  Total Expense
                </td>
                <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                  {ExpenseTotal}
                </td>
                <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                  ---
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-500 md:text-4xl leading-normal md:leading-relaxed mb-2">
              Income
            </p>
            <table>
              <thead>
                <tr>
                  <th className="bg-blue-100 border text-center px-8 py-4">
                    Date
                  </th>
                  <th className="bg-blue-100 border text-center px-8 py-4">
                    Amount
                  </th>
                  <th className="bg-blue-100 border text-center px-8 py-4">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {Income.map((item) => (
                  <tr>
                    <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                      {item.amount}
                    </td>
                    <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                      {item.category}
                    </td>
                  </tr>
                ))}
                <tr className="group bg-green-300">
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                    Total Income
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                    {IncomeTotal}
                  </td>
                  <td className="border text-center px-8 py-4 group-hover:bg-gray-100">
                    ---
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      <div className="flex flex-row">
        <button
          className="bg-blue-400 p-2 rounded-xl text-white text-lg m-2"
          onClick={() => generatePDF(Income, Balance)}
        >
          Generate Income report
        </button>
        <button
          className="bg-blue-400 p-2 rounded-2xl text-white text-lg m-2"
          onClick={() => generatePDF(Expense, Balance)}
        >
          Generate Expense report
        </button>
        <button
          className="bg-blue-400 p-2 rounded-2xl text-white text-lg m-2"
          onClick={() => WholePdfGen(data, Balance)}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default PassBook;
