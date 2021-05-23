import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div>
          <Link className="brand" to="/">
            <img className="header_logo" src="/images/KakaoTalk_20210404_171431185.png" alt="HeaderLogo"/>
          </Link>
        </div>

        <div className="header_search">
                   <input className="header_searchInput" type="text" ></input>          
        </div>

        <div>
            <div className="header_nav">
               <div className='header_option'>
               <span className='header_optionLine1'>
                       <Link to="sell.html"><img className="sell_logo" src="/images/KakaoTalk_20210404_181730390.png" alt="SellLogo"/></Link>
                   </span>
                   <span className='header_optionLine2'>
                       Sell Product
                   </span>
               </div>

               <div className='header_option'>
               <span className='header_optionLine1'>
                        <Link to="chat.html"><img className="chat_logo" src="/images/KakaoTalk_20210404_183949748.png" alt="ChatLogo"/></Link>
                   </span>
                   <span className='header_optionLine2'>
                           Chat
                       </span>
               </div>
               <div className='header_option'>
                <span className='header_optionLine1'>
                {
                       userInfo ? <Link to="/profile"><img className="account_logo" src="/images/KakaoTalk_20210404_191931497.png" alt="AccountLogo"/></Link>:
                          <Link to="/signin"><img className="account_logo" src="/images/KakaoTalk_20210404_191931497.png" alt="AccountLogo"/></Link>

                   }
                </span>
                <span className='header_optionLine2'>
                  {userInfo ? (
                    <div className="dropdown">
                      <Link to="#">
                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/profile">User Profile</Link>
                        </li>
                        <li>
                          <Link to="/orderhistory">History</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Sign In</Link>
                  )}
                              {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
                </span>

               </div>
               
            </div>
        </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
        <AdminRoute
            path="/productlist"
            component={ProductListScreen}
        ></AdminRoute>
        <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
        ></Route>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;