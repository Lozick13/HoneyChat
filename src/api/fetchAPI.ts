//fetchAPI for making HTTP requests
export const fetchAPI = async (url: string, method: string, body?: object) => {
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
