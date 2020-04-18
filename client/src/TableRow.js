import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentCountry: '',
      showChart: true
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
      /*.then(
        res => this.setState({
          currentCountry: res
      }))*/
      .then( res => this.convertData(res)
      );
  }

  convertData(data) {
    console.log(data);
    let newData = data.map(function(day, index) {
      const newDate = day.Date;
      return {
        date: index,//newDate,
        uv: day.Cases,
        pv: 2400,
        amt: 2400
      }
    });
    this.setState({
      currentCountry: newData
    })
    //console.log("Data: ", date);
  }

  render(){
    const { data } = this.props;
    
    return (
      <div className="row clearfix">
        <p>{data.Country}</p>
        <p>{data.TotalConfirmed}</p>
        <p>{data.TotalRecovered}</p>
        <p>{data.TotalDeaths}</p>
        {this.state.showChart &&
          <AreaChart
            width={1200}
            height={400}
            data={this.state.currentCountry}
            margin={{ top: 10, right: 30, left: 34, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" /><YAxis />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='uv'
              stroke='#475875'
              fill='#475875'
            />
          </AreaChart>
        }
      </div>
    );
  }
}
export default TableRow;