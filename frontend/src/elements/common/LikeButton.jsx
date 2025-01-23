import { useState } from "react";
import "../../css/LikeButton.css";
import LikeIcon from "../../icons/LikeIcon";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  const onLiked = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <button
      className={`like-button ${liked ? "active" : ""}`}
      onClick={onLiked}>
      <LikeIcon />
    </button>
  );
}

export default LikeButton;
