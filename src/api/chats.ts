import { fetchAPI } from './fetchAPI';

export interface ChatPreview {
  id: string;
  title: string;
  message: string;
}

export const getChatPreview = async (id: string) => {
  return fetchAPI(`/chats/preview/${id}`, 'GET');
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
