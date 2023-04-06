import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";


export default function Login({ handleLoginSwitch }) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="loginScreen h-screen flex flex-col justify-center">

      <Form onSubmit={handleLogin} ref={form} className="loginContainer card w-96 bg-base-100 shadow-xl card-bordered">
        <div className="card-body">
          <div className="flex flex-row justify-center">
            <img src="../logoPPC.png" className="logoImgAuth" />
          </div>
          <div className="text-success"></div>
          <div className="form-control">
            <input
              type="email"
              placeholder="adresse email"
              required
              className="input input-bordered w-96"
              v-model="email"
              value={username}
              onChange={onChangeUsername}
            // validations={[required]}
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="Mot de passe"
              required
              className="input input-bordered w-96"
              v-model="password"
              value={password}
              onChange={onChangePassword}
            // validations={[required]}
            />
          </div>
          <div className="text-error"></div>
          <div className="form-control mt-6">
            <button className="btn btnLogin">Se connecter</button>
          </div>
          <label className="justify-center label">
            <a className="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div className="divider ma-0"></div> 
          <div className=" flex justify-center align-center">
            <p className="newAccount">Vous n'avez pas encore de compte ?</p>
            <a
              className="linkCreate link-hover pl-2"
              onClick={handleLoginSwitch}
            >
              S'inscrire
            </a>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </div>
        <figure className="loginImg">
          <img src="../login-img.png" className="pic" />
        </figure>
      </Form>
      
    </div>
  );
};
