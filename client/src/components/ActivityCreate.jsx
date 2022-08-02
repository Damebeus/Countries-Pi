import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  postActivities,
  /*   getActivities, */
  getCountries,
} from "../redux/actions/actions";
import logo from "../image/logoEbeu.png";
import styles from "../Style/ActivityCreate.module.css";
export function ActivityCreate() {
  let dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries);
  const history = useHistory();

  const [state, setState] = useState({
    countries: [],
    id: [],
    difficulty: 1,
  });
  const [errors, setErrors] = useState({
    name: "Name must not be empty",
    duration: "Duration must not be empty",
    season: "You must select a season",
    countries: "You must select at least one country",
  });
  useEffect(() => dispatch(getCountries()), [dispatch]);

  function handleChange(ev) {
    if (ev.target.name !== "countries") {
      setState({
        ...state,
        [ev.target.name]: ev.target.value,
      });
    } else if (ev.target.name) {
      state.countries.push(ev.target.value);
      state.id.push(ev.target.selectedOptions[0].id);
    }
    setErrors(
      formValidator({
        ...state,
        [ev.target.name]: ev.target.value,
      })
    );
  }
  function deleteCountry(ev) {
    ev.preventDefault();
    state.countries = state.countries.filter(
      (country) => country !== ev.target.textContent
    );
    state.id = state.id.filter((country) => country !== ev.target.id);
    setErrors(formValidator(state));
  }
  function formValidator(value) {
    let errors = {};
    if (!value.name || !value.name.trim().length)
      errors.name = "Name must not be empty";
    else if (!/^[A-Za-z\s]+$/.test(value.name)) errors.name = "Name is invalid";
    else if (!value.difficulty)
      errors.difficulty = "You must select a difficulty level";
    else if (!value.duration) errors.duration = "Duration must not be empty";
    else if (!value.season) errors.season = "You must select a season";
    else if (value.countries.length === 0)
      errors.countries = "You must select at least one country";
    return errors;
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivities(state));
    alert("Activity created successfully");
    setState({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
      id: [],
    });
    history.push("/home");
    setErrors(
      formValidator({
        name: "",
        difficulty: 1,
        duration: "",
        season: "",
        countries: [],
        id: [],
      })
    );
  }

  return (
    <div className={styles.todo}>
      <div className={styles.todoContainer}>
        <img src={logo} alt='logo' className={styles.logo} />

        <Link to='/home'>
          <div className={styles.buttonContainer1}>
            <span className={styles.mas}>Back!</span>
            <button id='work' type='button' name='Hover'>
              Back!
            </button>
          </div>
        </Link>
        <div className={styles.titulin}>
          <h1>Create Activity</h1>
        </div>
        <form onSubmit={(ev) => handleSubmit(ev)} className={styles.main}>
          <div className={styles.lineaUno}>
            <div className={styles.entryN}>
              <label className={styles.item}>Name:</label>
              <input
                onChange={(e) => handleChange(e)}
                className={styles.item}
                type='text'
                name='name'
                value={state.name}
              />
              <div className={styles.error}>
                <span className={styles.item2}>
                  {errors.name ? errors.name : null}
                </span>
              </div>
            </div>
            <div className={styles.entryD}>
              <label className={styles.item}>Duration:</label>
              <select
                onChange={(e) => handleChange(e)}
                className={styles.item}
                type='text'
                name='duration'
                value={state.duration}
              >
                <option value={"menos de 1 hora"}>Less than 1 hour</option>
                <option value={"1 hora"}>1 hour</option>
                <option value={"2 horas"}>2 hours</option>
                <option value={"3 horas"}>3 hours</option>
                <option value={"mas de 3 horas"}>more than 3 hours</option>
              </select>
              <div className={styles.error}>
                <span className={styles.item2}>
                  {errors.duration ? errors.duration : null}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.difficulty}>
            <div className={styles.entry}>
              <label className={styles.item}>Difficulty</label>
              <input
                onChange={(e) => handleChange(e)}
                className={styles.item}
                type='range'
                min='1'
                max='5'
                name='difficulty'
                value={state.difficulty}
              />{" "}
              <span>{state.difficulty}</span>
              <span className={styles.item2}>
                {errors.difficulty ? errors.difficulty : null}
              </span>
            </div>
          </div>
          <div className={styles.lineaDos}>
            <div className={styles.entryS}>
              <label className={styles.item}>Season:</label>
              <select
                onChange={(e) => handleChange(e)}
                className={styles.item}
                name='season'
                value={state.season}
              >
                <option value=''>Please select a season</option>{" "}
                <option value='Summer'>Summer</option>{" "}
                <option value='Fall'>Fall</option>{" "}
                <option value='Winter'>Winter</option>
                <option value='Spring'>Spring</option>{" "}
              </select>
              <div className={styles.error}>
                <span className={styles.item2}>
                  {errors.season ? errors.season : null}
                </span>
              </div>
            </div>
            <div className={styles.entryC}>
              <label className={styles.item}>Countries:</label>
              <select
                onChange={(e) => handleChange(e)}
                className={styles.item}
                name='countries'
                value={state.countries}
              >
                <option value=''>Please select a country</option>
                {countryList.map((country) => {
                  return (
                    <option
                      key={country.id}
                      id={country.id}
                      value={country.name}
                    >
                      {country.name}
                    </option>
                  );
                })}
              </select>
              <div className={styles.error}>
                <span className={styles.item2}>
                  {errors.countries ? errors.countries : null}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.parrafo}>
            <p>You can delete a country by clicking on it</p>
          </div>
          <div className={styles.entry}>
            <p>
              Selected countries:{" "}
              {state.countries.map((country) => {
                return (
                  <button
                    value={state.id[state.countries.indexOf(country)]}
                    className={styles.selected}
                    onClick={(e) => deleteCountry(e)}
                  >
                    {country}
                  </button>
                );
              })}
            </p>
          </div>
          <div className={styles.button}>
            <input
              className={styles.send}
              onChange={(e) => handleChange(e)}
              type='submit'
              value='Create activity'
              disabled={Object.keys(errors).length > 0 ? true : false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityCreate;
