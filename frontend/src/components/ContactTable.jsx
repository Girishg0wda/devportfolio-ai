function ContactTable({ contacts }) {
  return (
    <div className="overflow-x-auto mt-8">

      <table className="w-full border border-gray-700">

        <thead className="bg-gray-800">

          <tr>
            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Subject
            </th>

            <th className="p-3 text-left">
              Message
            </th>
          </tr>

        </thead>

        <tbody>

          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="border-t border-gray-700"
            >
              <td className="p-3">
                {contact.name}
              </td>

              <td className="p-3">
                {contact.email}
              </td>

              <td className="p-3">
                {contact.subject}
              </td>

              <td className="p-3">
                {contact.message}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ContactTable;