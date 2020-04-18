import React, { Component } from 'react';
import Chart from './Chart';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showChart: true,
      visible: false
    };
  }

  showChart = () => {
    console.log('open');
    //update state on click to render chart component
    this.setState({
      visible: true
    });
  }

  render(){
    const { data } = this.props;
    
    return (
      <React.Fragment>
        <div className="row clearfix">
          <p onClick={this.showChart}>{data.Country}</p>
          <p>{data.TotalConfirmed}</p>
          <p>{data.TotalRecovered}</p>
          <p>{data.TotalDeaths}</p>
          {this.state.visible &&
            <Chart data={this.props.data.Slug} visibility={this.state.visible} />
          }   
        </div>
      </React.Fragment>
    );
  }
}
export default TableRow;