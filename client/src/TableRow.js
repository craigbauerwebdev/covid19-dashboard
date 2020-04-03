import React, { Component } from 'react';

class TableRow extends Component {

  render(){
    const { data } = this.props;
    return (
      <div className="row clearfix">
        <p>{data.Country}</p>
        <p>{data.TotalConfirmed}</p>
        <p>{data.TotalRecovered}</p>
        <p>{data.TotalDeaths}</p>
        <hr />
      </div>
    );
  }
}
export default TableRow;