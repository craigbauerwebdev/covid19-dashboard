import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountry: null,
            showChart: false,
            countryData: null
        };
    }

    componentDidMount() {
        this.getCovid19CountryData(this.props.data, 'confirmed');
    }

    //Get data for each country on demand
    getCovid19CountryData( country, status) {
        const countryData = `https://api.covid19api.com/total/country/${country}/status/${status}`;
        fetch(countryData)
        .then(res => res.json())
        .then( res => this.convertData(res));
    }

    convertData(data) {
        //console.log(data);
        let newData = data.map(function(day, index) {
          const newDate = day.Date; //conver date into something to display
          return {
            date: index,//newDate,
            cases: day.Cases//,
            //pv: 2400,
            //amt: 2400
          }
        });
        this.setState({
          countryData: newData
        })
      }

    render(){
        const 
            { visibility } = this.props,
            chartWidth = 1000;
        if(this.state.countryData && visibility) {
            return (
                <AreaChart
                    width={chartWidth}
                    height={400}
                    data={this.state.countryData}
                    margin={{ top: 10, right: 30, left: 34, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" /><YAxis />
                    <Tooltip />
                    <Area
                    type='monotone'
                    dataKey='cases'
                    stroke='#475875'
                    fill='#475875'
                    />
                </AreaChart>
            );
        } else {
            return <p>loading...</p>;
        }
    }
}
export default Chart;