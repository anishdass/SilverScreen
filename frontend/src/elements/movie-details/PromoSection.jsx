import "../../css/PromoSection.css";
import HDIcon from "../../icons/HDIcon";
import YouTubePlayIcon from "../../icons/YouTubePlayIcon";

function PromoSection({ videos }) {
  return (
    <>
      <div className='promotional-material-section mt-4'></div>

      <div className='d-flex flex-row overflow-auto'>
        {videos.map((video) => (
          <div className='card mx-2' key={video.id}>
            <div className='card-image-wrapper'>
              <img
                src={`https://img.youtube.com/vi/${
                  video.key ? video.key : video.id.videoId
                }/hqdefault.jpg`}
                className='card-img-top'
                alt={video.name}
              />
              <div className='hd-icon-wrapper'>
                <HDIcon />
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${
                  video.key ? video.key : video.id.videoId
                }`}
                target='_blank'
                rel='noopener noreferrer'
                className='play-button-link'>
                <YouTubePlayIcon />
              </a>
            </div>

            <div className='card-body'>
              <h5 className='card-title'>
                {video.type || video.snippet.channelTitle}
              </h5>
              <p className='card-text'>
                {video.name ||
                  video.snippet.title ||
                  "This is a teaser trailer."}
              </p>
            </div>
            <div className='card-footer'>
              <small className='text-body-secondary'>
                Published on{" "}
                {new Date(
                  video.published_at
                    ? video.published_at
                    : video.snippet.publishedAt
                ).toDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PromoSection;
