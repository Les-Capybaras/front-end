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
          <div className="flex flex-row">
            <h2 className="loginTitle card-title ">Papotcar</h2>
          </div>
          <div className="text-success"></div>
          <div className="form-control">
            <label className="label" htmlFor="mail">Email</label>
            <Input
              type="email"
              placeholder="email"
              required
              className="input input-bordered w-96"
              v-model="email"
              value={username}
              onChange={onChangeUsername}
            // validations={[required]}
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">Mot de passe</label>
            <Input
              type="password"
              placeholder="password"
              required
              className="input input-bordered w-96"
              v-model="password"
              value={password}
              onChange={onChangePassword}
            // validations={[required]}
            />
          </div>
          <div className="text-error"></div>
          <div className="form-group">

            <div className="form-control mt-6">
              <button className="btn btnLogin">
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Se connecter
              </button>
            </div>
            <label className="justify-center label">
              <a className="forgotLabel link-hover">Mot de passe oublié?</a>
            </label>
            <div className=" flex justify-center align-center">
              <p className="newAccount">Vous n'avez pas encore de compte ?</p>
              <button className="linkCreate link-hover pl-2" onClick={handleLoginSwitch}>
                S'inscrire
              </button>
            </div>
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
      </Form>
    </div>
  );
};
