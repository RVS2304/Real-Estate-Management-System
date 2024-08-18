import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/dashboard.css';

function ClientsInfo() {
  const [interestedClients, setInterestedClients] = useState([]);
  const [notInterestedClients, setNotInterestedClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [properties, setProperties] = useState([]);
  const [view, setView] = useState(''); // State to manage which view to display

  useEffect(() => {
    axios.get('/api/clients/interested')
      .then(response => setInterestedClients(response.data))
      .catch(error => console.error(error));

    axios.get('/api/clients/not-interested')
      .then(response => setNotInterestedClients(response.data))
      .catch(error => console.error(error));

    axios.get('/api/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleViewChange = (view) => {
    setView(view);
    setSelectedClient(null); // Reset selected client on view change
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Clients Info</h1>
        <ul>
          <li>
            <button onClick={() => handleViewChange('interested')}>Interested Clients</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('not-interested')}>Not Interested Clients</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        {view === 'interested' && (
          <div>
            <h2>List of Interested Clients</h2>
            <ul>
              {/* {interestedClients.map((client) => (
                <li key={client.id}>
                  {client.name} - {client.email}
                  <button onClick={() => handleSelectClient(client)}>Select</button>
                </li>
              ))} */}
            </ul>
          </div>
        )}
        {view === 'not-interested' && (
          <div>
            <h2>List of Not Interested Clients</h2>
            <ul>
              {/* {notInterestedClients.map((client) => (
                <li key={client.id}>
                  {client.name} - {client.email}
                  <button onClick={() => handleSelectClient(client)}>Select</button>
                </li>
              ))} */}
            </ul>
          </div>
        )}
        {selectedClient && (
          <div>
            <h2>Selected Client</h2>
            <p>Name: {selectedClient.name}</p>
            <p>Email: {selectedClient.email}</p>
            <h2>Properties</h2>
            <ul>
              {/* {properties.map((property) => (
                <li key={property.id}>
                  {property.name} - {property.address}
                </li>
              ))} */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientsInfo;
