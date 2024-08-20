// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import PropertyCard from '../../sharedComponents/PropertyCard';
import '../../style/clientDashboard.css';

import axios from 'axios';

function ClientDashboard() {

  const username = localStorage.getItem('username'); // Retrieving username from localStorage

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

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/properties/getAll');
      setProperties(response.data);
    } catch (error) {
      console.error('There was an error fetching the properties!', error);
      setProperties([]);
      message.error('Failed to load properties.');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="client-main-container">
      <div className="client-navbar"><header style={headerStyle}>Welcome {username}</header></div>
      
      <div className="client-dashboard">
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
    
  );
}

export default ClientDashboard;
