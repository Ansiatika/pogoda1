import ReactDOM from 'react-dom';
import React, { Component } from "react";


const CITIES = [
  { value: 'Черкаси', label:'Cherkasy' },
  { value: 'Чернігів', label:'Chernihiv' },
  { value: 'Дніпро', label: 'Dnipro'},
  { value: 'Донецьк',label:'Donetsk' },
  { value: 'Івано-Франківськ',label: 'Ivano-Frankivsk'},
  { value: 'Харків',label:'Kharkiv' },
  { value: 'Херсон', label:'Kherson' },
  { value: 'Хмельницький', label: 'Khmelnytskyi'},
  { value: 'Київ', label:'Kyiv' },
  { value: 'Луцьк', label:'Lutsk' },
  { value: 'Львів', label:'Lviv' },
  { value: 'Миколаїв', label:'Mykolaiv' },
  { value: 'Одеса', label:'Odesa' },
  { value: 'Полтава', label: 'Poltava'},
  { value: 'Суми', label:'Sumy' },
  { value: 'Тернопіль', label: 'Ternopil'},
  { value: 'Ужгород', label:'Uzhhorod' },
  { value: 'Вінниця', label: 'Vinnytsia'},
  { value: 'Запоріжжя', label:'Zaporizhzhia' },
  { value: 'Житомир', label:'Zhytomyr' }
  ] 

class WeatherDisplay extends Component {
  constructor() {
    super();

        this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const label = this.props.label;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      label +
      "&appid=3c3674a3c13a0084561b70150037e575";

    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        {CITIES.map((city, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {city.value}
          </button>
        ))}
        <WeatherDisplay key={activePlace} label={CITIES[activePlace].label} />
      </div>
    );
  }
}

ReactDom.render(
      <WeatherDisplay/>,
    document.getElementById('root')
);



