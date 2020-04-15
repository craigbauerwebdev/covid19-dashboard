import React, { Component } from 'react';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentCountry: ''
    };
  }

  componentDidMount() {
    this.getCovid19CountryData(this.props.data.Slug, 'confirmed');
  }

  //Get data for each country on demand
  getCovid19CountryData( country, status) {
    const countryData = `https://api.covid19api.com/total/country/${country}/status/${status}`;
    fetch(countryData)
      .then(res => res.json())
      .then(
        res => this.setState({
          currentCountry: res
      }));
  }

  render(){
    const { data } = this.props;
    
    return (
      <div className="row clearfix">
        <p>{data.Country}</p>
        <p>{data.TotalConfirmed}</p>
        <p>{data.TotalRecovered}</p>
        <p>{data.TotalDeaths}</p>
        <div>Show chart here</div>
        <hr />
      </div>
    );
  }
}
export default TableRow;