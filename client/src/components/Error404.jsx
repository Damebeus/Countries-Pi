import React from "react";
import style from "../Style/Error404.module.css";
import { Link } from "react-router-dom";
import cuatro from "../image/cuatro.png";
import avioncito from "../image/avion.png";
export default function Error404() {
  return (
    <div className={style.error}>
      <div className={style.container}></div>
      <img className={style.cuatro} src={cuatro} alt='' />
      <p>Page not found...</p>
      <img className={style.avioncito} src={avioncito} alt='' />
      <div className={style.butt}>
        <Link to='/home'>
          <button className={style.boton}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Back to home!
          </button>
        </Link>
      </div>
    </div>
  );
}
