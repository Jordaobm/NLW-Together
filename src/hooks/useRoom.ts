import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { database } from "../services/firebase";

interface Question {
  id: string;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  author: {
    name: string;
    avatar: string;
  };
  likeCount: number;
  likeId: string | undefined;
}

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

interface useRoomProps {
  roomId: string;
}

export function useRoom({ roomId }: useRoomProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;

      const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(
        ([key, value]: any) => {
          const data = {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value?.likes ?? {}).length ?? 0,
            likeId: Object.entries(value?.likes ?? {}).find(
              ([key, like]: any) => like.authorId === user?.id
            )?.[0],
          };

          console.log(data);

          return data;
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

      return () => {
        roomRef.off("value");
      };
    });
  }, [roomId, user?.id]);

  return { questions, title };
}
