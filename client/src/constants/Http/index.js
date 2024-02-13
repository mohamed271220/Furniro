import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();




export async function getProducts({ signal, searchTerm, max }) {
  let url = `${import.meta.env.VITE_REACT_APP_API_URL}/shop/products`;

  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    url += "?search=" + searchTerm;
  } else if (max) {
    url += "?max=" + max;
  }

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
}

export async function getProductById({ signal, id }) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/shop/products/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;

}
export async function getPosts({ signal, searchTerm, tag, limit }) {
  let url = new URL(`${import.meta.env.VITE_REACT_APP_API_URL}/post/all`);

  if (searchTerm) {
    url.searchParams.append('search', searchTerm);
  }

  if (tag) {
    url.searchParams.append('tag', tag);
  }

  if (limit) {
    url.searchParams.append('limit', limit);

  }
  const response = await fetch(url.toString(), { signal });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the posts");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function getPostById({ signal, id }) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/post/${id}`, { signal });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the post");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function getOrders({ signal }) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/orders`, {
    signal,
    credentials: 'include',
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the profile");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

export async function getAddresses({ signal }) {
  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/addresses`, {
    signal,
    credentials: 'include',
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the profile");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}

