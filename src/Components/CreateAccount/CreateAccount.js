import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { withTranslation } from 'react-i18next';
import './CreateAccount.css'
import config from '../../config.json'
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
// import validate from '../../Utils/Validator'

export class CreateAccount extends Component {
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
            loading: false
        }
        console.log("props of login constructor", this.props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    /* Function to handle change of input and to find bank name based on IBAN number from backend*/
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value }, () => {


            if (this.state.ibanNumber.length === 20) {
                let user = {
                    iban: this.state.ibanNumber
                }
                console.log("iban", this.state.ibanNumber)
                axios.post(`${config.ibanurl}/verify`, user)
                    .then(res => {
                        console.log("response", res)
                        if (res.data.bankName) {
                            this.setState({
                                bankName: res.data.bankName
                            })

                        }
                    }).catch(err => {
                        swal(`err.response.data.message`)
                    })
            }
        });

    }
    handleCancel = (e) => {
        document.getElementById("create").reset();
    }
    /* Function to handle submit button click*/
    handleSubmit = (e) => {

        e.preventDefault()
        let customerId = localStorage.getItem('customerId')
        this.validate().then((res) => {
            console.log("res", res)
            if (res) {
                const { accountName, ibanNumber, bankName } = this.state
                const account = {
                    accountName: accountName,
                    accountNumber: ibanNumber,
                    bankName: bankName,
                    customerId: customerId
                };
                this.setState({ loading: true }, () => {
                    this.getData(account).then((response) => {
                        this.setState({ loading: false })
                        if (response.status === 200 && response.data.status === "SUCCESS") {
                            swal(`Favourite account added succssfully`)

                            this.props.history.push({
                                pathname: '/favouriteAccounts',
                                search: '?query=dashboard',
                                //state:{data: response.data}
                            })
                        }
                    }).catch(err => {
                        this.setState({ loading: false })
                        swal(`Error in adding account ${err.response.data.message}`)
                    });
                });
            }
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
            if (pattern.test(this.state.accountName)) {

            } else {
                isValid = false
                errors.acccountNameError = "Account name accepts only alpha numeric and '/-"
            }
            if(this.state.ibanNumber.length ===20){

            } else {
                isValid=false
                errors.ibanNumberError = "IBAN number should be 20 digits"
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
                        <h2 style={{ marginLeft: "-5%", marginTop: "1%", color: "orangered" }}>Add Favourite Account</h2>
                        
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
                                        disabled />
                                </div>
                            </div>
                            <br></br>
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-2">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button id="savebutton" onClick={this.handleSubmit} type="button" class="btn btn-primary">Save</button>
                                        <button id="cancelbutton" onClick={this.handleCancel} type="button" style={{ marginLeft: "2%" }} class="btn btn-secondary">Cancel</button>
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
export default CreateAccount