import { fetchAPI } from './fetchAPI';

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return fetchAPI('/user/register', 'POST', { name, email, password });
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fetchAPI('/user/login', 'POST', { email, password });
};
