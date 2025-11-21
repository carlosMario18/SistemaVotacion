import { useState } from "react";
import { createPoll } from "../api/polls";
import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]); // Empieza con 2
  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async () => {
    // Filtrar opciones vacías
    const cleanedOptions = options.filter((opt) => opt.trim() !== "");

    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    if (cleanedOptions.length < 2) {
      alert("Debes ingresar al menos 2 opciones válidas");
      return;
    }

    const response = await createPoll({
      title,
      options: cleanedOptions.map((o) => ({ text: o })),
    });

    const pollId = response.data.id;

    alert("Encuesta creada!");
    navigate(`/polls/${pollId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Encuesta</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
      />

      <h3>Opciones:</h3>
      {options.map((o, i) => (
        <input
          key={i}
          placeholder={`Opción ${i + 1}`}
          value={o}
          onChange={(e) =>
            setOptions((prev) => {
              const copy = [...prev];
              copy[i] = e.target.value;
              return copy;
            })
          }
          style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
        />
      ))}

      {/* Botón para añadir nueva opción */}
      <button
        onClick={addOption}
        style={{
          padding: "8px 12px",
          background: "#4A90E2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + Agregar opción
      </button>

      <br />

      {/* Botón para guardar */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Guardar
      </button>
    </div>
  );
}
