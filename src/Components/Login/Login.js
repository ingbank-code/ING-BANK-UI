import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { withTranslation } from 'react-i18next';
import './Login.css'
import config from '../../config.json'
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
// import validate from '../../Utils/Validator'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            customerIdError: '',
            isValid: false,
            alert: null,
            loading: false
        }
        console.log("props of login constructor", this.props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

     /* Function to handle change of input*/
    handleChange = (e)=> {
        this.setState({ [e.target.id]: e.target.value }, () => {
        });

    }

    /* Function to handle submit button click*/
    handleSubmit=(e)=> {
        e.preventDefault()
        this.validate().then((res) => {
            console.log("res", res)
            if (res) {
                const { customerId} = this.state
                const user = {
                    customerId: customerId
                };
                console.log(this.props)
                this.setState({ loading: true }, () => {
                    this.getData(user).then((response) => {
                        this.setState({ loading: false })
                        if (response.status === 200 && response.data.status === "SUCCESS") {
                            this.props.validateUser(true);
                            localStorage.setItem("customerId", this.state.customerId)
                            this.props.history.push({
                                pathname: '/favouriteAccounts',
                            })
                        }
                    }).catch(err => {
                        this.setState({ loading: false })
                        swal(`Error in login ${err.response.data.message}`)
                    });
                });
            }
        });
    }

    /* Function for ajax call for acc account*/
    getData = (user)=> {
        return new Promise((resolve, reject) => {
            axios.post(`${config.url}/login`, user)
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
                customerIdError: ''
            }

            if (this.state.customerId === '') {
                isValid = false;
                errors.customerIdError = "customerId should not be empty"
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
        let { t } = this.props
        const { loading } = this.state;
        return (
            <div>
                {loading ? <LoadingSpinner /> : (
                    <div className="container">
                        <h2 style={{ marginLeft: "-5%", marginTop: "1%", color: "orangered" }}>{t('loginTitle')}</h2>
                        {/* <h2 style={{ marginLeft: "-5%", marginTop: "1%", color: "orangered" }}>Login</h2> */}
                        <form style={{ marginLeft: '30%', marginTop: "5%", textAlign: "left" }} >
                            <span className="text-danger " ><small>{this.state.customerIdError}</small></span>
                            <br></br>
                            <div className="form-group row">
                                <label htmlFor="customerId" className="col-sm-2 col-form-label " >{t('customerId')}</label>
                                {/* <label htmlFor="customerId" className="col-sm-2 col-form-label " > <span style={{color: "red"}}>**</span>Customer ID </label> */}
                                <div className="col-sm-4" >
                                    <input
                                        type="customerId"
                                        className="form-control"
                                        id="customerId"
                                        placeholder="Enter customer ID"
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <br></br>
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-2">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{t('loginTitle')}</button>
                                    {/* <button  id="submit" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button> */}
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
export default withTranslation()(withRouter(Login));