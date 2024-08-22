import React from 'react';
import '../style/propertyCard.css';
import { capitalizeWords } from '../utils';
import { useNavigate } from 'react-router-dom';

const PropertyList = ({ properties, searchQuery }) => {
    const navigate = useNavigate();

    // Convert searchQuery to lower case for case-insensitive comparison
    const query = searchQuery.toLowerCase();

    const filteredProperties = properties.filter(property => {
        const locationMatch = property.address.toLowerCase().includes(query);
        const priceMatch = property.price.toString().includes(query); // Ensure price is compared as a string

        return locationMatch || priceMatch; // Include properties that match either location or price
    });

    const handleClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div>
            {/* Property Cards */}
            <div className='property-list'>
                {filteredProperties.map(property => (
                    <div
                        key={property.propertyId}
                        className='property-card-container'
                        onClick={() => handleClick(property.propertyId)}
                    >
                        <div className='property-card'>
                            <h3 className='property-title'>{capitalizeWords(property.propertyName)}</h3>
                            <img src={`data:image/jpeg;base64,${property.propertyImage}`} alt='image' className='property-image' />
                            <p className='property-location'><strong>Location:</strong> {capitalizeWords(property.address)}</p>
                            <p className='property-size'><strong>Size:</strong> {capitalizeWords(property.size)} sq ft</p>
                            <p className='property-price'><strong>Price:</strong> INR {property.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
