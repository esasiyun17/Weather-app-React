import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Titles from "./components/Titles";
import Weather from "./components/Weather";

const API_KEY = "dfc9ed15208de40e424c24b8841679a8";

class App extends Component {
  state = {
    sicaklik: undefined,
    sehir: undefined,
    ulke: undefined,
    nem: undefined,
    aciklama: undefined,
    hata: undefined,
  };

  getWeather = async (e) => {
    // console.log(e.target.elements.city)
    e.preventDefault();
    const sehir = e.target.elements.city.value;
    const ulke = e.target.elements.country.value;

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${sehir},${ulke}&appid=${API_KEY}`
    );
    const data = await api_call.json();
    if (sehir && ulke) {
      this.setState({
        sicaklik: data.main.temp,
        sehir: data.name,
        ulke: data.sys.country,
        nem: data.main.humidity,
        aciklama: data.weather[0].description,
        hata: "",
      });
    } else {
      this.setState({
        sicaklik: undefined,
        sehir: undefined,
        ulke: undefined,
        nem: undefined,
        aciklama: undefined,
        hata: "Lütfen geçerli bir şehir ve ülke adı giriniz !",
      });
    }
  };
  render() {
    return (
      <div className="container">
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather
          temp={parseInt(this.state.sicaklik)-272}
          city={this.state.sehir}
          country={this.state.ulke}
          humidity={this.state.nem}
          description={this.state.aciklama}
          error={this.state.hata}
        />
      </div>
    );
  }
}

export default App;
