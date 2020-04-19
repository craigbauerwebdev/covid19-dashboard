import React, { Component } from 'react';
import TableRow from "./TableRow";
//import logo from './logo.svg';

class Table extends Component {
  
  render(){
    const { data } = this.props;
    return (
      <div className="main-table">
        <header className="clearfix">
          <h3>Country</h3>
          <h3 className="stats">Confirmed</h3>
          <h3 className="stats">Recovered</h3>
          <h3 className="stats">Deaths</h3>
        </header>
        {data.map(function(country, i) {
          return(
            <TableRow key={i} data={country} />
          );
        })}
      </div>
    );
  }
}
export default Table;