import { useState } from "react";
import "../css/CommentBox.css";
import { storeComment } from "../utils/helper";

function CommentBox({ label, rows, placeholderText, movie }) {
  const [comment, setComment] = useState("");

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeComment(comment, movie);
    setComment("");
    window.history.go(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className='commentBox'>
      <div className='border'>
        <label className='form-label'>{label}</label>
        <textarea
          className='form-control'
          id='commentContent'
          rows={rows}
          placeholder={placeholderText}
          value={comment}
          onChange={handleInput}
          onKeyDown={handleKeyDown}></textarea>
        <button
          className='btn btn-primary mt-2'
          onClick={handleSubmit}
          disabled={!comment.trim()}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default CommentBox;
