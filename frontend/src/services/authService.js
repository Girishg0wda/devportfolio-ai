import api from "./api";

export const loginUser = async (
  email,
  password
) => {
  const formData =
    new URLSearchParams();

  formData.append(
    "username",
    email
  );

  formData.append(
    "password",
    password
  );

  const response =
    await api.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

  console.log("AUTH RESPONSE:", JSON.stringify(response.data, null, 2));
console.log("ACCESS TOKEN:", response.data.access_token);

  return response.data;
};