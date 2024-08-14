// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const username = localStorage.getItem('username'); // Retrieving username from localStorage

  const headerStyle = {
    backgroundColor: '#f0f2f5', // Light grey background
    padding: '20px',            // Padding around the text
    textAlign: 'center',        // Center align the text
    color: '#001529',           // Dark blue text color (Ant Design primary color)
    borderRadius: '8px',        // Rounded corners
    marginBottom: '20px',       // Space below the header
    fontSize: '24px',           // Larger font size
    fontWeight: 'bold',         // Bold text
  };

  useEffect(() => {
    // Fetch properties from the API
    axios.get(`http://localhost:8080/api/properties/agent-properties/${username}`)
      .then(response => {
        const data = response.data;

        console.log(data);

        // Ensure the data is an array
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          // If the data is not an array, set an empty array
          setProperties([]);
          message.error('Unexpected data format from API.');
        }
      })
      .catch(error => {
        console.error('Failed to fetch properties:', error);
        message.error('Failed to load properties.');
      });
  }, []);

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  const handleEdit = (propertyId) => {
    // console.log(propertyId);
    navigate(`/edit-property/${propertyId}`);
  };

  const handleView = (propertyId) => {
    navigate(`/view-property/${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    // Implement the delete functionality here
    axios.delete(`http://localhost:8080/api/properties/delete/${propertyId}`)
      .then(() => {
        setProperties(properties.filter(property => property.id !== propertyId));
        message.success('Property deleted successfully.');
      })
      .catch(error => {
        console.error('Failed to delete property:', error);
        message.error('Failed to delete property.');
      });
  };

  


  const columns = [
    {
      title: 'Property Image',
      dataIndex: 'propertyImage',
      key: 'property_image',
      render: (text, record) => (
        <img 
          src={`data:image/jpeg;base64,${record.propertyImage}`} 
          alt={record.propertyName}
          style={{ width: '100px', height: 'auto', borderRadius: '8px' }} 
        />
      ),
    },
    {
      title: 'Property Name',
      dataIndex: 'propertyName',
      key: 'property_name',
    },
    {
      title: 'Property Type',
      dataIndex: 'propertyType',
      key: 'property_type',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Occupancy Status',
      dataIndex: 'occupancyStatus', // New field
      key: 'occupancy_status',
    },
    {
      title: 'Closing Date',
      dataIndex: 'closingDate', // New field
      key: 'closing_date',
      render: (text, record) => (
        new Date(record.closingDate).toLocaleDateString()
      ),
    },
    {
      title: 'Deposit Payment Terms',
      dataIndex: 'depositPaymentTerms', // New field
      key: 'deposit_payment_terms',
    },
    {
      title: 'Description',
      dataIndex: 'description', // New field
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record.propertyId)}
          >
            Edit
          </Button>
          <Button 
            type="primary"
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.propertyId)}
          >
            Delete
          </Button>
        </Space>
      ),
    }
  ];

  return (
    <div>
      <header style={headerStyle}>Welcome, {username}</header>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddProperty}
        style={{ marginBottom: 16 }}
      >
        Add Property
      </Button>
      <Table columns={columns} dataSource={properties} rowKey="propertyId" />
    </div>
  );
};

export default Dashboard;
