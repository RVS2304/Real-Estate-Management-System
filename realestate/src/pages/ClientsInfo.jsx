import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import '../style/dashboard.css';

function ClientsInfo() {
  const [interestedClients, setInterestedClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [view, setView] = useState(''); // State to manage which view to display

  const name = localStorage.getItem('username');
  const [userId, setUserId] = useState(0);

  // Fetch agent ID based on username
  useEffect(() => {
    const fetchAgentId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/name/${name}`);
        setUserId(response.data.userid);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchAgentId();
  }, [name]);

  // Fetch interested clients based on agent ID
  useEffect(() => {
    const fetchInterestedClients = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/interactions/interested-clients/${userId}`);
          setInterestedClients(response.data);
        } catch (error) {
          console.error('Error fetching interested clients:', error);
        }
      }
    };

    fetchInterestedClients();
  }, [userId]);

  // Fetch client details for each interested client
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientsData = await Promise.all(
          interestedClients.map(async (client) => {
            const response = await axios.get(`http://localhost:8080/api/users/id/${client.clientId}`);
            return {
              ...response.data,
              propertyId: client.propertyId // Add propertyId from interestedClients
            };
          })
        );
        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };

    if (interestedClients.length > 0) {
      fetchClientDetails();
    }
  }, [interestedClients]);

  // Fetch buyers data based on agent ID
  useEffect(() => {
    const fetchBuyers = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/interactions/buyers/${userId}`);
          setBuyers(response.data);
        } catch (error) {
          console.error('Error fetching buyers:', error);
        }
      }
    };

    fetchBuyers();
  }, [userId]);

  const handleViewChange = (view) => {
    setView(view);
    setSelectedClient(null); // Reset selected client on view change
  };

  // Define columns for the clients and buyers tables
  const interestedClientColumns = [
    {
      title: 'Client Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Client Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Property Id',
      dataIndex: 'propertyId',
      key: 'propertyId'
    }
  ];

  const buyerColumns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Interested Properties',
      dataIndex: 'interestedProperties',
      key: 'interestedProperties',
      render: (text) => text.join(', '), // Assuming interestedProperties is an array
    },
  ];

  return (
    <div>
      <nav className="navbar">
        <h1>Clients Info</h1>
        <ul>
          <li>
            <button onClick={() => handleViewChange('interested')}>Interested Clients</button>
          </li>
          <li>
            {/* <button onClick={() => handleViewChange('interested')}>Not Interested Clients</button> */}
          </li>
        </ul>
      </nav>
      <div className="content">
        {view === 'interested' && (
          <div>
            <h2>List of Interested Clients</h2>
            <Table columns={interestedClientColumns} dataSource={clients} rowKey="propertyId" />
          </div>
        )}
        {/* {view === 'not-interested' && ( */}
          {/* <div> */}
            {/* <h2>List of Not Interested Clients</h2> */}
            {/* <ul> */}
              {/* Handle the Not Interested Clients list here */}
            {/* </ul> */}
          {/* </div> */}
        {/* )} */}


      </div>
    </div>
  );
}

export default ClientsInfo;
