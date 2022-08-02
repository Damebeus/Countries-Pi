import React from "react";
import style from "../Style/Paginado.module.css";

export default function Paginado({
  countriesPerPage,
  allCountries,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / 12); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li>
              <button
                className={style.numeritos}
                style={
                  currentPage === number
                    ? { backgroundColor: "#FADB45", color: "#000" }
                    : null
                }
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
