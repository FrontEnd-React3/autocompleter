import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Input, Card } from "antd";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryMatch, setCountryMatch] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    };
    loadCountries();
  }, []);
  console.log("countries" + JSON.stringify(countries));
  const searchCountries = (text) => {let matches = countries.filter((country) => {
    const regex = new RegExp(`${text}`, "gi");
    console.log("regex" + regex)
  return country.name.common.match(regex) 
  // || country.idd.capital.match(regex);
  });
  setCountryMatch(matches);}; return (
    <div className="App">
      <h1>Country Search</h1>
      <Input
        placeholder="Enter Country or Capital Name"
        onChange={e => searchCountries(e.target.value)}
        className="countryInput"
      ></Input>
      {countryMatch && countryMatch.map((item, index) => (
        <div><Card ><br/><br/><h2>{item.name.common}</h2> capital:{item.capital} </Card></div>
      ))}
    </div>
  );
}

export default App;
