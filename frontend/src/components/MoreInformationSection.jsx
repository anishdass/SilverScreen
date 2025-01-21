import React from "react";
import "../css/MoreInformationSection.css";
import GenreButton from "../elements/GenreButton";

function MoreInformationSection({ movie, ratingsData }) {
  if (!ratingsData || ratingsData.Response === "False") {
    return <p className='no-info-text'>No information available.</p>;
  }

  return (
    <div className='more-information-section'>
      <div className='container'>
        <table className='info-table'>
          <tbody>
            {/* Released Date */}
            {ratingsData.Released && (
              <tr>
                <td>
                  <strong>Released:</strong>
                </td>
                <td>{ratingsData.Released}</td>
              </tr>
            )}

            {/* Budget */}
            {movie.budget && movie.budget > 0 && (
              <tr>
                <td>
                  <strong>Budget:</strong>
                </td>
                <td>${movie.budget.toLocaleString()}</td>
              </tr>
            )}

            {/* Revenue / Box Office */}
            {movie.revenue && movie.revenue > 0 && (
              <tr>
                <td>
                  <strong>Box Office:</strong>
                </td>
                <td>${movie.revenue.toLocaleString()}</td>
              </tr>
            )}

            {/* Country */}
            {ratingsData.Country && (
              <tr>
                <td>
                  <strong>Country:</strong>
                </td>
                <td>{ratingsData.Country}</td>
              </tr>
            )}

            {/* Production Companies */}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <tr>
                  <td>
                    <strong>Production Companies:</strong>
                  </td>
                  <td>
                    {movie.production_companies.map((company, index) => (
                      <div key={index}>{company.name}</div>
                    ))}
                  </td>
                </tr>
              )}

            {/* Keywords */}
            {movie.keywords && movie.keywords.length > 0 && (
              <tr>
                <td>
                  <strong>Vibe:</strong>
                </td>
                <td>
                  <GenreButton genreObj={movie.keywords} type='keyword' />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MoreInformationSection;
