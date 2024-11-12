import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
const Donation = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const fetchItems = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/items');
          const allItems = response.data.rows || [];
        //  const atul = allItems.filter(item => item.itemtags ==='donation');
          setItems(allItems);
          
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
 
    useEffect(() => {
       
          fetchItems();
       
    }, []);  
    const handleDivClick = (itemid) => {
        navigate(`/item/${itemid}`); // Navigate to (`/other/${userId}`); route
      };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold text-center mb-12 text-gray-800">
      {`Items for Donation `}
    </h1>
    {items.length === 0 ? (
      <p className="text-center text-gray-600">No items for sale</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.itemno}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
        
          >
            <img
              src={item.itemphotourl}
              alt={item.itemname}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              {/* console.log(item); */}

              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {item.itemname}
              </h2>
              <p className="text-gray-600 mb-4">{item.itemdescription}</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                onClick={() => handleDivClick(item.itemno)}
              >
                Get the Item
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Donation