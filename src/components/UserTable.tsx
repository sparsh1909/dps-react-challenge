import React from 'react';
import { User } from '../types';

interface UserTableProps {
  users: User[];
  sortColumn: keyof User;
  sortAsc: boolean;
  onSort: (column: keyof User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, sortColumn, sortAsc, onSort }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', border: '2px solid #007bff', backgroundColor: 'white' }}>
    <thead>
      <tr>
        <th
          style={{
            padding: '12px',
            borderBottom: '2px solid #007bff',
            textAlign: 'left',
            backgroundColor: '#e9f4ff',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => onSort('firstName')}
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
            }}
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
          }}
        >
          City
        </th>
        <th
          style={{
            padding: '12px',
            borderBottom: '2px solid #007bff',
            textAlign: 'left',
            backgroundColor: '#e9f4ff',
          }}
        >
          Birthday
        </th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id} style={{ backgroundColor: user.isOldest ? 'lightblue' : 'transparent' }}>
          <td style={{ padding: '12px' }}>{user.firstName} {user.lastName}</td>
          <td style={{ padding: '12px' }}>{user.address.city || 'No city'}</td>
          <td style={{ padding: '12px' }}>{formatDate(user.birthDate)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Utility function to format date as dd.mm.yyyy
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default UserTable;
