import PillButton from "./PillButton";

function AdditionalInformationSection({ movie, ratingsData }) {
  return (
    <div className='aditional-information'>
      <div className='language'>
        {movie.spoken_languages &&
          movie.spoken_languages.map((language, index) => (
            <PillButton key={index} data={language.english_name} />
          ))}
      </div>
      {ratingsData.Runtime && <PillButton data={ratingsData.Runtime} />}
      {ratingsData.Rated && <PillButton data={ratingsData.Rated} />}
    </div>
  );
}

export default AdditionalInformationSection;
