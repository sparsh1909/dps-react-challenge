import React, { useState, useEffect, useMemo } from 'react';
import { fetchUsers } from './api/userApi';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Filters from './components/Filters';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import { User } from './types';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [debouncedNameFilter, setDebouncedNameFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [highlightOldest, setHighlightOldest] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof User>('firstName');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const users = await fetchUsers();
        setUsers(users);
        setFilteredUsers(users);
      } catch {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedNameFilter(nameFilter), 1000);
    return () => clearTimeout(handler);
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

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortAsc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [debouncedNameFilter, cityFilter, users, highlightOldest, sortColumn, sortAsc]);

  const cities = useMemo(() => Array.from(new Set(users.map(user => user.address.city))), [users]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  return (
    <div className="app-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Header />
      <Filters
        nameFilter={nameFilter}
        cityFilter={cityFilter}
        highlightOldest={highlightOldest}
        cities={cities}
        onNameChange={e => setNameFilter(e.target.value)}
        onCityChange={e => setCityFilter(e.target.value)}
        onHighlightChange={() => setHighlightOldest(!highlightOldest)}
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <UserTable
            users={filteredUsers.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)}
            sortColumn={sortColumn}
            sortAsc={sortAsc}
            onSort={handleSort}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / resultsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default App;
