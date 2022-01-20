import React, { Component } from 'react';
import userService from '../services/user.service';
import { Modal, message } from 'antd';


export const CartContext = React.createContext();

export class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemAmount : 0,
            item : undefined,
            visible : false,
            amount : 0,
            currentNote : "",
            cartItems: [],
            buyHistory : 0
        }
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.success = this.success.bind(this);
        this.addToCartWithNote = this.addToCartWithNote.bind(this);
    }

    componentDidMount(){
        JSON.parse(localStorage.getItem("user")) != null && userService.getCurrentCart(JSON.parse(localStorage.getItem("user")).id).then(
            response => {
                const total = response.data.data.reduce((tota, item) => {
                    return parseInt(tota + item.amount);
                }, 0);
                // const totalPrice = response.data.data.reduce((tota, item) => {
                //     return parseInt(tota + item.amount * item.price);
                // }, 0);
                console.log(response.data.data);
                this.setState({
                    ...this.state,
                    amount : total,
                    cartItems : response.data.data
                });
            }
        );

    }   

    confirmAddToCart(product, amount, note){
        if (this.state.cartItems.length != 0){
            const store_id = this.state.cartItems[0].store_id;
            if (store_id != product.store_id){
                this.setState({
                    ...this.state,
                    item : product,
                    itemAmount :amount,
                    currentNote : note,
                    visible: true
                })
            } else {
                this.addToCartWithNote(product, amount, note);   
                this.success();            
            }
        } else {//list rong
            this.addToCartWithNote(product, amount, note);
            this.success();
        };
    }

    confirmAddToCartAndBuy(product, amount, note, history){
        if (this.state.cartItems.length != 0){
            const store_id = this.state.cartItems[0].store_id;
            if (store_id != product.store_id){
                this.setState({
                    ...this.state,
                    item : product,
                    itemAmount :amount,
                    currentNote : note,
                    visible: true,
                    buyHistory : history
                })
            } else {
                this.addToCartWithNote(product, amount, note);        
                history.push("/payment");   
            }
        } else {//list rong
            this.addToCartWithNote(product, amount, note);
            history.push("/payment");
        };
    }

    success () {
        message.success('Thêm vào giỏ hàng thành công !');
      };


    handleOk () {
        const amount = this.state.itemAmount;
        const item = this.state.item;
        item.amount = amount;
        item != undefined && userService.deleteAndAddToCart(JSON.parse(localStorage.getItem("user")).id, this.state.item.food_id, amount, this.state.currentNote).then(
            response => {
                this.setState({
                    ...this.state,
                    cartItems : response.data.data
                })
            }
        );

        if (this.state.buyHistory == 0){
            this.setState({
                itemAmount : 0,
                item : undefined,
                visible :false,
                amount : amount,
                currentNote : "",
                cartItems : [item]
            })
            this.success();
        } else {
            this.state.buyHistory.push("/payment");
            this.setState({
                itemAmount : 0,
                item : undefined,
                visible :false,
                amount : amount,
                currentNote : "",
                cartItems : [item],
                buyHistory : 0
            })
        }
      };
    
    handleCancel () {
        this.setState({
            ...this.state,
            visible : false
        })
      };


    addToCart(product, amount) {
        const arrayFood = this.state.cartItems.filter(t => t.food_id == product.food_id);
        console.log(this.state.cartItems);
        const productCus = {
            food_id: product.food_id,
            food_type_id: product.food_type_id,
            food_name: product.food_name,
            store_id: product.store_id,
            store_name: product.store_name,
            price: product.price,
            avatar: product.avatar,
            amount: amount,
            discount_percent: product.discount_precent,
            distance: product.distance
        }
        if (arrayFood.length != 0) {
            const index = this.state.cartItems.map(t => t.food_id).indexOf(product.food_id);
            console.log("index" + index);
            var stateCopy = Object.assign({}, this.state);
            stateCopy.cartItems[index].amount += amount;
            if (stateCopy.cartItems[index].amount == 0){
                stateCopy.cartItems.splice(index, 1);
            }
            stateCopy.amount += amount;
            this.setState(stateCopy);
        } else {
            console.log("dang o else");
            this.setState({
                amount : this.state.amount + amount,
                cartItems: this.state.cartItems.concat(productCus)
            });
        }
        userService.addToCart(JSON.parse(localStorage.getItem("user")).id, product.food_id, amount);
        console.log(this.state.cartItems);
        // console.log(JSON.parse(localStorage.getItem("carts")));
    }

    addToCartWithNote(product, amount, note) {
        const arrayFood = this.state.cartItems.filter(t => t.food_id == product.food_id);
        console.log(this.state.cartItems);
        const productCus = {
            food_id: product.food_id,
            food_type_id: product.food_type_id,
            food_name: product.food_name,
            store_id: product.store_id,
            store_name: product.store_name,
            price: product.price,
            avatar: product.avatar,
            amount: amount,
            discount_percent: product.discount_precent,
            note: note,
            distance: product.distance
        }
        if (arrayFood.length != 0) {
            const index = this.state.cartItems.map(t => t.food_id).indexOf(product.food_id);
            console.log("index" + index);
            var stateCopy = Object.assign({}, this.state);
            stateCopy.cartItems[index].amount += amount;
            if (stateCopy.cartItems[index].amount == 0){
                stateCopy.cartItems.splice(index, 1);
            }
            stateCopy.amount += amount;
            this.setState(stateCopy);
        } else {
            console.log("dang o else");
            this.setState({
                amount : this.state.amount + amount,
                cartItems: this.state.cartItems.concat(productCus)
            });
        }
        userService.addToCartWithNote(JSON.parse(localStorage.getItem("user")).id, product.food_id, amount, note).then(
            response => {
                console.log(response.data.data);
                this.setState({
                    ...this.state,
                    cartItems : response.data.data
                })
            }
        );
        console.log(this.state.cartItems);
        // console.log(JSON.parse(localStorage.getItem("carts")));
    }

    render() {
        return <CartContext.Provider value={{
            amount : this.state.amount,
            cartItems: this.state.cartItems,
            addToCart: this.addToCart.bind(this),
            totalPrice: this.state.totalPrice,
            confirmAddToCart : this.confirmAddToCart.bind(this),
            confirmAddToCartAndBuy: this.confirmAddToCartAndBuy.bind(this)
        }}>
            <div>
            <Modal title="Tạo giỏ hàng mới ?" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>Bạn có muốn xóa giỏ hàng tại {this.state.cartItems.length != 0 && this.state.cartItems[0].store_name} và thêm vào món mới này ?</p>
      </Modal>
            {this.props.children}
            </div>
        </CartContext.Provider>
    }
}




