import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
export class Cart extends Component {
    
    createOrder=(e)=>{
        e.preventDefault();
        const order={
            name:this.state.name,
            address:this.state.address,
            email:this.state.email,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order);
    }
    render() {
        const {cartItems}=this.props
        console.log(cartItems)
        return (
            
            <div>
                {cartItems.length===0?
                    <div className="cart cart-header"> Cart is Empty</div>:
                    <div className="cart cart-header"> 
                        You have {cartItems.length} in your cart.
                    </div>
                }
                 <div>
                <div className="cart">
                   <Fade left cascade>
                    <ul className="cart-items">
                        {
                            cartItems.map(item=>{
                                return(
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}/>
                                        </div>
                                        <div>
                                            <div>
                                                {item.title}
                                                <div className="right">
                                                    {"$"+item.price+" "} x{" "+item.count+" "}
                                                <button onClick={()=>this.props.removeFromCart(item._id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>  
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </Fade>
                </div>
                {cartItems.length!==0 &&(
                <div>
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{"  $"}
                            {
                                cartItems.reduce((a,c)=>a+c.price*c.count,0 )
                            }
                        </div>
                        <button className="button primary" disabled={true}>Can't order </button>
                    </div>
            </div>
            </div>
             )}
            </div>
            </div>
           
        )
    }
}

export default Cart
