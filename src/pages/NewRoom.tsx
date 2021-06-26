import ilustration from "../assets/illustration.svg";
import logo from "../assets/logo.svg";
import "../styles/Auth.scss";
import { Button } from "../components/Button";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState("");

  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    console.log(newRoom);

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      autherId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={ilustration} alt="ilustration" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Logo" />
          <h2>Criar uma nova sala</h2>
          <form action="" onSubmit={(event) => handleCreateRoom(event)}>
            <input
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
              type="text"
              placeholder="Nome da sala"
            />
            <Button>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
