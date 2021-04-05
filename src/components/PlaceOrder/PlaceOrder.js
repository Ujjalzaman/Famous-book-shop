import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import Placed from '../Placed/Placed';


const PlaceOrder = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        fetch('https://stark-taiga-79354.herokuapp.com/clientOrder?email=' + loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])
    return (
        <div>
            <h1>Your Placed Order {orders.length}</h1>
          
            {
                orders.map(order => <Placed order={order} key={order._id}></Placed> )
            }
        </div>
    );
};

export default PlaceOrder;