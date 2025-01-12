import { useState } from "react";
import "../css/dislikeButton.css";
import DislikeIcon from "../icons/DislikeIcon";

function DislikeButton() {
  const [disliked, setDisliked] = useState(false);

  const onDisliked = (e) => {
    e.preventDefault();
    setDisliked(!disliked);
  };

  return (
    <button
      className={`dislike-button ${disliked ? "active" : ""}`}
      onClick={onDisliked}>
      <DislikeIcon />
    </button>
  );
}

export default DislikeButton;
