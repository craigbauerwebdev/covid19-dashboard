import React, { Component } from 'react';
import Table from "./Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: null,
      covid19Summary: null
    };
  }

  componentDidMount() { 
      //this.callAPI();
      this.getCovid19Summary(); //fetches summary object
  }

  // Express Call
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
      .then( json => {
        // filter json to remove countries with no cases and duplicates
        let filteredSummary = json.Countries.sort(function(a,b){
              return a.TotalConfirmed - b.TotalConfirmed;
        }).filter(function(country, i) {
          if(
            country.Country !== 'Iran, Islamic Republic of' && 
            country.Country !== 'Russian Federation' &&
            country.TotalConfirmed > 0) {
              return country;
            } else if (country.Country !== 'Iran, Islamic Republic of') {
              return 'Iran';
            }
            return null;
        });
        filteredSummary.reverse();
        this.setState({
          covid19Summary: filteredSummary
        });
      })
  }

  getTotals(summary, type) {
    let 
      total = 0;
    summary.map(function(country, i) {
      if(type === "confirmed") {
        return country.TotalConfirmed;
      } else if (type === "recovered") {
        return country.TotalRecovered;
      } else if (type === "deaths") {
        return country.TotalDeaths;
      } else {
        return null;
      }
    }).map(function(item, i) {
      if(item !== undefined) {
        total = total + item;
      } 
      return null; 
    });
    return Number(total).toLocaleString();
  }

  render(){
    if(this.state.covid19Summary && this.state.covid19Summary !== ""){
      return (
        <div className="app">
          <header className="main-header">
            <img alt="covid19 Logo" className="app-logo" src="/images/covid19-logo.png" />
            <h1>COVID19 Dashboard</h1>
          </header>
            {this.state.apiResponse}
            <div className="top-meta">
              <div className="item">
                <h4>{this.getTotals(this.state.covid19Summary, 'confirmed')}</h4>
                <h4>Total Cases</h4>
              </div>
              <div className="item">
                <h4>{this.getTotals(this.state.covid19Summary, 'recovered')}</h4>
                <h4>Total Recovered</h4>
              </div>
              <div className="item">
                <h4>{this.getTotals(this.state.covid19Summary, 'deaths')}</h4>
                <h4>Total Deaths</h4>
              </div>
            </div>
            <Table data={this.state.covid19Summary} />
        </div>
      );
    } else {
      return (
        <div className="preloader">
          <img alt="covid19 Logo" className="app-logo" src="/images/covid19-logo.png" />
        </div>
      );
    }
  }
}
export default App;