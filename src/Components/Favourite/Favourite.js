import React, { Component } from 'react'
import './Favourite.css'
export class Favourite extends Component {
    render() {
        return (
            <div className="container">
                <div className="row rowfav">
                    <div className="col-sm data">col-sm</div>
                    <div className="col-sm data">col-sm</div>
                    <div className="col-sm data">col-sm</div>

                </div>
                <div className="row rowfav">
                    <div className="col-sm-8 data">
                        <div style={{backgroundColor: "blue"}}>
                        col-sm-8
                        </div>
                       
                    </div>
                    <div className="col-sm-4 data">col-sm-4</div>
                    
                </div>
            </div>
        )
    }
}

export default Favourite
