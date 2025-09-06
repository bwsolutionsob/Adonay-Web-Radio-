import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPanel() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica se admin está logado
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin");
        return;
      }

      const userId = data.session.user.id;
      const { data: adminData } = await supabase
        .from("admins")
        .select("*")
        .eq("id", userId)
        .single();

      if (!adminData) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel do Administrador</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Registrar novo admin
      </button>

      {showModal && <RegisterAdminModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function RegisterAdminModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    setLoading(true);

    try {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("Você precisa estar logado como admin.");

      const res = await fetch("/functions/v1/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      alert("Novo admin criado com sucesso!");
      onClose();
    } catch (err: any) {
      setError(err.message || "Erro ao criar admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded shadow-lg flex flex-col gap-3 w-96">
        <h2 className="text-xl font-bold">Registrar novo admin</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancelar
          </button>
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Criando..." : "Registrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
