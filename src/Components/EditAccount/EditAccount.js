import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { withTranslation } from 'react-i18next';
import './EditAccount.css'
import config from '../../config.json'
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
// import validate from '../../Utils/Validator'

export class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: '',
            accountNameError: '',
            ibanNumber: '',
            ibanNumberError: '',
            bankName: '',
            bankNameError: '',
            isValid: false,
            alert: null,
            loading: false,
            createdOn: ''
        }
        console.log("props of login constructor", this.props)
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    componentDidMount(){
        console.log(this.props.location.state.detail)
        if(this.props.location.state.detail){
            let {accountName, ibannumber, bankName, date} = this.props.location.state.detail
            this.setState({
                accountName: accountName,
                bankName: bankName,
                ibanNumber: ibannumber,
                createdOn: date
                
            })
        }
    }
    /* Function to handle change of input and to find bank name based on IBAN number from backend*/
    handleChange = (e) => {
        this.setState({
            ibanNumberError:'',
            acccountNameError:''
        })
        this.setState({ [e.target.id]: e.target.value }, () => {
            if (this.state.ibanNumber.length === 20) {

                let user = {
                    iban: this.state.ibanNumber
                }
                console.log("iban", this.state.ibanNumber)
                if (this.state.ibanNumber.slice(0,1).match(/^[A-Z]*$/)) {
                    axios.post(`${config.ibanurl}/verify`, user)
                    .then(res => {
                        console.log("response", res)
                        if (res.data.bankName) {
                            this.setState({
                                bankName: res.data.bankName
                            })

                        }
                    }).catch(err => {
                        swal(` ${err.response.data.message}`)
                    })
                } else {

                    this.setState(
                        {
                            isValid: false,
                            ibanNumberError : "First 2 characters of IBAN number should be an alphabet"
                        }
                    )
                }
                
            }
        });

    }
    /* Function to handle cancel button click*/
    handleCancel = (e) => {
        document.getElementById("create").reset();
    }

    /* Function to handle edit button click*/
    handleEdit = (e) => {
        e.preventDefault()
        console.log("Inside handle edit")
        let customerId = localStorage.getItem('customerId')
        this.validate().then((res) => {
            console.log("res inside edit", res)
                const { ibanNumber,bankName, accountName , createdOn} = this.state
                const account = {
                    ibannumber: ibanNumber,
                    accountName: accountName,
                    bankName: bankName,
                    createdOn: createdOn,
                    accountId: customerId
                };
                this.setState({ loading: true }, () => {
                    axios.put(`${config.url}/accounts`, account)
                    .then(res => {
                        this.setState({ loading: false })
                            if (res.status === 200 ) {
                                swal(`Favourite account edited successfully`)
                                this.props.history.push({
                                    pathname: '/favouriteAccounts',
                                    //state:{data: response.data}
                                })
                            }
                    }).catch(err => {
                        swal(`${err.response.data.message}`)
                    })
                });
            
        });
    }   
    /* Function to handle delete button click*/
    handleDelete = (e) => {
        e.preventDefault()
        console.log("Inside handle Delete")
        let customerId = localStorage.getItem('customerId')
                const { ibanNumber } = this.state
              
                this.setState({ loading: true }, () => {
                    axios.delete(`${config.url}/accounts/${customerId}/${ibanNumber}`)
                    .then(res => {
                        this.setState({ loading: false })
                            if (res.status === 200 ) {
                                swal(`Favourite account deleted successfully`)
                                this.props.history.push({
                                    pathname: '/favouriteAccounts',
                                    //state:{data: response.data}
                                })
                            }
                    }).catch(err => {
                        swal(`${err.response.data.message}`)
                    })
           
        });
    }

    /* Function for ajax call for login*/
    getData = (user) => {
        return new Promise((resolve, reject) => {
            axios.post(`${config.url}/accounts`, user)
                .then(res => {
                    return resolve(res)
                }).catch(err => {
                    return reject(err)
                })
        });

    }
    validate() {
        return new Promise((resolve, reject) => {
            // console.log("Inside validate", this.state)
            let isValid = true;
            const errors = {
                accountNameError: '',
                ibanNumberError: ''
            }

            let pattern = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');
            console.log("patterntest", pattern.test(this.state.accountName))
           
            // if (this.state.ibanNumber.length === 20) {

            // } else {
            //     isValid = false
            //     errors.ibanNumberError = "IBAN number should be 20 digits"
            // }

            if (this.state.accountName.length <1 ) {

            } else {
                isValid = false
                errors.accountNameError= "Account Name is mandatory"
            }

            this.setState({
                ...this.state,
                ...errors
            })
            console.log("isValid inside validate", isValid)
            return resolve(isValid);

        })
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                {loading ? <LoadingSpinner /> : (
                    <div className="container">
                        <h2 style={{ marginLeft: "-5%", marginTop: "1%", color: "orangered" }}>Edit Favourite Account</h2>

                        <form id="create" style={{ marginLeft: '30%', marginTop: "5%", textAlign: "left" }} >
                            <span className="text-danger " ><small>{this.state.ibanNumberError}</small></span>
                            <span className="text-danger " ><small>{this.state.acccountNameError}</small></span>
                            <div className="form-group row">
                                <label htmlFor="accountName" className="col-sm-3 col-form-label " >Account Name</label>
                                <div className="col-sm-4" >
                                    <input
                                        type="accountName"
                                        className="form-control"
                                        id="accountName"
                                        placeholder="Enter account name"
                                        value={this.state.accountName}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="ibanNumber" className="col-sm-3 col-form-label " >IBAN Number</label>
                                <div className="col-sm-4" >
                                    <input
                                        type="ibanNumber"
                                        className="form-control"
                                        id="ibanNumber"
                                        placeholder="Enter IBAN number"
                                        value={this.state.ibanNumber}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="bankName" className="col-sm-3 col-form-label " >Bank Name</label>
                                <div className="col-sm-4" >
                                    <input
                                        type="bankName"
                                        className="form-control"
                                        id="bankName"
                                        value={this.state.bankName}
                                        onChange={this.handleChange}
                                        disabled
                                         />
                                </div>
                            </div>
                            <br></br>
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button id="savebutton" onClick={this.handleEdit} type="button" class="btn btn-primary">Save</button>
                                        <button id="deletebutton" onClick={this.handleDelete} type="button" style={{ marginLeft: "2%" }} className="btn btn-primary">Delete</button>
                                        <button id="cancelbutton" onClick={this.handleCancel} type="button" style={{ marginLeft: "2%" }} className="btn btn-secondary">Cancel</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                )
                }

            </div>
        )
    }
}
//export default Login
// export default withRouter(Login)
export default EditAccount