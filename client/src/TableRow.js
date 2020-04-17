import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


const data2 = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
];

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
      }))
      .then( res => {
          this.convertData(res);
        }
      );
  }

  convertData(data) {
    console.log(data);
  }

  render(){
    const { data } = this.props;
    
    return (
      <div className="row clearfix">
        <p>{data.Country}</p>
        <p>{data.TotalConfirmed}</p>
        <p>{data.TotalRecovered}</p>
        <p>{data.TotalDeaths}</p>
        <AreaChart
          width={800}
          height={400}
          data={data2}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" /><YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='uv'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
        <hr />
      </div>
    );
  }
}
export default TableRow;