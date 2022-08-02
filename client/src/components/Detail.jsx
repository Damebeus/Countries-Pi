import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../redux/actions/actions";
import S from "../Style/Detail.module.css";
import bg from "../image/bgt.jpg";
import gif from "../image/loader.gif";
import axios from "axios";
export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;

  /*  const [state, setstate] = useState([]);
  useEffect(() => {
    axios.get(`https://restcountries.com/v3/name/${id}`).then((res) => {
      setstate(res.data[0].borders);
    });
  }, []);
 */
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);
  const myCountry = useSelector((state) => state.detail);
  console.log(myCountry);
  return myCountry.length > 0 ? (
    <div className={S.grandContainer}>
      <div>
        <Link to='/home'>
          <button className={S.boton}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Back!
          </button>
        </Link>
        <div className={S.container}>
          <h1>{myCountry[0]?.name}</h1>
          <img className={S.flag} src={myCountry[0].flag} alt='flag' />

          <div className={S.continent}>
            <h3>Continent: {myCountry[0].continent} </h3>
          </div>
          <div className={S.capital}>
            <h3>Capital: {myCountry[0].capital} </h3>
          </div>
          <div className={S.subregion}>
            <h3>Subregion: {myCountry[0].subregion}</h3>
          </div>
          <div className={S.area}>
            <h3>Area: {myCountry[0].area + " km²"} </h3>
          </div>
          <div className={S.population}>
            <h3>Population: {myCountry[0].population}</h3>
          </div>

          {/* <div>
            <h3>
              borders:{" "}
              {state.map((item) => (
                <h3>{item}</h3>
              ))}
            </h3>
          </div> */}
        </div>
      </div>

      {myCountry[0].activities ? (
        myCountry[0].activities.map((elm) => (
          <div className={S.activ}>
            <li>
              <h1>Activities:</h1>
              <span className={S.tuty}>{elm.name}</span>
              <p>
                Difficulty : <span>{elm.difficulty}</span>
              </p>
              <p>
                Duration : <span>{elm.duration}</span>
              </p>
              <p>
                Season : <span>{elm.season}</span>
              </p>
            </li>
          </div>
        ))
      ) : (
        <div className={S.noa}>
          <h3>Activities not found</h3>
        </div>
      )}
    </div>
  ) : (
    <div>
      <img className={S.bg} src={bg} alt='' />

      <img className={S.gif} src={gif} alt='' />
    </div>
  );
}
