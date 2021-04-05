import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Admin.css'
import Delete from './Delete/Delete';

const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null)
    // console.log(imageURL)


    const onSubmit = data => {
        const productData = {
            name: data.name,
            price: data.price,
            author:data.author,
            imageURL: imageURL
        };
        const url = `https://stark-taiga-79354.herokuapp.com/addBook`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => console.log('server side response', res))
    };


    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '62c9917a4e87adee0531d1c5b419393e');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    return (
        <div className="row wrapper">
            <div className="col-md-6 shadow p-2   mt-3">
            <Delete></Delete>                
            </div>
            <div className="col-md-6 shadow p-3 mt-3">
                {/* <hr/> */}
                <form class="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <h3 class="form-signin-heading">Add New Book : </h3>
                    <input name="name" class="form-control" defaultValue="book name" ref={register} />
                    <input name="price" type="number" class="form-control" defaultValue="book price" ref={register} />
                    <input name="author" class="form-control" defaultValue="author" ref={register} />
                    <input name="exampleRequired" class="btn btn-lg btn-primary btn-block" type="file" onChange={handleImageUpload} />
                    <br />


                    <input type="submit" class="btn btn-lg btn-primary btn-block" />
                </form>
            </div>
        </div>
    );
};

export default Admin;