import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import StatCard from "../components/StatCard";
import { getContacts } from "../services/contactService";
import ContactTable from "../components/ContactTable";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
    const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

 useEffect(() => {
  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchContacts();
}, []);

  return (
    <DashboardLayout>
        <div className="p-8">
        <h1>Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
            <StatCard
            title="Projects"
            value={stats.projects}
            />

            <StatCard
            title="Contacts"
            value={stats.contacts}
            />

            <StatCard
            title="Users"
            value={stats.users}
            />
        </div>
        <Link
    to="/dashboard/projects"
    className="
        inline-block
        mt-6
        bg-blue-600
        px-6
        py-3
        rounded-lg
    "
    >
    Manage Projects
    </Link>
        <h2 className="text-3xl mt-10 mb-4">
    Recent Messages
    </h2>

    <ContactTable contacts={contacts} />
        </div>
    </DashboardLayout>
  );
}

export default Dashboard;