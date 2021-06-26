import { ReactNode } from "react";
import "../styles/Question.scss";
import cx from "classnames";

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
}
export function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div
      className={cx("question", {
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered,
      })}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <p>{author.name}</p>
        </div>
        <div className="actions">{children}</div>
      </footer>
    </div>
  );
}
