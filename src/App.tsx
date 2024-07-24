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
  const [sortColumn, setSortColumn] = useState<keyof User | ''>('firstName'); // Default sorting column
  const [sortAsc, setSortAsc] = useState<boolean>(true); // Default to ascending
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true);
    axios.get('https://dummyjson.com/users').then(response => {
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setLoading(false); // Set loading to false after data is fetched
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

    // Sorting logic
    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        let valueA, valueB;

        if (sortColumn === 'firstName') {
          valueA = a.firstName;
          valueB = b.firstName;
        } else if (sortColumn === 'lastName') {
          valueA = a.lastName;
          valueB = b.lastName;
        } else {
          return 0;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [debouncedNameFilter, cityFilter, users, highlightOldest, sortColumn, sortAsc]);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  };

  const handleHighlightOldestChange = () => {
    setHighlightOldest(!highlightOldest);
  };

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc); // Toggle sorting direction
    } else {
      setSortColumn(column); // Set new sort column
      setSortAsc(true); // Default to ascending
    }
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

  const Spinner = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#f0f8ff',
      zIndex: 1000
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderRadius: '50%',
          borderTop: '4px solid #007bff',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p>Loading...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', width: '100vw', boxSizing: 'border-box', backgroundColor: '#f0f8ff', minHeight: '100vh', position: 'relative' }}>
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

      {loading ? (
        <Spinner />
      ) : (
        <div style={{ overflow: 'hidden', borderRadius: '8px', border: '2px solid #007bff', backgroundColor: 'white' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{ 
                    padding: '12px', 
                    borderBottom: '2px solid #007bff', 
                    textAlign: 'left', 
                    backgroundColor: '#e9f4ff', 
                    borderTopLeftRadius: '8px',
                    position: 'relative',
                  }}
                >
                  <span>Name</span>
                  <span
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '14px',
                      color: sortColumn === 'firstName' ? 'black' : '#007bff',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSort('firstName')}
                  >
                    {sortColumn === 'firstName' ? (sortAsc ? '▲' : '▼') : ''}
                  </span>
                </th>
                <th
                  style={{ 
                    padding: '12px', 
                    borderBottom: '2px solid #007bff', 
                    textAlign: 'left', 
                    backgroundColor: '#e9f4ff',
                    position: 'relative',
                  }}
                >
                  <span>City</span>
                </th>
                <th style={{ 
                  padding: '12px', 
                  borderBottom: '2px solid #007bff', 
                  textAlign: 'left', 
                  backgroundColor: '#e9f4ff', 
                  borderTopRightRadius: '8px',
                  position: 'relative',
                }}>
                  <span>Birthday</span>
                </th>
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
      )}
    </div>
  );
};

export default App;
