import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logout, setLogout] = useState(false);

  const handleSubmit = () => {
    console.log(email, password);
    axios
      .post("http://localhost:8080/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.code === 201) {
          alert("Too many attempts");
          setLogout(true);
          console.log(res.data);
        }
        if (res.data.code === 200) {
          // move to home
          navigate("/home");
          localStorage.setItem("TOKEN", res.data.token);

          localStorage.setItem("EMAIL", res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h1 className="center"> SIGNIN </h1>
        <div className="outcard">
          Email
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="inputs"
            type="email"
          />{" "}
          <br /> <br />
          Password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="inputs"
            type="password"
          />{" "}
          <br /> <br />
          <button onClick={handleSubmit} className="btns">
            {" "}
            SUBMIT{" "}
          </button>
          <Link
            style={{
              textAlign: "center",
              display: "block",
              marginTop: "5px",
            }}
            to={"/"}
          >
            {" "}
            SIGN UP{" "}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signin;
