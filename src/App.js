import React, {useEffect} from 'react';

import HomePage from './pages/homepage/homepage.component';

import {Route, Switch, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sing-up/sign-in-and-sing-up.component';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import './App.css';
import CheckoutPage from './pages/checkout/checkout.component';
import {checkUserSession} from './redux/user/user.actions';



const  App =({checkUserSession, currentUser})=> {
  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])


  // unsubscribeFromAuth = null;

  
  //   componentWillUnmount() {
  //     this.unsubscribeFromAuth();
    
  // }
  
  
    return (
      <div >
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route  path='/checkout' component={CheckoutPage}/>
        <Route  exact path='/signin' render={()=>currentUser ? (<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
      </Switch>
        
      </div>
    );
  }
  


const mapStatetoProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  
});

const mapDispatchToProps =dispatch=>({
  checkUserSession: ()=>dispatch(checkUserSession())
})



export default connect(mapStatetoProps, mapDispatchToProps )(App);
