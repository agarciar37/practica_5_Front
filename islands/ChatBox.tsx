import { useEffect, useState } from "preact/hooks";

interface Message {
  mensaje: string;
  isContactMessage: boolean;
  contactoId: string;
}

interface Contact {
  _id: string;
  name: string;
  phone: string;
  chatId: string;
}

export default function ChatBox({ contacts, selectedId }: { contacts: Contact[]; selectedId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const selectedContact = contacts.find(c => c.chatId === selectedId);

  useEffect(() => {
    if (!selectedId) return;
    fetch(`https://back-a-p4.onrender.com/messages/contact/${selectedId}`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [selectedId]);

  const sendMessage = async () => {
    if (!input || !selectedId) return;
    const newMessage = { mensaje: input, isContactMessage: false, contactoId: selectedId };
    setMessages((prev) => [...prev, newMessage]);
    console.log("Enviando mensaje:", newMessage);
    const response = await fetch("https://back-a-p4.onrender.com/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    const result = await response.json();
    console.log("Respuesta del backend:", result);
    setInput("");
  };

  if (!selectedContact) {
    return <div class="p-4 text-gray-500">Selecciona un contacto para comenzar el chat.</div>;
  }

  return (
    <div class="flex flex-col h-full">
      <div class="border-b p-4 bg-gray-50">
        <div class="font-bold text-lg">{selectedContact.name}</div>
        <div class="text-sm text-gray-500">{selectedContact.phone}</div>
      </div>

      <div class="flex-1 overflow-y-scroll p-2 bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            class={`p-2 m-1 rounded max-w-xs ${
              msg.isContactMessage ? "bg-gray-300 self-start" : "bg-blue-300 self-end"
            }`}
          >
            {msg.mensaje}
          </div>
        ))}
      </div>

      <div class="p-2 border-t flex bg-gray-50">
        <input
          type="text"
          class="flex-1 p-2 border rounded"
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu mensaje"
        />
        <button onClick={sendMessage} class="ml-2 p-2 bg-blue-400 text-white rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}
