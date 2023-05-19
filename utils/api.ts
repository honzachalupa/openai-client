export const callAPI = (
    method: "GET" | "POST" | "PATCH" | "DELETE",
    path: string,
    data?: {
        params?: {
            [key: string]: string | boolean;
        };
        body?: {
            [key: string]: any;
        };
    }
) => {
    const url = new URL(process.env.NEXT_PUBLIC_ADMIN_API_URL + path);

    if (data?.params) {
        Object.entries(data.params).forEach(([key, value]) => {
            url.searchParams.set(key, value.toString());
        });
    }

    return fetch(url, {
        method,
        body: data?.body && JSON.stringify(data.body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
};
