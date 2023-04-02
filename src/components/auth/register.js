import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function Register({ handleLoginSwitch }) {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="loginScreen h-screen flex flex-col justify-center">
      <Form onSubmit={handleRegister} ref={form} className="loginContainer register card w-96 bg-base-100 shadow-xl card-bordered">
        <div className="card-body">
        {!successful && (
          <div>
          <div className="flex flex-row justify-center">
            <img src="../logoPPC.png" className="logoImgAuth" />
          </div>
          <div className="text-success"></div>
          <div className="doubleInputForm">
            <div className="form-control">
              <input
                type="email"
                placeholder="Adresse email"
                required
                className="inputRegister input input-bordered"
                v-model="email"
                value={email}
                  onChange={onChangeEmail}
                  validations={[validEmail]}
              />
            </div>
            <div className="form-control">
              <input
                type="phone"
                placeholder="Téléphone"
                required
                className="inputRegister input input-bordered"
                v-model="phone"
              />
            </div>
          </div>
          <div className="doubleInputForm">
            <div className="form-control">
              <input
                type="name"
                placeholder="Nom"
                required
                className="inputRegister input input-bordered"
                v-model="username"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[vusername]}
              />
            </div>
            <div className="form-control">
              <input
                type="surname"
                placeholder="Prénom"
                required
                className="inputRegister input input-bordered"
                v-model="surname"
              />
            </div>
          </div>
          <div className="form-control">
              <input
                type="password"
                placeholder="Mot de passe"
                required
                className="input input-bordered"
                v-model="password"
                value={password}
                  onChange={onChangePassword}
                  validations={[vpassword]}
                />
              
            </div>

          <div className="text-error"></div>
          <div className="form-control mt-6">
            <button className="btn btnLogin">S'inscrire</button>
          </div>
          <label className="justify-center label">
            <a className="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div class="divider"></div> 
          <div className=" flex justify-center align-center">
            <p className="newAccount">Vous avez déjà un compte ?</p>
            <a
              className="linkCreate link-hover pl-2"
              onClick={handleLoginSwitch}
            >
              Se connecter
            </a>
          </div>
          </div>
          )}
        </div>
        <figure className="registerImg">
          <img src="../login-img.png" className="pic" />
        </figure>
        {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}