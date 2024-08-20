// src/components/Dashboard.js  
import React, { useState, useEffect } from 'react';  
import PropertyCard from '../../sharedComponents/PropertyCard';  
import '../../style/clientDashboard.css';  
import axios from 'axios';  
  
function ClientDashboard() {  
  const username = localStorage.getItem('username');  
  
  const headerStyle = {  
    backgroundColor: '#f0f2f5',  
    padding: '20px',  
    textAlign: 'center',  
    color: '#001529',  
    borderRadius: '8px',  
    marginBottom: '20px',  
    fontSize: '24px',  
    fontWeight: 'bold',  
  };  
  
  const [properties, setProperties] = useState([]);  
  const [filteredProperties, setFilteredProperties] = useState([]);  
  const [searchQuery, setSearchQuery] = useState('');  
  
  const fetchProperties = async () => {  
    try {  
      const response = await axios.get('http://localhost:8080/api/properties/getAll');  
      setProperties(response.data);  
      setFilteredProperties(response.data);  
    } catch (error) {  
      console.error('There was an error fetching the properties!', error);  
      setProperties([]);  
      setFilteredProperties([]);  
    }  
  };  
  
  const handleSearch = (e) => {  
    e.preventDefault();  
    const filtered = properties.filter(property =>
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );  
    setFilteredProperties(filtered);  
  };  
  
  useEffect(() => {  
    fetchProperties();  
  }, []);  
  
  return (  
    <div className="client-main-container">  
      <div className="client-navbar">  
        <header style={headerStyle}>Welcome {username}</header>  
        <form onSubmit={handleSearch} className="search-form">  
          <input  
            type="search"  
            value={searchQuery}  
            onChange={(e) => setSearchQuery(e.target.value)}  
            placeholder="Search for properties..."  
            className="search-input"  
          />  
        </form>  
      </div>  
      <div className="client-dashboard">  
        {filteredProperties.map((property, index) => (  
          <PropertyCard key={index} property={property} />  
        ))}  
      </div>  
    </div>  
  );  
}  
  
export default ClientDashboard;
