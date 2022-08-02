import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../redux/actions/actions";
import s from "../Style/SearchBar.module.css";
import lupa from "../image/lupa.png";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(ev) {
    ev.preventDefault();
    setName(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    dispatch(getNameCountries(name));
  }

  return (
    <div className={s.container}>
      <input
        type='text'
        placeholder='Search...'
        onChange={(ev) => handleChange(ev)}
      />
      {/*  <div className={s.btn}> */}
      <div>
        <button
          className={s.lupita}
          type='submit'
          onClick={(ev) => handleSubmit(ev)}
        >
          <img className={s.lupa} src={lupa} alt='lupa' />
        </button>
      </div>
      {/*  </div> */}
    </div>
  );
}
