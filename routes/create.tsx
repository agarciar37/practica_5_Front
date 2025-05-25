import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const nombre = form.get("nombre");
    const correo = form.get("correo");
    const telefono = form.get("telefono");

    await fetch("https://back-a-p4.onrender.com/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nombre, email: correo, phone: telefono }),
    });

    return new Response(null, {
      status: 303,
      headers: { Location: "/" },
    });
  },
};

export default function CreateContactPage() {
  return (
    <form method="POST" class="flex flex-col p-4 space-y-2">
      <input name="nombre" type="text" placeholder="Nombre" class="border p-2" required />
      <input name="correo" type="email" placeholder="Correo" class="border p-2" required />
      <input name="telefono" type="tel" placeholder="Teléfono" class="border p-2" required />
      <button type="submit" class="bg-green-400 p-2 rounded">Crear</button>
    </form>
  );
}