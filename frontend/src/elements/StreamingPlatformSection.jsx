import {
  DEFAULT_PROFILE_IMAGE,
  IMAGE_BASE_URL,
  LOGO_PATH_KEY,
  STREAMING_KEY,
} from "../utils/constants";

function StreamingPlatformSection({ streamingData, currentCountry }) {
  const renderStreamingPlatforms = () =>
    streamingData[currentCountry]?.[STREAMING_KEY]?.length > 0 ? (
      streamingData[currentCountry][STREAMING_KEY].map((platform) => (
        <img
          key={platform.display_priority}
          className='streaming-platform img'
          src={
            platform[LOGO_PATH_KEY]
              ? `${IMAGE_BASE_URL}w500${platform[LOGO_PATH_KEY]}`
              : DEFAULT_PROFILE_IMAGE
          }
          alt={platform.name || "Streaming Platform"}
        />
      ))
    ) : (
      <p>Not Streaming in your country</p>
    );
  return (
    <div className='streaming-platforms'>{renderStreamingPlatforms()}</div>
  );
}

export default StreamingPlatformSection;
