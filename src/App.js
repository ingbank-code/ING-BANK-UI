import React, { Component } from 'react';
import './App.css';
import { withTranslation } from 'react-i18next';
import { withRouter, HashRouter, Switch, Route } from 'react-router-dom'
import Favourite from './Components/Favourite/Favourite';
import Header from './Components/Header/Header'
import Login from './Components/Login/Login';
import CreateAccount from './Components/CreateAccount/CreateAccount';
// import Charts from './Components/Recharts/Recharts';
// import Home from './Components/Home/Home';
// import Logout from './Components/Logout/Logout';


class App extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;
    i18n.changeLanguage('en');
    this.state = {
      isLoggedIn: false,
      data: {}
    }
  }
  redirect = (page, history) => {
    history.push(page);
  }

  validateUser = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  }
  getuserData = (data, props) => {
    this.setState({ data });
    console.log(data);
  }
  logout() {
    this.validateUser(false)
  }
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Header isLoggedIn={this.state.isLoggedIn} redirect={this.redirect} />
          <Switch>
               <Route path='/login' component={() => <Login validateUser={this.validateUser} />}></Route>
               <Route path='/' exact component={() => <Login validateUser={this.validateUser} />}></Route>
               <Route path='/favouriteAccounts' exact component={Favourite} />
               <Route path='/createAccount' exact component={CreateAccount} />

            {/* <Route path='/logout' component={() => <Logout validateUser={this.validateUser} />}></Route>
            <Route path='/register' exact component={Register} />
            <Route path='/charts' exact component={Charts} />
            <Route path='/home' exact component={Home} />
            <Route path='/login' component={() => <Login validateUser={this.validateUser} />}></Route> */}

          </Switch>
        </HashRouter>
      </div>
    );

  }

}

//export default App
 export default withTranslation()(App);
