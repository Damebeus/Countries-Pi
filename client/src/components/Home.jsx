import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivities,
  getCountries,
  orderByPopulation,
  orderByName,
  filterByContinent,
  filterByActivity,
  detailVacio,
} from "../redux/actions/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Style from "../Style/Home.module.css";
import S from "../Style/NavBar.module.css";
import Paginado from "./Paginado";
import SearchBar from "./Searchbar";
import videoNa from "../image/nath.mp4";
/* import VideoSlider from "./VideoSlider.jsx"; */
/* import bg from "../image/bgt.jpg";
import gif from "../image/loader.gif"; */
import Logo from "../image/logoEbeu.png";
import avioncito from "../image/avioncito.png";
import refreshh from "../image/refresh.png";

////
export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countriesDos);
  const [order, setOrder] = useState("null");
  const activities = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  //
  const indexOfLastCountries = currentPage * countriesPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber === 1) {
      setCountriesPerPage(9);
    } else {
      setCountriesPerPage(12);
    }
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
    return () => {
      dispatch(detailVacio());
    };
  }, []);

  function handleClick(ev) {
    dispatch(getCountries());
    setCurrentPage(1);
  }

  function handleOrderP(ev) {
    dispatch(orderByPopulation(ev));
    setOrder(ev);
    setCurrentPage(1);
  }
  function handleOrderN(ev) {
    dispatch(orderByName(ev));
    setOrder(ev);
    setCurrentPage(1);
  }
  function handleContinent(ev) {
    if (ev === "null") {
      dispatch(getCountries());
      setCurrentPage(1);
    } else {
      dispatch(filterByContinent(ev));
      setOrder(ev);
      setCurrentPage(1);
    }
  }
  function handleActivity(ev) {
    if (ev === "null") {
      dispatch(getCountries());
      setCurrentPage(1);
    } else {
      dispatch(filterByActivity(ev));
      setOrder(ev);
      setCurrentPage(1);
    }
  }
  ///////////////////////
  return (
    /*  allCountries.length ? */ <div className={Style.granContainer}>
      <div className={Style.contVideo}>
        <video
          className={Style.video}
          autoPlay
          loop
          muted
          src={videoNa}
          type='video/mp4'
        />
        <div className={Style.inBanner}></div>
        <div className={Style.banner}></div>
        <div className={Style.supBanner}></div>
        <h2>
          Fully committed so that you have the best experience and make the most
          of every moment with us.
        </h2>
        <h3>EBE COMPANY</h3>
        <img src={avioncito} alt='logo' className={Style.avioncito} />
      </div>

      <div className={Style.logoCentral}>
        <img className={Style.logo2} src={Logo} alt='logo' />
        <h1>WELCOMES YOU</h1>
      </div>

      <div className={Style.lorem}>
        <p>
          Traveling not only gives us visual pleasure, it is also a gift for the
          soul, a caress for our senses. Life is what you make of it, and ebeus
          offers you all the necessary information so that you can make the most
          of each one of your trips, from activities such as fishing, surfing,
          movies, to feeling the vertigo of skydiving, we hope you enjoy every
          moment here at ebeus as much as we enjoy having it.
        </p>
      </div>
      <div className={Style.destino}>
        <h1>AND NOW...</h1>
        <h2>what is your next destination?</h2>
      </div>

      <div className={Style.paginado}>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          currentPage={currentPage}
          paginado={paginado}
        />
      </div>
      <div className={Style.cardContainer}>
        {currentCountries.length ? (
          currentCountries.map((elm) => (
            <Card
              key={elm.id}
              id={elm.id}
              name={elm.name}
              flag={elm.flag}
              continent={elm.continent}
              population={elm.population}
              capital={elm.capital}
            />
          ))
        ) : (
          <div className={Style.err}>
            <h1>Country not Found...</h1>
            <h2>Please,check the name.</h2>
          </div>
        )}
      </div>
      <div className={Style.paginado}>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          currentPage={currentPage}
          paginado={paginado}
        />
      </div>
      {/*     ////////////////////// */}
      {/*      <div className={Style.slider}>
        <div className={Style.sliderContainer}> </div>
        <VideoSlider />
        <div className={Style.sliderContainer}> </div>
      </div>
      <div className={Style.activiTit}>
        <h1>ACTIVITIES</h1>
        </div> */}
      {/*  ////////////////////// */}
      <div className={S.container}>
        <div className={S.SearchBar}>
          <SearchBar />
        </div>
        <Link to='/activitiesCreate' className={S.create}>
          Create activity
        </Link>

        <button
          className={Style.refresh}
          onClick={(ev) => {
            handleClick(ev);
          }}
        >
          <img src={refreshh} alt='refresh' className={Style.refreshh} />
        </button>
        <div className={S.barra}>
          <div>
            <img className={S.logo} src={Logo} alt='logo' />
          </div>

          <select
            onChange={(ev) => handleOrderN(ev.target.value)}
            className={S.buttonSelect}
          >
            <option value='null'>Alphabetic</option>
            <option value='az'>A-Z</option>
            <option value='za'>Z-A</option>
          </select>
          <select
            onChange={(ev) => handleOrderP(ev.target.value)}
            className={S.buttonSelectP}
          >
            <option value='null'>Population</option>
            <option value='Asc'>➕ Population</option>
            <option value='Des'>➖ Population</option>
          </select>
          <select
            onChange={(ev) => handleContinent(ev.target.value)}
            className={S.buttonSelectC}
          >
            <option value='null'>Continent</option>
            <option value='South America'>South America</option>
            <option value='North America'>North America</option>
            <option value='Europe'>Europe</option>
            <option value='Africa'>Africa</option>
            <option value='Asia'>Asia</option>
            <option value='Oceania'>Oceania</option>
            <option value='Antarctica'>Antarctica</option>
          </select>
          <select
            onChange={(ev) => handleActivity(ev.target.value)}
            className={S.buttonSelectA}
          >
            <option value='actividad'>Activity</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/*  <div className={Style.footer}>
        <p>©2022 Damian Ebeus</p>
      </div> */}
    </div>
  ); /* : (
    <div>
      <img className={Style.bg} src={bg} alt='' />

      <img className={Style.gif} src={gif} alt='' />
    </div>
  ); */
}
