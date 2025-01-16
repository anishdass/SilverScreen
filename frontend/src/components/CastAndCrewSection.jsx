import Card from "../elements/Card";
import { getCastInfo } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import "../css/CastAndCrewSection.css";

function CastAndCrewSection({ title, data }) {
  const navigate = useNavigate();

  const onCastCardClicked = async (id) => {
    const castData = await getCastInfo(id);
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
              <Card data={member} />
              <div
                className='overlay'
                onClick={() => onCastCardClicked(member.id)}>
                <span className='overlay-text'>
                  {member.cast_id ? member.name : member.job}
                </span>{" "}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CastAndCrewSection;
