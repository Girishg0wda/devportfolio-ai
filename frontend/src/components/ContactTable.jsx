function ContactTable({ contacts, onMarkAsRead }) {
  if (!contacts.length) {
    return (
      <p className="text-gray-400">
        No messages yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-t border-gray-700 hover:bg-gray-900 transition"
            >
              <td className="p-3">{contact.name}</td>

              <td className="p-3">{contact.email}</td>

              <td className="p-3">{contact.subject}</td>

              <td className="p-3 max-w-sm break-words">
                {contact.message}
              </td>

              <td className="p-3 text-center">
                {contact.is_read ? (
                  <span className="inline-block rounded bg-green-600 px-3 py-1 text-sm">
                    ✓ Read
                  </span>
                ) : (
                  <button
                    onClick={() => onMarkAsRead(contact.id)}
                    className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-700 transition"
                  >
                    Mark as Read
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;