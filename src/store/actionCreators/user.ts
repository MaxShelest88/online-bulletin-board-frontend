import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import LoginAndRegistrationData from '../../models/LoginAndRegistrationData';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: LoginAndRegistrationData, thunkAPI) => {
    try {
      const { data: { token } } = await axios.post(`${process.env.API_URL}user/login`, {
        email,
        password,
      });
      localStorage.setItem('JWT', token);
      const decode = jwtDecode(token);
      return decode;
    } catch (e) {
      return thunkAPI.rejectWithValue('Пользователь не найден');
    }
  },
);

export const registration = createAsyncThunk(
  'user/registration',
  async ({ email, password }: LoginAndRegistrationData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${process.env.API_URL}user/registration`, {
        email,
        password,
      });
      localStorage.setItem('JWT', data.token);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue('error');
    }
  },
);