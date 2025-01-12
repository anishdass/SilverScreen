import { createContext, useState, useContext, useEffect } from "react";

const CommentContext = createContext();

export const useCommentContext = () => useContext(CommentContext);

export const CommentProvider = ({ children }) => {
  const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };

  const [likedComment, setLikedComment] = useLocalStorage("liked", []);
  const [dislikedComment, setDislikedComment] = useLocalStorage("disliked", []);

  const likeComment = (commentId) => {
    if (!likedComment.includes(commentId)) {
      setLikedComment((prevLiked) => [...prevLiked, commentId]);

      setDislikedComment((prevDisliked) =>
        prevDisliked.filter((id) => id !== commentId)
      );
    }
  };

  const dislikeComment = (commentId) => {
    if (!dislikedComment.includes(commentId)) {
      setDislikedComment((prevDisliked) => [...prevDisliked, commentId]);

      setLikedComment((prevLiked) =>
        prevLiked.filter((id) => id !== commentId)
      );
    }
  };

  const isLiked = (commentId) => likedComment.includes(commentId);

  const isDisliked = (commentId) => dislikedComment.includes(commentId);

  const value = {
    likedComment,
    setLikedComment,
    dislikedComment,
    setDislikedComment,
    likeComment,
    dislikeComment,
    isLiked,
    isDisliked,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
