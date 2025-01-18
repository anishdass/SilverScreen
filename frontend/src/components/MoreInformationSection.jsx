import React from "react";
import "../css/MoreInformationSection.css";

function MoreInformationSection({ data }) {
  if (!data) {
    return <p>No information available.</p>;
  }

  return (
    <div className='more-information-section'>
      <table className='info-table'>
        <tbody>
          {data.Released && (
            <tr>
              <td>
                <strong>Released:</strong>
              </td>
              <td>{data.Released}</td>
            </tr>
          )}
          {data.BoxOffice && (
            <tr>
              <td>
                <strong>Box Office:</strong>
              </td>
              <td>{data.BoxOffice}</td>
            </tr>
          )}
          {data.Country && (
            <tr>
              <td>
                <strong>Country:</strong>
              </td>
              <td>{data.Country}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MoreInformationSection;
