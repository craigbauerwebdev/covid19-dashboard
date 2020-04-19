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

  hideChart = () => {
    console.log('closeChart');
    this.setState({
      visible: false
    });
  }

  render(){
    const { data } = this.props;
    //Number(total).toLocaleString();
    return (
      <React.Fragment>
        <div className="row clearfix">
          <p className="country">{data.Country}</p>
          <p className="confirmed">{Number(data.TotalConfirmed).toLocaleString()}</p>
          <p className="recovered">{Number(data.TotalRecovered).toLocaleString()}</p>
          <p className="deaths">{Number(data.TotalDeaths).toLocaleString()}</p>
          <p className="details" onClick={this.showChart}>Details</p>
          {this.state.visible &&
            <React.Fragment>
              <Chart data={this.props.data.Slug} visibility={this.state.visible} />
              <div className="close-chart" onClick={this.hideChart}>Close Chart</div>
            </React.Fragment>
          }   
        </div>
      </React.Fragment>
    );
  }
}
export default TableRow;