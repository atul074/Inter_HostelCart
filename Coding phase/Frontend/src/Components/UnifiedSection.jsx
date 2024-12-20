import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UnifiedSection = ({ gender, tag }) => {
  

  const [items, setItems] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");

  const navigate = useNavigate();
  const handleDivClick = (itemid) => {
    navigate(`/item/${itemid}`); // Navigate to (`/other/${userId}`); route
  };

  // console.log(tag);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let endpoint;
        if (gender) {
          try {
            endpoint =
              gender === "male"
                ? "http://localhost:3001/api/items/he/1"
                : "http://localhost:3001/api/items/she/1";
            setSectionTitle(
              gender === "male" ? "Items for Men" : "Items for Women"
            );
          } catch (error) {
            console.error("Error fetching items:", error);
          }
          const response = await axios.get(endpoint);
          console.log(response.data.rows);
          setItems(response.data.rows);
        } else {
          try {
            if (tag === "electronics") {
              endpoint = "http://localhost:3001/api/items/electronics";
            } else if (tag === "accessories") {
              endpoint = "http://localhost:3001/api/items/accessories";
            } else if (tag === "stationary") {
              endpoint = "http://localhost:3001/api/items/stationary";
            } else if (tag === "vehicle") {
              endpoint = "http://localhost:3001/api/items/vehicle";
            } else if (tag === "sport") {
              endpoint = "http://localhost:3001/api/items/sport";
            } else if (tag === "medicine") {
              endpoint = "http://localhost:3001/api/items/medicine";
            }
          } catch (error) {
            console.error("Error fetching items:", error);
          }
          const response = await axios.get(endpoint);
          setItems(response.data.rows);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [gender, tag]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {sectionTitle}
      </h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-600">No items for sale</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.itemno}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
              onClick={() => handleDivClick(item.itemno)}
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
                <p className="text-gray-600 mb-4">Price: ₹{item.itemprice}</p>
                <p className="text-gray-600 mb-4">Tags: {item.itemtags}</p>
                <p className="text-gray-600 mb-4">Visits: {item.itemvisit}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnifiedSection;
