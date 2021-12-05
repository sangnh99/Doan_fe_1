import React, { Component } from 'react';
import userService from '../services/user.service';

export const CartContext = React.createContext();

export class CartProvider extends Component {
    constructor(props) {
        super(props);
        JSON.parse(localStorage.getItem("user")) != null && userService.getCurrentCart(JSON.parse(localStorage.getItem("user")).id);
        this.state = {
            cartItems: JSON.parse(localStorage.getItem("carts"))
        }
    }

    componentDidMount(){
        
    }


    addToCart(product, amount) {
        const arrayFood = this.state.cartItems.filter(t => t.food_id == product.id);
        console.log(this.state.cartItems);
        const productCus = {
            food_id: product.id,
            food_type_id: product.food_type_id,
            food_name: product.name,
            store_id: product.store_id,
            store_name: product.store_name,
            price: product.price,
            amount: amount
        }
        if (arrayFood.length != 0) {
            const index = this.state.cartItems.map(t => t.food_id).indexOf(product.id);
            console.log("index" + index);
            var stateCopy = Object.assign({}, this.state);
            stateCopy.cartItems[index].amount += amount;
            this.setState(stateCopy);
            localStorage.setItem("carts", JSON.stringify(stateCopy));
        } else {
            console.log("dang o else");
            this.setState({
                cartItems: this.state.cartItems.concat(productCus)
            });
            localStorage.setItem("carts", JSON.stringify(JSON.parse(localStorage.getItem("carts")).concat(productCus)));
        }
        userService.addToCart(JSON.parse(localStorage.getItem("user")).id, product.id, amount);
        console.log(JSON.parse(localStorage.getItem("carts")));
    }

    render() {
        return <CartContext.Provider value={{
            cartItems: this.state.cartItems,
            addToCart: this.addToCart.bind(this)
        }}>

            {this.props.children}
        </CartContext.Provider>
    }
}