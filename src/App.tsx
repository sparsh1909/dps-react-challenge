import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: Address;
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
  isOldest?: boolean;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [debouncedNameFilter, setDebouncedNameFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [highlightOldest, setHighlightOldest] = useState(false);

  useEffect(() => {
    axios.get('https://dummyjson.com/users').then(response => {
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    });
  }, []);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 1000); // 1 second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [nameFilter]);

  useEffect(() => {
    let filtered = users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(debouncedNameFilter.toLowerCase())
    );
    if (cityFilter) {
      filtered = filtered.filter(user => user.address.city === cityFilter);
    }

    if (highlightOldest) {
      const oldestInCity: { [key: string]: User } = {};
      filtered.forEach(user => {
        const birthDate = new Date(user.birthDate);
        const city = user.address.city;

        if (!oldestInCity[city] || birthDate < new Date(oldestInCity[city].birthDate)) {
          oldestInCity[city] = user;
        }
      });

      filtered = filtered.map(user => ({
        ...user,
        isOldest: oldestInCity[user.address.city]?.id === user.id,
      }));
    } else {
      filtered = filtered.map(user => ({ ...user, isOldest: false }));
    }

    setFilteredUsers(filtered);
  }, [debouncedNameFilter, cityFilter, users, highlightOldest]);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  };

  const handleHighlightOldestChange = () => {
    setHighlightOldest(!highlightOldest);
  };

  const cities = useMemo(() => Array.from(new Set(users.map(user => user.address.city))), [users]);

  // Function to format date as dd.mm.yyyy
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div style={{ padding: '20px', width: '100vw', boxSizing: 'border-box', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      {/* Header Section */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Customer Relationship Management</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEKZQ9Vdz9ul02y0LINkg7OcLWwNV0kkbXQ&s" 
          alt="Logo"
          style={{ borderRadius: '10%', width: '50px', height: '50px' }}
        />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', width: '100%' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={nameFilter}
              onChange={handleNameFilterChange}
              style={{ padding: '10px', fontSize: '16px', width: '100%', backgroundColor: 'white', border: '2px solid #007bff', borderRadius: '8px' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>City:</label>
            <select 
              value={cityFilter} 
              onChange={handleCityFilterChange} 
              style={{ padding: '10px', fontSize: '16px', width: '100%', backgroundColor: 'white', border: '2px solid #007bff', borderRadius: '8px', appearance: 'auto' }}
            >
              <option value="">Select city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '25px' }}>
            <label style={{ marginRight: '0px', whiteSpace: 'nowrap' }}>
              Highlight oldest per city
            </label>
            <input
              type="checkbox"
              checked={highlightOldest}
              onChange={handleHighlightOldestChange}
            />
          </div>
        </div>
      </div>
      <div style={{ overflow: 'hidden', borderRadius: '8px', border: '2px solid #007bff', backgroundColor: 'white' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', borderBottom: '2px solid #007bff', textAlign: 'left', backgroundColor: '#e9f4ff', borderTopLeftRadius: '8px' }}>Name</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #007bff', textAlign: 'left', backgroundColor: '#e9f4ff' }}>City</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #007bff', textAlign: 'left', backgroundColor: '#e9f4ff', borderTopRightRadius: '8px' }}>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ backgroundColor: user.isOldest ? 'lightblue' : 'transparent' }}>
                <td style={{ padding: '12px' }}>{user.firstName} {user.lastName}</td>
                <td style={{ padding: '12px' }}>{user.address.city || 'No city'}</td>
                <td style={{ padding: '12px' }}>{formatDate(user.birthDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
