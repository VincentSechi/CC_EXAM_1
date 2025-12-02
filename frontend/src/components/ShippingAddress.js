import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const limits = {
  street: 120,
  city: 60,
  postalCode: 20,
  country: 56,
};

const sanitizeInput = (value, maxLength) =>
  typeof value === 'string'
    ? value.replace(/[<>]/g, '').trimStart().slice(0, maxLength)
    : '';

const ShippingAddress = () => {
  const { shippingAddress, dispatch } = useCart();
  const [street, setStreet] = useState(shippingAddress.street || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeInput(value, limits[name] || 120);

    dispatch({
      type: 'SET_SHIPPING_ADDRESS',
      payload: {
        ...shippingAddress,
        [name]: sanitizedValue,
      },
    });

    switch (name) {
      case 'street':
        setStreet(sanitizedValue);
        break;
      case 'city':
        setCity(sanitizedValue);
        break;
      case 'postalCode':
        setPostalCode(sanitizedValue);
        break;
      case 'country':
        setCountry(sanitizedValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Adresse de livraison</h3>
      <div className="space-y-2">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Rue
          </label>
          <input 
            type="text" 
            id="street" 
            name="street" 
            value={street} 
            onChange={handleAddressChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            maxLength={limits.street}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ville
          </label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            value={city} 
            onChange={handleAddressChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            maxLength={limits.city}
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Code Postal
          </label>
          <input 
            type="text" 
            id="postalCode" 
            name="postalCode" 
            value={postalCode} 
            onChange={handleAddressChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            maxLength={limits.postalCode}
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Pays
          </label>
          <input 
            type="text" 
            id="country" 
            name="country" 
            value={country} 
            onChange={handleAddressChange} 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
            maxLength={limits.country}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
