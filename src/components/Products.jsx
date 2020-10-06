import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import ModelDetails from './ModelDetails'
import axios from 'axios'
export class Products extends Component {
    state={
        product:null,
        flag:0
    }
    openModal=(ele)=>{
        this.setState({
            flag:1
        })
        axios.post("https://ecommerce-backend11.herokuapp.com/product/detail",{
            id:ele._id
          }).then(res=>{
              let data={
                price:ele.price,
                image:ele.image,
                title:res.data.title,
                description:res.data.description
              }
            this.setState({
              product:data,
              flag:1
            })
            console.log(res.data)
          }).catch(err=>{
            console.log(err.message)
          })
    }
    closeModal=()=>{
        this.setState({product:null})
    }
    render() {
        return (
            <div>
                <Fade bottom cascade>
                <ul className="products">
                    {this.props.products.map(ele=>{
                        return(
                        <li key={ele["_id"]}>
                            <div className="product">
                                <a href={"#"+ele._id} onClick={()=>this.openModal(ele)}>
                                    <img src={ele.image} alt={ele.title}></img>
                                    <p>{ele.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        {"$"+ele.price}
                                    </div>
                                    <button className="button primary" onClick={()=>this.props.addToCart(ele) }>Add To Cart</button>
                                </div>
                            </div>
                        </li>)
                    })}
                </ul>
                </Fade>
                {this.state.product &&(<Modal isOpen={true}
                onRequestClose={this.closeModal}
                ariaHideApp={false}>
                        <div>A modal </div>
                        <ModelDetails product={this.state.product} closeModal={this.closeModal} addToCart={this.props.addToCart} />
                    </Modal>)}
            </div>
        )
    }
}

export default Products
