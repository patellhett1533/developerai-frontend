export const post_api = async (url: string, data: unknown, headers?: { [key: string]: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const get_api = async (url: string, headers?: { [key: string]: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application",
        ...headers,
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const put_api = async (url: string, data: unknown, headers?: { [key: string]: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application",
        ...headers,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const delete_api = async (url: string, headers?: { [key: string]: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application",
        ...headers,
      },
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
