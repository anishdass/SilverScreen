import PillButton from "../common/PillButton";
import "../../css/AdditionalInformationSection.css";

function AdditionalInformationSection({ movie, extraInfo }) {
  return (
    <div className='aditional-information'>
      <div className='language'>
        {movie.spoken_languages &&
          movie.spoken_languages.map((language, index) => (
            <PillButton key={index} data={language.english_name} />
          ))}
      </div>
      {extraInfo.Runtime && extraInfo.Runtime !== "N/A" && (
        <PillButton data={extraInfo.Runtime} />
      )}
      {extraInfo.Rated && extraInfo.Rated !== "N/A" && (
        <PillButton data={extraInfo.Rated} />
      )}
    </div>
  );
}

export default AdditionalInformationSection;
