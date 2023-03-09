/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Register({ handleLoginSwitch }) {
  return (
    <div className="loginScreen h-screen flex flex-col justify-center">
      <form className="loginContainer card w-96 bg-base-100 shadow-xl card-bordered">
        <div className="card-body">
          <div className="flex flex-row">
            <h2 className="loginTitle card-title ">Papotcar</h2>
          </div>
          <div className="text-success"></div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              required
              className="input input-bordered"
              v-model="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="password"
              required
              className="input input-bordered"
              v-model="password"
            />
            <label className="label">
              <span className="label-text">Confirmer le mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="password"
              required
              className="input input-bordered"
              v-model="password"
            />
          </div>
          <div className="text-error"></div>
          <div className="form-control mt-6">
            <button className="btn btnLogin">S'inscrire</button>
          </div>
          <label className="justify-center label">
            <a className="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div className=" flex justify-center align-center">
            <p className="newAccount">Vous avez déjà un compte ?</p>
            <a className="linkCreate link-hover pl-2" onClick={handleLoginSwitch}>
              Se connecter
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}