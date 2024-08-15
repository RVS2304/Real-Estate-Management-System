import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/admindashboardstyles.css';

const AdminDashboard = () => {
  const [view, setView] = useState('');
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);

  const handleViewChange = (viewName) => {
    setView(viewName);

    if (viewName === 'agents' || viewName === 'clients') {
      const role = viewName === 'agents' ? 'AGENT' : 'CLIENT';
      fetchUsersByRole(role);
    } else if (viewName === 'properties') {
      fetchProperties();
    }
  };

  const fetchUsersByRole = async (role) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${role}`);
      console.log(`Fetched ${role}:`, response.data); // Debugging
      setUsers(response.data); // Ensure it's an array
    } catch (error) {
      console.error(`There was an error fetching the ${role.toLowerCase()}s!`, error);
      setUsers([]); // Reset users on error
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/properties/getAll');
      console.log('Fetched Properties:', response.data); // Debugging
      setProperties(response.data); // Ensure it's an array
    } catch (error) {
      console.error('There was an error fetching the properties!', error);
      setProperties([]); // Reset properties on error
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="menu-bar">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <ul>
          <li onClick={() => handleViewChange('agents')}>View Agents</li>
          <li onClick={() => handleViewChange('clients')}>View Clients</li>
          <li onClick={() => handleViewChange('properties')}>View Properties</li>
        </ul>
      </nav>
      <div className="content">
        {view === 'agents' && (
          <div>
            <h2>List of Agents</h2>
            {Array.isArray(users) && users.length > 0 ? (
              <ul>
                {users.map(user => (
                  <li key={user.userid}>
                    {user.userid} | {user.username} | {user.email} | {user.phone}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No agents found</p>
            )}
          </div>
        )}

        {view === 'clients' && (
          <div>
            <h2>List of Clients</h2>
            {Array.isArray(users) && users.length > 0 ? (
              <ul>
                {users.map(user => (
                  <li key={user.userid}>
                    {user.userid} | {user.username} | {user.email} | {user.phone}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No clients found</p>
            )}
          </div>
        )}

        {view === 'properties' && (
          <div>
            <h2>List of Properties</h2>
            {Array.isArray(properties) && properties.length > 0 ? (
              <ul>
                {properties.map(property => (
                  <li key={property.propertyId}>{property.propertyName}</li>
                ))}
              </ul>
            ) : (
              <p>No properties found</p>
            )}
          </div>
        )}

        {!view && <h2>Select an option from the menu</h2>}
      </div>
    </div>
  );
};

export default AdminDashboard;
