const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    let activitiesDb = await Activity.findAll({
      include: Country,
      order: [["name", "ASC"]],
    });
    res.json(activitiesDb);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  let { name, difficulty, duration, season, countries } = req.body;
  let newActivity;
  try {
    newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
  } catch (error) {
    res.send(error);
  }
  try {
    countries.map(async (country) => {
      const paisito = await Country.findByPk(country);
      await newActivity.setCountries(paisito);
    });
    return res.json(newActivity);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
