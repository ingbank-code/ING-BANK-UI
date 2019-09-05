import React, { Component } from 'react'
import './Favourite.css'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
export class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favAccList: [
                {
                    accountName: 'Mummy',
                    IBANNumber: 'NS222211112222333345',
                    bankName: 'Nairobi bank'
                },
                {
                    accountName: 'Uncle',
                    IBANNumber: 'SN44411112222333345',
                    bankName: 'Denver Bank'
                },
                {
                    accountName: 'Darsana',
                    IBANNumber: 'SN44411117772333345',
                    bankName: 'Moscow Bank'
                },
                {
                    accountName: 'Deepthi',
                    IBANNumber: 'SN44411117772333345',
                    bankName: 'Tokio Bank'
                },
                {
                    accountName: 'Abhijith',
                    IBANNumber: 'SN44411117772333345',
                    bankName: 'Nairobi Bank'
                }
            ]
        }
    }
    render() {
        return (
            // this.state.transactionStatement.map((each, index) => (
            //     <tr className="datarow" scope="row">
            //         <td> {each.transactionDate.slice(0,10)}</td>


            //     </tr>
            // ))
            <div className="container">
                <div className="row rowfav">
                    <div className="col-sm data">
                        <div class="card w-75">
                            <div class="card-body">
                                <h5 class="card-title"> {this.state.favAccList[1].accountName}</h5>
                                <h5 class="card-text"> {this.state.favAccList[1].IBANNumber}</h5>
                                <p class="card-text"> {this.state.favAccList[1].bankName}</p>
                                <a href="#" class="btn btn-primary">Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                </a></a>
                            </div>
                        </div>
                        <br></br>
                        <br></br>


                    </div>
                    <div className="col-sm data">
                        <div className="card w-75">
                            <div className="card-body">
                                <h5 className="card-title"> {this.state.favAccList[1].accountName}</h5>
                                <h5 className="card-text"> {this.state.favAccList[1].IBANNumber}</h5>
                                <p class="card-text"> {this.state.favAccList[1].bankName}</p>
                                <a href="#" class="btn btn-primary">Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                </a></a>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm data">
                    <div class="card w-75">
                            <div class="card-body data">
                            <h5 className="card-title"> {this.state.favAccList[1].accountName}</h5>
                            <h5 className="card-text"> {this.state.favAccList[1].IBANNumber}</h5>
                            <p className="card-text"> {this.state.favAccList[1].bankName}</p>
                            <a href="#" className="btn btn-primary">Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                        </a></a>
                        </div>
                    </div>
                    </div>

                </div>
                <div className="row rowfav">
                    <div className="col-sm-4 data">
                    <div class="card w-75">
                            <div class="card-body">
                            <h5 class="card-title"> {this.state.favAccList[1].accountName}</h5>
                            <h5 class="card-text"> {this.state.favAccList[1].IBANNumber}</h5>
                            <p class="card-text"> {this.state.favAccList[1].bankName}</p>
                            <a href="#" class="btn btn-primary">Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                        </a></a>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-4 data">
                    <div class="card w-75">
                            <div class="card-body">
                            <h5 class="card-title"> {this.state.favAccList[4].accountName}</h5>
                            <h5 class="card-text"> {this.state.favAccList[4].IBANNumber}</h5>
                            <p class="card-text"> {this.state.favAccList[4].bankName}</p>
                            <a href="#" class="btn btn-primary">Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                        </a></a>
                        </div>
                    </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Favourite
