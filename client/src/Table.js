import React, { Component } from 'react';
import TableRow from "./TableRow";
//import logo from './logo.svg';

class Table extends Component {
  
  render(){
    const { data } = this.props;
    return (
      <div className="main-table">
        <header>
          <h3>Country</h3>
          <h3>Confirmed</h3>
          <h3>Recovered</h3>
          <h3>Deaths</h3>
          <hr />
        </header>
        {data.map(function(country, i) {
          return(
            <TableRow data={country} />
          );
        })}
      </div>
    );
  }
}
export default Table;