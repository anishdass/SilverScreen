import "../css/CommentArea.css";
import LikeButton from "../elements/LikeButton";
import DislikeButton from "../elements/DislikeButton";
import { DEFAULT_PROFILE_IMAGE } from "../utils/constants";
import Divider from "./Divider";
import { getCommentAndTimeSinceUpdate } from "../utils/helper";

function CommentArea({ username, movie }) {
  const { comment, timeSinceUpdate } = getCommentAndTimeSinceUpdate(movie);

  return (
    comment && (
      <>
        <div className='comment-card-group'>
          <div className='comment-card'>
            <div className='profile-section'>
              <img
                className='profile-picture'
                src={
                  username ? username.profile_picture : DEFAULT_PROFILE_IMAGE
                }
                alt='Profile Picture'
              />
              <h6 className='username mb-1'>{username || "@anish"}</h6>
            </div>
            <p className='comment mb-1'>{comment.text}</p>
            <small className='updation-info'>
              Updated {timeSinceUpdate || "just now"}
            </small>
            <div className='actionButtons'>
              <LikeButton />
              <DislikeButton />
            </div>
          </div>
        </div>
        <Divider />
      </>
    )
  );
}

export default CommentArea;
