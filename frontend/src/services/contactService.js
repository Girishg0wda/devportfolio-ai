import api from "./api";

export const createContact = async (contactData) => {
  const response = await api.post("/contacts/", contactData);
  return response.data;
};

export const getContacts = async () => {
  const response = await api.get("/contacts/");
  return response.data;
};

export const markContactAsRead = async (contactId) => {
  const response = await api.patch(`/contacts/${contactId}/read`);
  return response.data;
};
