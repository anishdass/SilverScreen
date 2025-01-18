import { getCommentData } from "./DBHelper";

export function getJobList(artistAsCrew) {
  return [...new Set(artistAsCrew.map((data) => data.job))];
}

export function getCommentAndTimeSinceUpdate(movie) {
  let comment = "";
  let timeSinceUpdate = "";

  const comments = getCommentData();

  if (comments.length > 0) {
    const filteredComments = comments.filter(
      (comment) => comment.movie_id === movie.id
    );

    if (filteredComments.length > 0) {
      const latestComment = filteredComments.reduce((latest, current) =>
        current.id > latest.id ? current : latest
      );

      comment = latestComment;

      if (comment.date) {
        const commentDate = new Date(comment.date);
        const currentDate = new Date();
        const timeDiff = currentDate - commentDate;

        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
          timeSinceUpdate = `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
          timeSinceUpdate = `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (minutes > 0) {
          timeSinceUpdate = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else {
          timeSinceUpdate = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
        }
      }
    }
  }
  return { comment, timeSinceUpdate };
}

export function storeComment(comment, movie) {
  if (comment.trim()) {
    const storedComments = getCommentData();
    console.log(storedComments);

    const newComment = {
      id: Date.now(),
      movie_id: movie.id,
      text: comment,
      date: new Date().toISOString(),
    };

    storedComments.push(newComment);

    localStorage.setItem("comments", JSON.stringify(storedComments));
  }
}
