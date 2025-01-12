import Card from "../elements/Card";
import { getCastInfo } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import "../css/CastAndCrewSection.css";

function CastAndCrewSection({ title, data }) {
  const navigate = useNavigate();

  const onCastCardClicked = async (e) => {
    const castData = await getCastInfo(e.id);
    sessionStorage.setItem("castInfo", JSON.stringify(castData));
    navigate(`/cast/${castData.id}`);
  };

  return (
    <div className='cast-section mt-4'>
      <h2 className='display-5 text-Secondary section-heading'>{title}</h2>
      <div className='overflow-scroll d-flex flex-row scrollbar-hidden cast-and-crew-section'>
        {data
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          )
          .map((cast) => (
            <Card data={cast} onCardClicked={onCastCardClicked} key={cast.id} />
          ))}
      </div>
    </div>
  );
}

export default CastAndCrewSection;
