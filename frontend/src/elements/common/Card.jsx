import {
  IMAGE_BASE_URL,
  POSTER_PATH_KEY,
  DEFAULT_PROFILE_IMAGE,
  DEFAULT_POSTER_IMAGE,
  IMAGE_PATH_KEY,
} from "../../utils/constants";
import "../../css/Card.css";

function Card({ data, onCardClicked, cardType }) {
  const DEFAULT_IMAGE = cardType ? DEFAULT_POSTER_IMAGE : DEFAULT_PROFILE_IMAGE;

  const imageUrl = data[POSTER_PATH_KEY]
    ? `${IMAGE_BASE_URL}w500${data[POSTER_PATH_KEY]}`
    : data[IMAGE_PATH_KEY]
    ? `${IMAGE_BASE_URL}w500${data[IMAGE_PATH_KEY]}`
    : DEFAULT_IMAGE;

  return (
    <div className='card' key={data.id} onClick={() => onCardClicked(data)}>
      <img
        className='card-image'
        src={imageUrl}
        alt={data.title || data.name || "Untitled"}
      />
      <h4 className='card-title'>{data.title || data.name || "Untitled"}</h4>
      <h4 className='card-title'>
        {data.cast_id ? `as ${data.character}` : data.job}
      </h4>
    </div>
  );
}

export default Card;
