import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPoll, vote } from "../api/polls";

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  const load = async () => {
    const response = await getPoll(id);
    setPoll(response.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleVote = async (option_id) => {
    await vote(id, option_id);
    alert("Voto registrado!");
    load();
  };

  if (!poll) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{poll.title}</h2>
      {poll.options.map((option) => (
        <div key={option.id}>
          <span>{option.text} - {option.votes} votos</span>
          <button onClick={() => handleVote(option.id)}>Votar</button>
        </div>
      ))}
    </div>
  );
}
