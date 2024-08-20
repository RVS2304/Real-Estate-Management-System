// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import '../style/propertyDetails.css'; // Ensure you create this CSS file for styling

const PropertyDetails = () => {
  const { propertyId } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [contactInfo, setContactInfo] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/properties/getAll');
        // Find the property based on the propertyId from the fetched data
        const property = response.data.find(p => p.propertyId === parseInt(propertyId));
        setProperty(property || null); // Set the property or null if not found
      } catch (error) {
        console.error('Error fetching property details:', error);
        setProperty(null); // Handle the case where the property is not found
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleBuyClick = () => {
    const userConfirmed = window.confirm('Are you ready to share your contact with the agent?');
    if (userConfirmed) {
      setShowContactPrompt(false);
      alert('The agent will contact you soon.');
    } else {
      setShowContactPrompt(true);
    }
  };

  const handleInterestedClick = () => {
    alert('The agent will contact you soon.');
  };

  const handleContactSubmit = () => {
    if (contactInfo.trim()) {
      alert('Thank you! Your contact information has been received.');
      setShowContactPrompt(false);
      // You can send the contactInfo to your server here
    } else {
      alert('Please provide your contact information.');
    }
  };

  const handleContactClose = () => {
    setShowContactPrompt(false);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details-container">
      <h1>{property.name}</h1>
      <img  src={`data:image/jpeg;base64,${property.propertyImage}`} alt={property.name} className="property-image" />
      <p><strong>Address:</strong> {property.address}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Deposit Payment Terms:</strong> ${property.depositPaymentTerms}</p>
      <p><strong>Occupancy Status:</strong> {property.occupancyStatus}</p>
      <p><strong>Closing Date:</strong> {new Date(property.closingDate).toLocaleDateString()}</p>
      <p><strong>Created By:</strong> {property.createdBy}</p>
      <p><strong>Property ID:</strong> {property.propertyId}</p>

      <div className="button-group">
        <button className="buy-button" onClick={handleBuyClick}>Buy</button>
        <button className="interested-button" onClick={handleInterestedClick}>Interested</button>
      </div>

      {showContactPrompt && (
        <div className="contact-prompt">
          <p>Since you are not ready to share your contact with the agent, please provide your contact information below:</p>
          <input
            type="text"
            placeholder="Enter your contact information"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="contact-input"
          />
          <button onClick={handleContactSubmit} className="contact-submit-button">Submit</button>
          <button onClick={handleContactClose} className="contact-close-button">Close</button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;




