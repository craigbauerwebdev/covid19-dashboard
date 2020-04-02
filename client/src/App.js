import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: '',
      covid19Summary: ''
    };
  }

  callAPI() {
      fetch('http://localhost:9000/testAPI/') // comes from express
          .then(res => res.text())
          .then(
            res => this.setState({
              apiResponse: res 
            }));
  }

  getCovid19Summary() {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(
        res => this.setState({
          covid19Summary: res
        }));
  }

  getCovid19Countries() {
    // map through contries and build object with 3 status
    fetch('https://api.covid19api.com/countries')
      .then(res => res.json())
      .then(
        res => this.setState({
          covid19Countries: res//parse.json(res)
        }));
  }

  getCovid19CountryData( country, status) {
    const countryData = `https://api.covid19api.com/total/country/${country}/status/${status}`;
    fetch(countryData)
      .then(res => res.json())
      .then(
        res => this.setState({
          currentCountry: res
      }));
  }

  componentDidMount() { // look up life cycle components
      this.callAPI();
      this.getCovid19Summary();
      this.getCovid19Countries();
      this.getCovid19CountryData('china', 'confirmed');
  }
  render(){
//src={process.env.PUBLIC_URL + '/yourPathHere.jpg'}
    if(this.state.covid19Summary.Countries && this.state.covid19Summary.Countries !== ""){
      const summary = this.state.covid19Summary.Countries.sort(function(a,b){
        return a.TotalConfirmed - b.TotalConfirmed;
      });
      summary.reverse();
      return (
        <div className="App">
          <header className="App-header">
            <h1>COVID19 Dashboard</h1>
            {<img src="/images/covid19-logo.png" />}
              {this.state.apiResponse}
              <div className="main-table">
                <header>
                  <p>Country</p>
                  <p>Confirmed</p>
                  <p>Recovered</p>
                  <p>Deaths</p>
                  <hr />
                </header>
                {summary.map(function(country, i) {
                  return(
                    <div className="row">
                      <p>{country.Country}</p>
                      <p>{country.TotalConfirmed}</p>
                      <p>{country.TotalRecovered}</p>
                      <p>{country.TotalDeaths}</p>
                    </div>
                  );
                })}
              </div>
          </header>
        </div>
      );
    } else {
      return (
        <p>loading...</p>
      );
    }
  }
}

export default App;
