import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css'

const Products = (props) => {
    const { name, price, author, imageURL, _id } = props.product
    return (
        <div className="books-div">
            <div className="product-div-style shadow m-3">
                <div className="image-div text-center p-2">
                    <img src={imageURL} alt="" />
                    <div className="desc">
                        <h5>{name}</h5>
                        <p>Author: {author}</p>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-around">
                    <div>
                        <h4 className="text-warning p-1">${price}</h4>
                    </div>
                    <div>
                        <Link to={"/product/" + _id}><button className="btn btn-success p-1">Buy Now</button></Link>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Products;