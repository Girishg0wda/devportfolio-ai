import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ContactTable from "../components/ContactTable";
import { getContacts } from "../services/contactService";

function Messages() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Messages
      </h1>

      <ContactTable contacts={contacts} />
    </DashboardLayout>
  );
}

export default Messages;