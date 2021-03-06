import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://stark-taiga-79354.herokuapp.com/books')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className="container">
            <div className="text-center m-2 searchField">
                <input id="input-style"  type="text" placeholder="Search Your Books ...." />
                <button className="btn btn-success">Search</button>
            </div>
            {
                products.length === 0 && <div className="text-center">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden"></span>
                </div>
                <p>...loading</p>
                </div>
            }
            <div className="div-style">
                {
                    products.map(pd => <Products product={pd} key={pd._id}></Products>)
                }
            </div>
        </div>
    );
};

export default Home;