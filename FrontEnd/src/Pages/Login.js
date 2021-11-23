import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrormessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(true);
          setErrormessage(data.message);
        } else if (data.token) {
          localStorage.setItem("token", data.token);
          setSuccess(true);
          setTimeout(() => {
            window.location.assign("/dashboard");
          }, 1500);
        } else {
          setError(true);
          setErrormessage("Something went wrong, Please try again later!");
          setLoading(false);
          setSuccess(false);
        }
      })
      .then(
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 4000)
      );
  }

  return (
    <>
      <div>
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
            <p className="font-bold">Success</p>
          </div>
        )}
        <section className="min-h-screen flex flex-col items-center justify-center">
          <div className="">
            <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
              <form
                className="text-center"
                onSubmit={handleSubmit}
                action="/login"
              >
                <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Login
                </h1>
                <div className="py-2 text-left">
                  <TextField
                    id="standard-basic"
                    label="Email"
                    type="email"
                    className=" border-5 border-gray-100
                  focus:outline-none  block w-full py-4 px-5
                  rounded-lg focus:border-gray-600 "
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="py-2 text-left">
                  <TextField
                    id="standard-basic"
                    label="Password"
                    type="password"
                    className=" border-5 border-gray-100
                  focus:outline-none  block w-full py-4 px-5
                  rounded-lg focus:border-gray-600 "
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="py-2 flex flex-row justify-between">
                  <Button
                    type="submit"
                    className="border-2 border-gray-100 focus:outline-none bg-blue-400 text-white font-bold tracking-wider block w-full p-2 rounded-lg"
                    variant="contained"
                    color="primary"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                      >
                        {" "}
                      </svg>
                    ) : (
                      <span>Login</span>
                    )}
                  </Button>
                  <button type="reset" className="m-2">
                    <RotateLeftIcon />
                  </button>
                </div>
                <div>
                  Don't Have a Account,{" "}
                  <Link to="/register" className="text-blue-400">
                    click here
                  </Link>{" "}
                  to Register.
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
