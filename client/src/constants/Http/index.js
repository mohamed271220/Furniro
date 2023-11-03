import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();




export async function getProducts({ signal, searchTerm, max }) {
  let url = "http://localhost:4000/shop/products";

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
  const response = await fetch(`http://localhost:4000/shop/products/${id}`, {
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
export async function getPosts({ signal, searchTerm, tag }) {
  let url = "http://localhost:4000/post";

  if (searchTerm && tag) {
    url += "?search=" + searchTerm + "&tag=" + tag;
  }
  else if (searchTerm) {
    url += "?search=" + searchTerm;
  }
  else if (tag) {
    url += "?tag=" + tag;
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



