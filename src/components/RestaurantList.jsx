import React, {useEffect, useContext}  from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
   const {restaurants, setRestaurants} = useContext(RestaurantsContext);
   let navigate = useNavigate();
  
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
             }catch(err){
                 console.log(err);
             }
        }
        fetchData();
    },[]);

    const handleDelete = async (e,id) => {
        e.stopPropagation();
        try{
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(del => {
                return del.id !== id
            }))
          
         }catch(err){
             console.log(err);
         }
    }


    const handleUpdate = async (e,id) => {
        e.stopPropagation();
        navigate(`/restaurants/${id}/update`)
        // try{
           
        //  }catch(err){
        //      console.log(err);
        //  }
    }
const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
}
  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className='bg-primary'>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(el => {
                    return (
                        <tr onClick={() => handleRestaurantSelect(el.id)} key={el.id}>
                        <td>{el.name}</td>
                        <td>{el.location}</td>
                        <td>{"$".repeat(el.price_range)}</td>
                        <td>reviews</td>
                        <td><button onClick={(e) => handleUpdate(e,el.id)} className="btn btn-warning">Update</button></td>
                    <td><button onClick={(e) => handleDelete(e,el.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    )
                   
                })}
                {/* <tr>
                    <td>Pizza hut</td>
                    <td>Mumbai</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
            </tbody>
        </table>

    </div>
  )
}

export default RestaurantList