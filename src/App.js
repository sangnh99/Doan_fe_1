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
import { Menu, Dropdown, Button, Space, Badge, Modal, List, Avatar, InputNumber} from 'antd';
import { DownOutlined } from '@ant-design/icons';
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

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      visible: false,
      confirmModalVisible : false
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
      <CartProvider>

        <div>
          <Router>
            <nav className="navbar navbar-expand navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
              <Link to={"/"} className="navbar-brand">
                bezKoder
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

                <li className="nav-item" style={{ marginTop: "8px", marginLeft: "7px", fontSize: "16px" }}>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      Hover me <DownOutlined />
                    </a>
                  </Dropdown>
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
                      LogOut
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
                                visible : !this.state.visible
                              }
                            )}/>
                          </Badge>
                          <Modal
                            title="Giỏ hàng của bạn"
                            centered
                            visible={this.state.visible}
                            onOk={() => {this.setState(
                              {
                                ...this.state,
                                visible : false
                              }
                            )

                            }
                          }
                            onCancel={() => this.setState(
                              {
                                ...this.state,
                                visible : false
                              }
                            )}
                            width={600}
                          >
                            <List
                              itemLayout="horizontal"
                              dataSource={cartItems}
                              renderItem={item => (
                                <Badge.Ribbon text = {(item.amount * item.price).toLocaleString() + "đ"}  color={"Red"}>

                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href="https://ant.design">{item.food_name}</a>}
                                    description={item.store_name}
                                    />
                                  <span style={{marginRight : 50}}>  Số lượng :  <InputNumber value={item.amount} onChange={(value) => {
                                    addToCart(item, value - item.amount);
                                  }} /></span>
                                </List.Item>
                                  </Badge.Ribbon>
                              )}
                            />,
                            <div style={{marginLeft : 210}}>Tổng tiền : {
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
              </Switch>
            </div>

            { /*<AuthVerify logOut={this.logOut}/> */}
          </Router>
          <Footer />
        </div>
      </CartProvider>
    );
  }
}

export default App;
