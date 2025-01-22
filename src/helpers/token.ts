import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  exp: number;
  id: string;
  name: string;
  email: string;
  chats: string[];
}



// validation check
export const isTokenValid = (
  token: string | null,
): { valid: boolean; data?: DecodedToken } => {
  if (!token) return { valid: false };

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const isValid = decoded.exp > currentTime;

    return { valid: isValid, data: isValid ? decoded : undefined };
  } catch (error) {
    console.error('Invalid token:', error);
    return { valid: false };
  }
};

// decode token
export const decodedToken = (token: string): DecodedToken => {
  const decoded: DecodedToken = jwtDecode(token);
  return decoded;
};
