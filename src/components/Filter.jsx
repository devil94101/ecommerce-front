 import React, { Component } from 'react'
 
 export class Filter extends Component {
     render() {
         return (
             <div className="filter">
                <div className="filter-result">
                    {this.props.count} Products    
                </div>
                <div className="filter-sort">
                        Order
                        <select  onChange={this.props.sortProducts}>
                            <option>Latest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                        </select>
                    </div>
                    <div className="filter-sort">
                        Categories
                        <select  onChange={this.props.category}>
                            <option value="Laptops">Laptops</option>
                            <option value="leds">TVs</option>
                            <option value="Fridges">Fridges</option>
                            <option value="mobiles"> Moblies</option>
                            <option value="Air Conditioner">Ac</option>
                        </select>
                    </div>
             </div>
         )
     }
 }
 
 export default Filter
 