import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import s from "../Style/Admin.module.css";
function Admin(props) {
  const [user, setUsers] = useState([]);
  const [idActive, setIdActive] = useState("");
  const [put, setPut] = useState({
    countries: [],
    id: [],
    season: [],
    difficulty: [],
  });
  const [input, setInput] = useState({
    user: "",
    password: 0,
  });
  const [admin, setAdmin] = useState(false);
  const handleStatePut = (e) => {
    setPut({
      ...put,
      [e.target.name]: e.target.value,
    });
  };
  const handlePut = (e) => {
    e.preventDefault();
    const { season, countries } = put;
    axios
      .put(`/${put.id}`, {
        countries: countries,
        season: season,
        difficulty: put.difficulty,
      })
      .then((res) => {
        setAdmin(res.data);
      });
  };
  const handleState = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, password } = input;
    if (user === "ebeo" || password === 1234) {
      console.log("anashe");
      setAdmin(true);
    } else {
      alert("wrong user or password");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`/activities/${idActive}`).then((res) => {
      setAdmin(res.data);
    });
  };
  const handleDeleteAll = (e) => {
    e.preventDefault();
    axios.delete("/activities").then((res) => {
      setAdmin(res.data);
    });
  };

  return admin ? (
    <div className={s.cont}>
      <Link to='/home'>
        <button>Home</button>
      </Link>
      <h1>Admin Page</h1>
      <form className={s.form} action=''>
        <label className={s.item} htmlFor=''>
          Delete For Id
        </label>
        <input
          type='text'
          name='user'
          onChange={(e) => {
            setIdActive(e.target.value);
          }}
        />
        <input
          type='submit'
          onClick={(e) => {
            handleDelete(e);
          }}
        />

        <label className={s.item3ebe} htmlFor=''>
          Put For Id
        </label>
        <input
          type='text'
          name='id'
          placeholder='Id of Activity'
          onChange={(e) => {
            handleStatePut(e);
          }}
        />
        <input
          type='number'
          name='difficulty'
          placeholder='Difficulty of Activity'
          onChange={(e) => {
            handleStatePut(e);
          }}
        />
        <input
          type='number'
          name='duration'
          placeholder='Duration of Activity'
          onChange={(e) => {
            handleStatePut(e);
          }}
        />
        <input
          type='text'
          name='season'
          placeholder='Season of Activity'
          onChange={(e) => {
            handleStatePut(e);
          }}
        />
        <input
          type='text'
          name='countries'
          placeholder='Countries of Activity'
          onChange={(e) => {
            handleStatePut(e);
          }}
        />
        <input
          type='submit'
          onClick={(e) => {
            handlePut(e);
          }}
        />
        <label className={s.item3} htmlFor=''>
          Delete All
        </label>
        <input
          type='submit'
          onClick={(e) => {
            handleDeleteAll(e);
          }}
        />
      </form>
    </div>
  ) : (
    <div className={s.contenedor}>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit} className={s.formulario}>
        <label className={s.item} htmlFor=''>
          User
        </label>
        <input
          type='text'
          name='user'
          onChange={(e) => {
            handleState(e);
          }}
        />
        <label className={s.item2} htmlFor=''>
          Password
        </label>
        <input
          type='password'
          name='password'
          onChange={(e) => {
            handleState(e);
          }}
        />
        <input className={s.item3} type='submit' />
      </form>
    </div>
  );
}

export default Admin;
