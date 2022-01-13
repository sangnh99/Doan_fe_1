import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./cssConfig/login.css";

import AuthService from "./services/auth.service";
import 'antd/dist/antd.css';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import { Menu, Dropdown, Button, Space, Badge, Modal, List, Avatar, InputNumber } from 'antd';
import { DownOutlined, DollarCircleOutlined } from '@ant-design/icons';
import ValidateRegister from "./components/validate-register";
import "./cssConfig/footer.css";
import Footer from "./components/footer";
import MenuPage from "./components/menupage/menu-page";
import MenuCategory from "./components/menupage/menu-category";
import FoodDetail from "./components/food-detail/food-detail";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Store from "./components/store/store";
import UserManager from "./components/user-profile/user-manager";
import { CartProvider, CartContext } from './contexts/cart-context';
import { ShoppingCartOutlined } from '@ant-design/icons';
import userService from "./services/user.service";
import SearchBar from "./components/search/search-bar";
import TestGoogleMapAutoComplete from "./components/test-ggmap/test-ggmap-autocomplete";
import AddAddressNewUser from "./components/test-ggmap/add-address-new-user";
import PaymentPage from "./components/payment/payment-page";
import PaypalPage from "./components/paypal/paypal-page";
import HandlePaypal from "./components/paypal/handle-paypal";
import SharePost from "./components/facebook/share-post";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import logo512 from "./static/logo512.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      visible: false,
      confirmModalVisible: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        ...this.state,
        currentUser: user
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }


  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );


    return (
      <HelmetProvider>
        <CartProvider>

          <div>
            <Helmet>
              <meta property="og:title" content="SangOrder Web" />
              <meta property="og:site_name" content="http://sang-delivery-fe.herokuapp.com" />
              <meta property="og:description" content="Web đặc thức ăn nhanh chóng, tiện lợi" />
              <meta property="og:image" content="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" />
              <meta property="og:image:secure_url" content="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" />
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:image:width" content="400" />
              <meta property="og:image:height" content="300" />
            </Helmet>
            <Router>

              <nav className="navbar navbar-expand navbar-light" style={{ backgroundColor: "#87e8de" }}>
                <Link to={"/"} className="navbar-brand">
                  SangOrder
                </Link>
                <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/menu"} className="nav-link">
                      Menu
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/search"} className="nav-link">
                      Tìm kiếm
                    </Link>
                  </li>


                  {showModeratorBoard && (
                    <li className="nav-item">
                      <Link to={"/mod"} className="nav-link">
                        Moderator Board
                      </Link>
                    </li>
                  )}

                  {showAdminBoard && (
                    <li className="nav-item">
                      <Link to={"/admin"} className="nav-link">
                        Admin Board
                      </Link>
                    </li>
                  )}

                  {/* {currentUser && (
                <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                User
                </Link>
                </li>
              )} */}
                </div>

                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/user"} className="nav-link">
                        {currentUser.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        Đăng xuất
                      </a>
                    </li>
                    <li className="nav-item">
                      <CartContext.Consumer>
                        {({ amount, cartItems, addToCart, totalPrice }) => (
                          <div>
                            <Badge count={amount} showZero="true">
                              {/* {
                              JSON.stringify(cartItems)
                            } */}
                              <ShoppingCartOutlined style={{ fontSize: "30px" }} onClick={() => this.setState(
                                {
                                  ...this.state,
                                  visible: !this.state.visible
                                }
                              )} />
                            </Badge>
                            <Modal
                              title="Giỏ hàng của bạn"
                              centered
                              visible={this.state.visible}

                              footer={[
                                <div>
                                  <Button onClick={() => {
                                    this.setState(
                                      {
                                        ...this.state,
                                        visible: false
                                      }
                                    );

                                  }} style={{ marginRight: 7 }}>
                                    Đóng
                                  </Button>
                                  <Link to={"/payment"}> <Button type="primary" icon={<DollarCircleOutlined style={{ fontSize: 20, marginBottom: 5 }} />} style={{ backgroundColor: "#52c41a" }} onClick={() => {
                                    this.setState(
                                      {
                                        ...this.state,
                                        visible: false
                                      }
                                    );

                                  }}>
                                    Mua hàng
                                  </Button></Link>
                                </div>
                              ]}

                              //   onOk={() => {this.setState(
                              //     {
                              //       ...this.state,
                              //       visible : false
                              //     }
                              //   )

                              //   }
                              // }
                              onCancel={() => this.setState(
                                {
                                  ...this.state,
                                  visible: false
                                }
                              )}
                              width={600}
                            >
                              <List
                                itemLayout="horizontal"
                                dataSource={cartItems}
                                renderItem={item => (
                                  <Badge.Ribbon text={(item.amount * item.price).toLocaleString() + "đ"} color={"Red"}>

                                    <List.Item>
                                      <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href="https://ant.design">{item.food_name}  {item.note != "" ? " - " + item.note : " "}</a>}
                                        description={item.store_name}
                                      />
                                      <span style={{ marginRight: 50 }}>  Số lượng :  <InputNumber value={item.amount} onChange={(value) => {
                                        addToCart(item, value - item.amount);
                                      }} /></span>
                                    </List.Item>
                                  </Badge.Ribbon>
                                )}
                              />,
                              <div style={{ marginLeft: 210 }}>Tổng tiền : {
                                cartItems.length != 0 && (cartItems.reduce((tota, item) => {
                                  return parseInt(tota + item.amount * item.price)
                                }, 0)).toLocaleString() + "đ"
                              }
                              </div>
                            </Modal>
                          </div>
                        )}
                      </CartContext.Consumer>
                    </li>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
                )}
              </nav>

              <div>
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  {/* <Route path="/user" component={BoardUser} /> */}
                  <Route path="/mod" component={BoardModerator} />
                  <Route path="/admin" component={BoardAdmin} />
                  <Route path="/validate-register" component={ValidateRegister} />
                  <Route exact path="/menu" component={MenuPage} />
                  <Route path="/menu/:category" component={MenuCategory} />
                  <Route path="/food/:id" component={FoodDetail} />
                  <Route path="/store/:id" component={Store} />
                  <Route path="/user" component={UserManager} />
                  <Route path="/search" component={SearchBar} />
                  <Route path="/add-address-new-user" component={AddAddressNewUser} />
                  <Route path="/payment" component={PaymentPage} />
                  <Route path="/paypal" component={PaypalPage} />
                  <Route path="/handle-paypal" component={HandlePaypal} />
                  <Route path="/share" component={SharePost} />
                </Switch>
              </div>

              { /*<AuthVerify logOut={this.logOut}/> */}
            </Router>
            <Footer />
          </div>
        </CartProvider>
      </HelmetProvider>
    );
  }
}

export default App;
