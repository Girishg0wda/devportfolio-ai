import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ContactTable from "../components/ContactTable";
import { getContacts, markContactAsRead } from "../services/contactService";

function Messages() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setIsLoading(true);

    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      await markContactAsRead(contactId);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, is_read: true } : contact,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">Messages</h1>

      {isLoading ? (
        <p className="text-gray-400">Loading messages...</p>
      ) : (
        <ContactTable contacts={contacts} onMarkAsRead={handleMarkAsRead} />
      )}
    </DashboardLayout>
  );
}

export default Messages;
