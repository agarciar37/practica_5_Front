interface Contact {
  _id: string;
  name: string;
  phone: string;
  chatId: string;
}

export default function ContactList({ contacts }: { contacts: Contact[] }) {
  if (!Array.isArray(contacts)) {
    return <div class="text-red-500">Error: los contactos no se han recibido correctamente.</div>;
  }

  if (contacts.length === 0) {
    return <div class="text-gray-500">No hay contactos disponibles.</div>;
  }

  return (
    <div class="space-y-2">
      {contacts.map((contact) => (
        <a
          key={contact._id}
          href={`/?contactId=${contact.chatId}`}
          class="block p-2 border rounded bg-white hover:bg-blue-100"
        >
          <div class="font-semibold">{contact.name}</div>
          <div class="text-sm">{contact.phone}</div>
        </a>
      ))}
    </div>
  );
}
