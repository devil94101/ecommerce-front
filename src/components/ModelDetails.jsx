import React, { Component } from 'react'
import Zoom from 'react-reveal/Zoom'
export class ModelDetails extends Component {
    render() {
        const {product}=this.props
        return (
            <Zoom>
                <button className=" close-modal" onClick={this.props.closeModal}>X</button>
                <div className="product-details">
                    <img src={product.image} alt={product.title}/>
                    <div className="product-details-description">
                        <p>
                            <strong>
                                {product.title}
                            </strong>
                        </p>
                        <p>
                            {product.description}
                        </p>
                        <div className="product-price">
                            <div>
                                {"$"+product.price}
                            </div>
                            <button className="button primary" 
                            onClick={()=>{this.props.addToCart(product);
                            this.props.closeModal();}
                            }>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </Zoom>
        )
    }
}

export default ModelDetails
