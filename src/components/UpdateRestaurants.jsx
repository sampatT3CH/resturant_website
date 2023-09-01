
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurants = (props) => {
   const {id} =  useParams();
   let navigate = useNavigate();
   const [name, setName] = useState("");
   const [location, setLocation] = useState("");
   const [priceRange, setPriceRange] = useState("");

   useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPriceRange(response.data.data.restaurants.price_range);
            console.log(response);
         }catch(err){
             console.log(err);
         }
    }
    fetchData();
   },[]);

   const handleSubmit = async (e) => {
e.preventDefault();
const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
    name,
    location,
    price_range: priceRange
});
navigate("/")
   }
   
  return (
    <div>
     <form action="">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" id="location" className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input value={priceRange} onChange={e => setPriceRange(e.target.value)} type="number" id="price_range" className="form-control" />
        </div>
        <button type="submit" onClick={handleSubmit}  className="btn btn-primary">Submit</button>
     </form>
    </div>
  )
}

export default UpdateRestaurants