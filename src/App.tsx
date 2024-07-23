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

    setFilteredUsers(filtered);
  }, [debouncedNameFilter, cityFilter, users, highlightOldest]);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  };


  const cities = useMemo(() => Array.from(new Set(users.map(user => user.address.city))), [users]);

  return (
    <div style={{ padding: '20px', width: '100vw', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', width: '100%' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block' }}>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={nameFilter}
              onChange={handleNameFilterChange}
              style={{ padding: '8px', fontSize: '16px', width: '150px' , backgroundColor: 'white', 
			  border: '2px solid #000', 
			  borderRadius: '4px'  }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block' }}>City:</label>
            <select value={cityFilter} onChange={handleCityFilterChange} style={{ padding: '8px', fontSize: '16px', width: '150px', backgroundColor: 'white', border: '2px solid #000', borderRadius: '4px' }}>  
              <option value="">Select city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', borderBottom: '2px solid white', borderRight: '2px solid white', textAlign: 'left', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>Name</th>
              <th style={{ padding: '8px', borderBottom: '2px solid white', borderRight: '2px solid white', textAlign: 'left' }}>City</th> 
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid white', borderRight: '1px solid white' }}>{user.firstName} {user.lastName}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid white', borderRight: '1px solid white' }}>{user.address.city || 'No city'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}></td>
            </tr>
          </tfoot>
        </table>
    </div>
  );
};

export default App;

