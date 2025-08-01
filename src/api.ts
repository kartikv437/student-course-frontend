import axios from 'axios';
import BASE_URL from './config';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const publicEndpoints = [
  '/auth/signup',
  '/auth/login',
  '/auth/verify-otp',
  '/auth/resend-otp',
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  const isPublic = publicEndpoints.some((url) =>
    config.url?.includes(url)
  );

  if (!isPublic && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Helpers
export const signup = (email: string, password: string) =>
  api.post('/auth/signup', { email, password });

export const verifyOtp = (otp: string) =>
  api.post('/auth/verify-otp', { otp });

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const resendOtp = (email: string) =>
  api.post('/auth/resend-otp', { email });

export const submitApplication = (applicationData: any) => 
  api.post('/submit-application', applicationData);

export const getUserApplication = () => 
  api.get('/my-applications');

export const updateApplication = (data: any) =>
  api.put('/update-application', data);

export const uploadDocuments = (formData: FormData) =>
  api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateDocuments = (formData: FormData) =>
  api.put('/update-documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
export const getUserDocuments = () =>
  api.get('/get-documents');



