import React, { Component } from 'react'
import './Favourite.css'
import axios from 'axios'
import config from '../../config.json'
import ReactPaginate from 'react-paginate';
import SweetAlert from 'react-bootstrap-sweetalert'
import swal from 'sweetalert';
// import {
//     Card, CardImg, CardText, CardBody,
//     CardTitle, CardSubtitle, Button
// } from 'reactstrap';
export class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favAccList: [
                // {
                //     accountName: 'Mummy',
                //     IBANNumber: 'NS222211112222333345',
                //     bankName: 'Nairobi bank'
                // },
                // {
                //     accountName: 'Uncle',
                //     IBANNumber: 'SN44411112222333345',
                //     bankName: 'Denver Bank'
                // },
                // {
                //     accountName: 'Darsana',
                //     IBANNumber: 'SN44411117772333345',
                //     bankName: 'Moscow Bank'
                // },
                // {
                //     accountName: 'Deepthi',
                //     IBANNumber: 'SN44411117772333345',
                //     bankName: 'Tokio Bank'
                // },
                // {
                //     accountName: 'Abhijith',
                //     IBANNumber: 'SN44411117772333345',
                //     bankName: 'Nairobi Bank'
                // }
            ],
            pageCount: 0,
            pageNumber: 0,
            count: 0,
            pages: 1
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.nextPage =  this.nextPage.bind(this)
        this.prevPage =  this.prevPage.bind(this)
    }
    handleEdit = (e, data)=>{
        e.preventDefault();
        this.props.history.push({
            pathname: '/editAccount',
            state: {detail : data}
        })
    }
    componentDidMount() {
        let customerId= localStorage.getItem('customerId')
        axios.get(`${config.urlCharan}/${customerId}/favourite/5/${this.state.pageNumber}`)
            .then(res => {
                console.log("res inside comp did mount", res)
                this.setState({
                    favAccList: res.data.data,
                    count: res.data.count,
                    pages: Math.round((res.data.count)/5)
                }, () => {
                    console.log("pages", this.state.pages)
                });

            }).catch(err => {

            })
    }
    nextPage(){
        let pageNumber = this.state.pageNumber+1
        this.setState({
            pageNumber: pageNumber
            // favAccList: [ {
            //     accountName: 'Deepthi',
            //     IBANNumber: 'NS222211112222333345',
            //     bankName: 'Nairobi bank'
            // },
            // {
            //     accountName: 'Uncle',
            //     ibanumber: 'SN44411112222333345',
            //     bankName: 'Denver Bank'
            // },
            // {
            //     accountName: 'Darsana',
            //     ibannumber: 'SN44411117772333345',
            //     bankName: 'Moscow Bank'
            // },
            // {
            //     accountName: 'Deepthi',
            //     ibannumber: 'SN44411117772333345',
            //     bankName: 'Tokio Bank'
            // },
            // {
            //     accountName: 'Abhijith',
            //     ibannumber: 'SN44411117772333345',
            //     bankName: 'Nairobi Bank'
            // }]
        })
        console.log(this.state.pageNumber)
        if(this.state.pageNumber < this.state.pages){
            axios.get(`${config.url}/ING2651/favourite/5/${this.state.pageNumber}`)
            .then(res => {
                console.log("res inside comp did mount", res)
                this.setState({
                    favAccList: res.data.data
                }, () => {

                });

            }).catch(err => {

            })
        }
       

    }
    prevPage(){
        this.setState({
            pageNumber: this.state.pageNumber -1
        })
        if(this.state.pageNumber >=0){
            axios.get(`${config.url}/ING2651/favourite/5/${this.state.pageNumber}`)
            .then(res => {
                console.log("res inside comp did mount", res)
                this.setState({
                    favAccList: res.data.data
                }, () => {

                });

            }).catch(err => {

            })
        }
    }
    render() {
        return (
            // this.state.transactionStatement.map((each, index) => (
            //     <tr className="datarow" scope="row">
            //         <td> {each.transactionDate.slice(0,10)}</td>


            //     </tr>
            // ))
            <div>
                {this.state.favAccList.length > 0 ? (<div>
                    <h3 style={{ color: "orangered", marginTop: "1%", height:"1%" }}><button className="btn btn-warning" onClick={() => { this.props.history.push('/createAccount') }}> + Add Account</button></h3>
                    <div className="container">
                        <div className="row rowfav">
                            <div className="col-sm data">
                                <div class="card w-80">
                                    <div class="card-body">
                                        <h5 class="card-title"> {this.state.favAccList[0].accountName}</h5>
                                        <h5 class="card-text"> {this.state.favAccList[0].ibannumber}</h5>
                                        <p class="card-text"> {this.state.favAccList[0].bankName}</p>
                                        <a href="#" class="btn btn-warning" onClick={(e)=>{this.handleEdit(e,this.state.favAccList[0])}}>Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                        </a></a>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>


                            </div>
                            <div className="col-sm data">
                                <div className="card w-80">
                                    <div className="card-body">
                                        <h5 className="card-title"> {this.state.favAccList[1].accountName}</h5>
                                        <h5 className="card-text"> {this.state.favAccList[1].ibannumber}</h5>
                                        <p className="card-text"> {this.state.favAccList[1].bankName}</p>
                                        <a href="#" className="btn btn-warning"  onClick={(e)=>{this.handleEdit(e,this.state.favAccList[1])}}>Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                        </a></a>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm data">
                                <div class="card w-80">
                                    {
                                        this.state.favAccList[2]?(<div>
                                            <div class="card-body data">
                                        <h5 className="card-title"> {this.state.favAccList[2].accountName}</h5>
                                        <h5 className="card-text"> {this.state.favAccList[2].ibannumber}</h5>
                                        <p className="card-text"> {this.state.favAccList[2].bankName}</p>
                                        <a href="#" className="btn btn-warning"  onClick={(e)=>{this.handleEdit(e,this.state.favAccList[2])}}>Edit <a href="#">&nbsp;
                            <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                        </a></a>
                                    </div>

                                        </div>):(<div></div>)
                                    }
                                    
                                </div>
                            </div>

                        </div>
                        <div className="row rowfav">
                            <div className="col-sm-4 data">
                                {
                                      this.state.favAccList[3]?(
                                        <div class="card w-80">
                                        <div class="card-body">
                                            <h5 class="card-title"> {this.state.favAccList[3].accountName}</h5>
                                            <h5 class="card-text"> {this.state.favAccList[3].ibannumber}</h5>
                                            <p class="card-text"> {this.state.favAccList[3].bankName}</p>
                                            <a href="#" class="btn btn-warning"  onClick={(e)=>{this.handleEdit(e,this.state.favAccList[3])}}>Edit <a href="#">&nbsp;
                                <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                            </a></a>
                                        </div>
                                    </div>
                                      ):(<div></div>)
                                }
                                
                            </div>
                            <div className="col-sm-4 data">
                            {
                                this.state.favAccList[4]?( <div class="card w-80">
                                <div class="card-body">
                                    <h5 class="card-title"> {this.state.favAccList[4].accountName}</h5>
                                    <h5 class="card-text"> {this.state.favAccList[4].ibannumber}</h5>
                                    <p class="card-text"> {this.state.favAccList[4].bankName}</p>
                                    <a href="#" class="btn btn-warning"  onClick={(e)=>{this.handleEdit(e,this.state.favAccList[4])}}>Edit <a href="#">&nbsp;
                        <i className="fa fa-pencil" style={{ fontSize: "16px", float: "right", color: "orangered" }}></i>
                                    </a></a>
                                </div>
                            </div>):(<div></div>)
                            }
                               
                            </div>
                        </div>
                    </div >
                    {
                        this.state.pageNumber==0?(<div>
                            {/* <h3 style={{ color: "orangered", marginTop: "1%", marginLeft: "9%", float: "left" }}><button className="btn btn-primary" onClick={this.prevPage}> Prev Page</button></h3> */}
                            <h3 style={{ color: "orangered", marginTop: "1%", marginRight: "9%" , float: "right"}}><button className="btn btn-primary" onClick={this.nextPage}> Next Page</button></h3>

                            </div>): (<div>
                                <h3 style={{ color: "orangered", marginTop: "1%", marginLeft: "9%", float: "left" }}><button className="btn btn-primary" onClick={this.prevPage}> Prev Page</button></h3>
                                </div>)
                    }
                    
                     

                </div>) : (<div>
                    <h3 style={{ color: "orangered", marginTop: "1%" }}><button className="btn btn-warning" onClick={() => { this.props.history.push('/createAccount') }}> + Add Account</button></h3>
                </div>)}
                {/* <h3 style={{ color: "orangered", marginTop: "1%" }}><button className="btn btn-warning" onClick={}> Next</button></h3> */}
            </div>
        )
    }
}

export default Favourite
