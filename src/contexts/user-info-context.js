import React, {Component} from 'react';
import userService from '../services/user.service';

export const UserInfoContext = React.createContext();

export class UserInfoProvider extends Component{
    constructor(props){
        super(props);

        this.state = {
            fullNameContext : null,
            phoneContext : null,
            addressContext : null,
            avatarContext : null
        }
    }

    componentDidMount(){
        userService.getUserInfo(JSON.parse(localStorage.getItem("user")).id).then(response => {
            this.setState({
                ...this.state,
                fullNameContext : response.data.data.full_name
            });
            console.log("fullname :" + this.state.fullNameContext)
          })
    }

    // addToCart(product){
    //     console.log("Addding carrt");
    //     this.setState({
    //         cartItems: this.state.cartItems.concat(product)
    //     });
    // }

    render(){
        return <UserInfoContext.Provider value={{
            fullNameContext : this.state.fullNameContext
        }}>
        {this.props.children}
        </UserInfoContext.Provider>
    }
}