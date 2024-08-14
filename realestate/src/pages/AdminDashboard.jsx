import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/admindashboardstyles.css';

const AdminDashboard = () => {
  const [view, setView] = useState('');

  const handleViewChange = (viewName) => {
    setView(viewName);
  };

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios.get('/api/agents')
      .then(response => {
        setAgents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the agents!', error);
      });
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);



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
        {view === 'agents' && <div>
          <h2>List of Agents</h2>
          <ul>
            {/* {agents.map(agent => (
            <li key={agent.id}>{agent.name}</li>
          ))} */}
          </ul>
        </div>}
        {view === 'clients' && <div>
          <h2>List of Clients</h2>
          <ul>
            {/* {clients.map(client => (
            <li key={client.id}>{client.name}</li>
          ))} */}
          </ul>
        </div>}
        {view === 'properties' && <div>
          <h2>List of Properties</h2>
          <ul>
            {/* {properties.map(property => (
            <li key={property.id}>{property.name}</li>
          ))} */}
          </ul>
        </div>}
        {!view && <h2>Select an option from the menu</h2>}
      </div>

    </div>
  );
};

export default AdminDashboard;
