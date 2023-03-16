/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Login({ handleLoginSwitch }) {
  return (
    <div className="loginScreen h-screen flex flex-col justify-center">
      <form className="loginContainer card card-side bg-base-100 shadow-xl card-bordered">
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
              className="input input-bordered"
              v-model="email"
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Mot de passe"
              required
              className="input input-bordered"
              v-model="password"
            />
          </div>
          <div className="text-error"></div>
          <div className="form-control mt-6">
            <button className="btn btnLogin">Se connecter</button>
          </div>
          <label className="justify-center label">
            <a className="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div class="divider ma-0"></div> 
          <div className=" flex justify-center align-center">
            <p className="newAccount">Vous n'avez pas encore de compte ?</p>
            <a
              className="linkCreate link-hover pl-2"
              onClick={handleLoginSwitch}
            >
              S'inscrire
            </a>
          </div>
        </div>
        <figure className="loginImg">
          <img src="../login-img.png" className="pic" />
        </figure>
      </form>
    </div>
  );
}
