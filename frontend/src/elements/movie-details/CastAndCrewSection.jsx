import "../../css/CastAndCrewSection.css";
import Card from "../common/Card";
import { getCastInfo } from "../../utils/APIHelper";
import { useNavigate } from "react-router-dom";

function CastAndCrewSection({ title, data }) {
  const navigate = useNavigate();

  const onCastCardClicked = async (data) => {
    console.log("id", data.id);
    const castData = await getCastInfo(data.id);
    sessionStorage.setItem("castInfo", JSON.stringify(castData));
    navigate(`/cast/${castData.id}`);
  };

  return (
    <div className='member-section mt-4'>
      <h2 className='display-5 text-Secondary section-heading'>{title}</h2>
      <div className='overflow-scroll d-flex flex-row scrollbar-hidden'>
        {data
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          )
          .map((member) => (
            <div className='card-container' key={member.id}>
              <Card data={member} onCardClicked={onCastCardClicked} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CastAndCrewSection;
