import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const body = {
    name: name,
    email: email,
    password: password,
  };

  function handleForm(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError(true);
      setLoading(false);
      setSuccess(false);
      setErrorMessage("Passwords don't match");
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      fetch("http://localhost:3001/api/auth/register", {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User Created Successfully") {
            setSuccess(true);
            setLoading(false);
            setSuccessMessage(data.message);
            setTimeout(() => {
              setError(false);
              setSuccess(false);
              window.location.href = "/login";
            }, 2000);
          } else if (data.message === "User Exists Already") {
            setError(true);
            setErrorMessage(data.message);
            setLoading(false);
            setSuccess(false);
            setTimeout(() => {
              window.location.pathname = "/login";
            }, 3000);
          } else {
            setError(true);
            setErrorMessage("Something went wrong, Please try again later!");
            setLoading(false);
            setSuccess(false);
          }
        })
        .then(
          setTimeout(() => {
            setError(false);
            setSuccess(false);
          }, 3000)
        );
    }
  }
  return (
    <>
      <div>
        <section className="min-h-screen flex flex-col">
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
              {error && (
                <div
                  class="bg-red-100 border-t border-b border-r border-l border-red-500 text-red-700 px-4 py-3 rounded-lg"
                  role="alert"
                >
                  <p class="font-bold">Error</p>
                  <p class="text-sm">{errorMessage}</p>
                </div>
              )}
              {success && (
                <div
                  class="bg-green-100 border-t border-b border-r border-l border-green-500 text-green-700 px-4 py-3 rounded-lg"
                  role="alert"
                >
                  <p class="font-bold">Success</p>
                  <p class="text-sm">{successMessage}</p>
                </div>
              )}
              <form
                className="text-center"
                onSubmit={handleForm}
                action="/login"
              >
                <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Register
                </h1>
                <div className="py-2 text-left">
                  <TextField
                    id="standard-basic"
                    label="Name"
                    type="Name"
                    className=" border-2 border-gray-100
                  focus:outline-none  block w-full py-2 px-4
                  rounded-lg focus:border-gray-700 outline-none "
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    type="Password"
                    className=" border-2 border-gray-100 focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="py-2 text-left">
                  <TextField
                    id="standard-basic"
                    label="Confirm Password"
                    type="Password"
                    className=" border-2 border-gray-100 focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="py-2 flex flex-row justify-between">
                  <Button
                    type="submit"
                    className="border-2 border-gray-100 focus:outline-none bg-blue-400 text-white font-bold tracking-wider block w-full p-2 rounded-lg"
                    variant="contained"
                    color="primary"
                  >
                    {loading ? "Loading...." : "Register"}
                  </Button>
                  <button type="reset" className="m-2">
                    <RotateLeftIcon />
                  </button>
                </div>
                <div>
                  Already Have a account,{" "}
                  <Link to="/login" className="text-blue-400">
                    click here
                  </Link>{" "}
                  to login.
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
