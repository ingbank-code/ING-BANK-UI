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
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
        });

    }

    handleSubmit(e) {
        e.preventDefault()
        this.validate().then((res) => {
            console.log("res", res)
            if (res) {
                const { customerId} = this.state
                const user = {
                    customerId: customerId
                };
                console.log(this.props)
                // localStorage.setItem("userId", '1234')
                //  this.props.validateUser(true);
                //  this.props.history.push('/home')
                this.setState({ loading: true }, () => {
                    this.getData(user).then((response) => {
                        this.setState({ loading: false })
                        if (response.status === 200 && response.data.status === "SUCCESS") {
                            this.props.validateUser(true);
                            localStorage.setItem("userId", response.data.userId)
                            this.props.history.push({
                                pathname: '/admindashboard',
                                search: '?query=dashboard',
                                //state:{data: response.data}
                                state: { data: response.data.roleId }
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

    getData(user) {
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
            // const errors = {
            //     customerIdError: '',
            //     passwordError: ''
            // }

            // if (this.state.customerId.indexOf('@') !== -1) {
            //     if (this.state.password.length > 4) {
            //         isValid = true;
            //     } else {
            //         isValid = false;
            //         errors.passwordError = 'Password should be more than 4 characters'
            //     }
            // } else {
            //     isValid = false;
            //     errors.customerIdError = 'customerId Id should be in proper format'
            // }
            // if (this.state.customerId === '' || this.state.password === '') {
            //     isValid = false;
            //     errors.customerIdError = "customerId and password are mandatory fields."
            // }

            // this.setState({
            //     ...this.state,
            //     ...errors
            // })
            // console.log("isValid inside validate", isValid)
            return resolve(isValid);

        })
    }
    render() {
        // let { t } = this.props
        const { loading } = this.state;
        return (
            <div>
                {loading ? <LoadingSpinner /> : (
                    <div className="container">
                        {/* <h2 style={{ marginLeft: "-5%", marginTop: "1%", color: "orangered" }}>{t('loginTitle')}</h2> */}
                        <h2 style={{ marginLeft: "-5%", marginTop: "1%", color: "orangered" }}>Login</h2>
                        <form style={{ marginLeft: '30%', marginTop: "5%", textAlign: "left" }} >
                            <span className="text-danger " ><small>{this.state.customerIdError}</small></span>
                            <br></br>
                            <div className="form-group row">
                                {/* <label htmlFor="customerId" className="col-sm-2 col-form-label " >{t('customerId')}</label> */}
                                <label htmlFor="customerId" className="col-sm-2 col-form-label " >Customer ID</label>
                                <div className="col-sm-4" >
                                    <input
                                        type="customerId"
                                        className="form-control"
                                        id="customerId"
                                        placeholder="Enter customer ID"
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-sm-4 offset-sm-2">
                                    {/* <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{t('loginTitle')}</button> */}
                                    <button  id="submit" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
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
export default Login
// export default withRouter(Login)
// export default withTranslation()(withRouter(Login));