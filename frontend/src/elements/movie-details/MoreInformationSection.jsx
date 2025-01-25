import React from "react";
import "../../css/MoreInformationSection.css";
import GenreButton from "./GenreButton";

function MoreInformationSection({ movie, extraInfo }) {
  return (
    <div className='more-information-section'>
      <div className='container'>
        <table className='info-table'>
          <tbody>
            {/* Released Date */}
            {extraInfo.Released && (
              <tr>
                <td>
                  <strong>Released:</strong>
                </td>
                <td>{extraInfo.Released}</td>
              </tr>
            )}

            {/* Budget */}
            {movie.budget > 0 && (
              <tr>
                <td>
                  <strong>Budget:</strong>
                </td>
                <td>${Number(movie.budget).toLocaleString()}</td>
              </tr>
            )}

            {/* Revenue / Box Office */}
            {movie.revenue > 0 && (
              <tr>
                <td>
                  <strong>Box Office:</strong>
                </td>
                <td>${Number(movie.revenue).toLocaleString()}</td>
              </tr>
            )}

            {/* Country */}
            {extraInfo.Country && (
              <tr>
                <td>
                  <strong>Country:</strong>
                </td>
                <td>{extraInfo.Country}</td>
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
