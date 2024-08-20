// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import AddPropertyForm from './pages/addproperty';
import EditPropertyForm from './pages/editproperty';
import Dashboard from './pages/agentdashboard';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ClientsInfo from './pages/ClientsInfo.jsx';
import ClientDashboard from './pages/client/ClientDashboard.jsx';
import PropertyDetails from './pages/propertydetails.jsx';
import Home from './pages/homepage.jsx'; 

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/agent-dashboard" element={<Dashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/interested-clients" element={<ClientsInfo />} />
          <Route path="/add-property" element={<AddPropertyForm />} />
          <Route path="/edit-property/:propertyId" element={<EditPropertyForm />} />
<<<<<<< HEAD
          <Route path="/property/:propertyId" element={<PropertyDetails />} />
          <Route path="/" element={<Home />} /> 
=======
          <Route path="/property/:propertyId" element={<PropertyDetails />} /> {/* Route for Property Details */}
          <Route path="/" element={<Login />} /> {/* Default route */}
>>>>>>> 71ce6b7f0df75aeabc99b175800035fdfb44aca2
        </Routes>
      </div>
    </Router>
  );
};

export default App;
