const axios = require("axios");
const { Router } = require("express");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
const router = Router();

router.get("/", async (req, res) => {
  // Hacemos la petición a la api y luego la filtramos obteniendo solo los datos que nos sirven
  let { data } = await axios.get("https://restcountries.com/v3/all");
  const countriesFiltered = data.map((country) => {
    let subregion;
    if (!country.subregion) {
      subregion = "";
    } else {
      subregion = country.subregion;
    }

    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[1],
      continent: country.continents[0],
      subregion: country.subregion
        ? country.subregion
        : "Subregion no disponible",
      area: country.area,
      population: country.population,
      capital: country.capital ? country.capital[0] : "Capital no disponible",
      borders: country.borders,
    };
  });

  // Insertamos los datos filtrados de la api en la BD
  await Country.bulkCreate(countriesFiltered, {
    ignoreDuplicates: true,
  });
  let name = req.query.name;
  // Si se realiza una query, entonces se devuelve filtrado y ordenado de forma ascendente
  if (name) {
    try {
      let countries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        order: [["name", "ASC"]],
      });
      res.json(countries);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      let countries = await Country.findAll({
        include: Activity,
        order: [["name", "ASC"]],
      });
      res.json(countries);
    } catch (error) {
      console.log(error);
    }
  }
});

const getAllInfo = async () => {
  let { data } = await axios.get("https://restcountries.com/v3/all");

  return Country.findAll({
    include: Activity,
  });
};

router.get("/:id", async (req, res) => {
  let id = req.params.id.toLowerCase();

  try {
    let idSearch = await getAllInfo();
    let idCountry = idSearch.filter(
      (country) => country.id.toLowerCase() === id
    );

    if (idCountry.length > 0) {
      res.json(idCountry);
    } else {
      res.status(404).json({
        message: "Country not found",
      });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
