import axios from 'axios';
import BASE_URL from './config';
 
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Helpers
export const signup = (email: string, password: string) =>
  api.post('/auth/signup', { email, password });

export const verifyOtp = (email: string, otp: string) =>
  api.post('/auth/verify-otp', { email, otp });

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const submitApplication = (applicationData: string) =>
  api.post('/submit-application', applicationData);

export const uploadDocuments = (formData: FormData) =>
  api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });