import React from "react";
import { Link } from "react-router-dom";
import style from "../Style/Card.module.css";
export default function CountriesCard({
  name,
  flag,
  continent,
  population,
  capital,
  id,
}) {
  return name ? (
    <div className={style.cards}>
      <Link to={`/countries/${id}`}>
        <div className={style.name}>
          <span>{name}</span>
        </div>
        <div className={style.imagen}>
          <img width={300} height={175} src={flag} alt={"IMG NOT FOUND"} />
        </div>

        <div className={style.info}>
          {capital !== "Capital no disponible" ? (
            <div className={style.capital}>
              <p>Capital: {capital}</p>
            </div>
          ) : (
            ""
          )}

          <div className={style.continent}>
            <p>Continent: {continent}</p>
          </div>
          <div className={style.population}>
            <p>Population: {population}</p>
          </div>
        </div>
      </Link>
    </div>
  ) : null;
}
