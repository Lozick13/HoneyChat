import { URL } from './url';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// fetchAPI for making HTTP requests
const fetchAPI = async (url: string, method: string, body: object) => {
  const response = await fetch(`${URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

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
