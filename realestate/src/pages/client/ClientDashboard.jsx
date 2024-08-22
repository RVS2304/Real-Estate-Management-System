import React, { useState, useEffect } from 'react';
import PropertyList from '../../sharedComponents/PropertyCard'; // Adjust path as necessary
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
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/properties/getAll');
      setProperties(response.data);
    } catch (error) {
      console.error('There was an error fetching the properties!', error);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="client-main-container">
      <div className="client-navbar">
        <header style={headerStyle}>Welcome {username}</header>
        <form className="search-form">
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
        <PropertyList properties={properties} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default ClientDashboard;
