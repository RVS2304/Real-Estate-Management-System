import React from 'react';
import '../style/propertyCard.css';
import { capitalizeWords } from '../utils';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();
    console.log(property);
    const handleClick = () => {
        navigate(`/property/${property.propertyId}`);
      };
    return (
        <div className='property-card-container' onClick={handleClick}>
        <div className="property-card">
            <h3 className='property-title'>{capitalizeWords(property.propertyName)}</h3>
            <img src={`data:image/jpeg;base64,${property.propertyImage}`} alt="image" className='property-image' />
            <p className='property-location'><strong>Location:</strong> {capitalizeWords(property.address)}</p>
            <p className='property-size'><strong>Size:</strong> {capitalizeWords(property.size)} sq ft</p>
            <p className='property-price'><strong>Price:</strong> INR {property.price}</p>
        </div>
        </div>
    );
};

export default PropertyCard;