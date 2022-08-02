import React from "react";
import { Link } from "react-router-dom";
import style from "../Style/LandingPage.module.css";
export default function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.titulo}>
        <h1>EBEUS TRAVEL</h1>
      </div>
      <div className={style.butt}>
        <Link to='/home'>
          <button className={style.boton}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Lets go!
          </button>
        </Link>
      </div>
    </div>
  );
}
