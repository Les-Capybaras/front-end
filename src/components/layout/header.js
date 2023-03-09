import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
      <div className="navbar bg-base-100">
        <div className="header-logo">
          <a className="btn btn-ghost normal-case text-xl">Logo</a>
        </div>
        <div className="header-link">
          <ul className="menu menu-horizontal px-1">
            
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/road">Mes Trajets</Link></li>
            <li><Link to="/history">Historique</Link></li>
          </ul>
          
        </div>
        <div className="header-profil">
          <a className="btn btn-ghost normal-case text-xl">profil</a>
        </div>
      </div>
    )
}