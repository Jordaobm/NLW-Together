import ilustration from "../assets/illustration.svg";
import logo from "../assets/logo.svg";
import googleIconImg from "../assets/google-icon.svg";
import "../styles/Auth.scss";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
export function Home() {
  const history = useHistory();

  const { SignInWithGoogle, user } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await SignInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }
    if (roomRef.val().endedAt) {
      alert("Room already closed");
      return;
    }

    history.push(`rooms/${roomCode}`);
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={(event) => handleJoinRoom(event)}>
            <input
              onChange={(event) => setRoomCode(event.target.value)}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
