import { Handlers, PageProps } from "$fresh/server.ts";
import ContactList from "../components/ContactList.tsx";
import ChatBox from "../islands/ChatBox.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const contactId = url.searchParams.get("contactId");

    const res = await fetch("https://back-a-p4.onrender.com/contacts");
    const resJson = await res.json();
    console.log("CONTACTS RESPONSE:", resJson);
    const contacts = Array.isArray(resJson.data) ? resJson.data : [];

    return ctx.render({ contacts, contactId });
  },
};

export default function Home({ data }: PageProps) {
  console.log("DATA EN Home:", data);
  const contacts = Array.isArray(data.contacts) ? data.contacts : [];

  return (
    <div class="flex h-screen font-sans">
      <div class="w-1/5 overflow-y-scroll border-r p-2 bg-gray-100">
        <a href="/create" class="block mb-4 p-2 bg-blue-300 rounded text-center">Crear contacto</a>
        <ContactList contacts={contacts} />
      </div>
      <div class="w-4/5 flex flex-col">
        <ChatBox contacts={contacts} selectedId={data.contactId} />
      </div>
    </div>
  );
}