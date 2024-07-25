import axios from 'axios';
import { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};
