import React, { useState, useEffect } from 'react';
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
	const [nameFilter, setNameFilter] = useState('');
  
	useEffect(() => {
	  axios.get('https://dummyjson.com/users').then(response => {
		setUsers(response.data.users);
	  });
	}, []);
  
	const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	  setNameFilter(e.target.value);
	};
  
	const filteredUsers = users.filter(user =>
	  `${user.firstName} ${user.lastName}`.toLowerCase().includes(nameFilter.toLowerCase())
	);
  
	return (
	  <div style={{ padding: '20px', width: '100vw', boxSizing: 'border-box' }}>
		<h1>User List</h1>
		<input
		  type="text"
		  placeholder="Name"
		  value={nameFilter}
		  onChange={handleNameFilterChange}
		  style={{ padding: '8px', fontSize: '16px', width: '150px' }}
		/>
		<ul>
		  {filteredUsers.map(user => (
			<li key={user.id}>{user.firstName} {user.lastName}</li>
		  ))}
		</ul>
	  </div>
	);
  };
  
  export default App;
