import React, { useState } from "react";
import axios from "axios";
function Form() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCatogery] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [errorMessage, setErrormessage] = useState("");
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      amount: Math.abs(amount),
      type: amount < 0 ? "DEBIT" : "CREDIT",
      description: text,
      category: category,
    };
    if (token) {
      axios
        .post("http://localhost:3001/api/transactions", newTransaction, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.message === "Transaction Recorded") {
            setError(false);
            setSuccess(true);
            setText("");
            setAmount(0);
            setCatogery("");
          } else {
            setError(true);
            setSuccess(false);
            setErrormessage(res.data.message);
          }
        });
    }
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center w-screen bg-gray-200 text-gray-700">
        {error && (
          <div
            className="mt-2 bg-red-100 border-t border-b border-r border-l border-red-500 text-red-700 px-4 py-3 rounded-lg"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
        {success && (
          <div
            className="mt-2 bg-green-100 border-t border-b border-r border-l border-green-500 text-green-dark px-4 py-3 rounded-lg"
            role="alert"
          >
            <p className="font-bold">Transaction Recorded</p>
          </div>
        )}
        <h1 class="text-4xl font-bold mt-5">Add Transaction</h1>
        <form
          class="flex flex-col bg-white rounded shadow-lg p-12 m-12"
          onSubmit={onSubmit}
        >
          <label class="font-semibold text-xs" for="text">
            Message
          </label>
          <input
            id="text"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
          <label class="font-semibold text-xs mt-3" for="amount">
            Amount
          </label>
          <input
            id="amount"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
          <label class="font-semibold text-xs mt-3" for="passwordField">
            - for Expense
          </label>
          <label for="category">Choose a Category</label>

          <select
            id="category"
            class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="option"
            onChange={(e) => setCatogery(e.target.value)}
          >
            <option value="" fixed>
              Select a Category
            </option>
            <option value="f&b">F&B</option>
            <option value="Stationary">Stationary</option>
            <option value="Clothes">Clothes</option>
            <option value="Salary">Salary</option>
          </select>
          <button class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
            Add Transaction
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
