import React, { useEffect, useState } from 'react';

const Delete = () => {
    const [items, setItem] = useState([])
    useEffect(() => {
        fetch('https://stark-taiga-79354.herokuapp.com/books')
            .then(res => res.json())
            .then(data => setItem(data))
    }, [])

    const handleDelete = (id) => {
        fetch(`https://stark-taiga-79354.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                // console.log('deleted successfully', result)
            })
    }

    return (
        <div class="wrapper ml-5">
            <h3 class="form-signin-heading">Mange products:</h3>
        
            <hr/>
            {
                items.map(product => <h5 class="m-1 border-bottom">{product.name} <button className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(product._id)} > Delete</button></h5>)
            }
        </div>
    );
};

export default Delete;