// ===================================================




// import React, { Component } from 'react';
// import userService from '../services/user.service';
// import { Modal, message } from 'antd';

// export const CartContext = React.createContext();

// export class CartProvider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             itemAmount : 0,
//             item : undefined,
//             visible : false,
//             amount : 0,
//             cartItems: []
//         }
//         this.handleOk = this.handleOk.bind(this);
//         this.handleCancel = this.handleCancel.bind(this);
//         this.addToCart = this.addToCart.bind(this);
//         this.success = this.success.bind(this);
//     }

//     componentDidMount(){
//         JSON.parse(localStorage.getItem("user")) != null && userService.getCurrentCart(JSON.parse(localStorage.getItem("user")).id).then(
//             response => {
//                 const total = response.data.data.reduce((tota, item) => {
//                     return parseInt(tota + item.amount);
//                 }, 0);
//                 // const totalPrice = response.data.data.reduce((tota, item) => {
//                 //     return parseInt(tota + item.amount * item.price);
//                 // }, 0);
//                 this.setState({
//                     ...this.state,
//                     amount : total,
//                     cartItems : response.data.data
//                 });
//             }
//         );

//     }   

//     confirmAddToCart(product, amount){
//         if (this.state.cartItems.length != 0){
//             const store_id = this.state.cartItems[0].store_id;
//             if (store_id != product.store_id){
//                 this.setState({
//                     ...this.state,
//                     item : product,
//                     itemAmount :amount,
//                     visible: true
//                 })
//             } else {
//                 this.addToCart(product, amount);   
//                 this.success();            
//             }
//         } else {//list trong
//             this.addToCart(product, amount);
//             this.success();
//         };
//     }

//     success () {
//         message.success('Thêm vào giỏ hàng thành công !');
//       };


//     handleOk () {
//         const amount = this.state.itemAmount;
//         const item = this.state.item;
//         item.amount = amount;
//         item != undefined && userService.deleteAndAddToCart(JSON.parse(localStorage.getItem("user")).id, this.state.item.food_id, amount);

//         this.setState({
//             itemAmount : 0,
//             item : undefined,
//             visible :false,
//             amount : amount,
//             cartItems : [item]
//         })
//         this.success();
//       };
    
//     handleCancel () {
//         this.setState({
//             ...this.state,
//             visible : false
//         })
//       };


//     addToCart(product, amount) {
//         const arrayFood = this.state.cartItems.filter(t => t.food_id == product.food_id);
//         console.log(this.state.cartItems);
//         const productCus = {
//             food_id: product.food_id,
//             food_type_id: product.food_type_id,
//             food_name: product.food_name,
//             store_id: product.store_id,
//             store_name: product.store_name,
//             price: product.price,
//             avatar: product.avatar,
//             amount: amount,
//             discount_percent: product.discount_precent
//         }
//         if (arrayFood.length != 0) {
//             const index = this.state.cartItems.map(t => t.food_id).indexOf(product.food_id);
//             console.log("index" + index);
//             var stateCopy = Object.assign({}, this.state);
//             stateCopy.cartItems[index].amount += amount;
//             if (stateCopy.cartItems[index].amount == 0){
//                 stateCopy.cartItems.splice(index, 1);
//             }
//             stateCopy.amount += amount;
//             this.setState(stateCopy);
//         } else {
//             console.log("dang o else");
//             this.setState({
//                 amount : this.state.amount + amount,
//                 cartItems: this.state.cartItems.concat(productCus)
//             });
//         }
//         userService.addToCart(JSON.parse(localStorage.getItem("user")).id, product.food_id, amount);
//         console.log(this.state.cartItems);
//         // console.log(JSON.parse(localStorage.getItem("carts")));
//     }

//     render() {
//         return <CartContext.Provider value={{
//             amount : this.state.amount,
//             cartItems: this.state.cartItems,
//             addToCart: this.addToCart.bind(this),
//             totalPrice: this.state.totalPrice,
//             confirmAddToCart : this.confirmAddToCart.bind(this)
//         }}>
//             <div>
//             <Modal title="Tạo giỏ hàng mới ?" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
//         <p>Bạn có muốn xóa giỏ hàng tại {this.state.cartItems.length != 0 && this.state.cartItems[0].store_name} và thêm vào món mới này ?</p>
//       </Modal>
//             {this.props.children}
//             </div>
//         </CartContext.Provider>
//     }
// }