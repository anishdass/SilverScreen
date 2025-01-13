import { useMovieContext } from "../contexts/MovieContext";
import "../css/PromoSection.css";

function PromoSection() {
  const { videos } = useMovieContext();
  return (
    <>
      <div className='promotional-material-section mt-4'></div>

      <div className='d-flex flex-row overflow-auto'>
        {videos.map((trailer) => (
          <div className='card mx-2' key={trailer.id}>
            <div className='card-image-wrapper'>
              <img
                src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                className='card-img-top'
                alt={trailer.name}
              />
              <div className='hd-icon-wrapper'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='bi bi-badge-hd hd-icon'
                  viewBox='0 0 16 16'>
                  <path d='M7.396 11V5.001H6.209v2.44H3.687V5H2.5v6h1.187V8.43h2.522V11zM8.5 5.001V11h2.188c1.811 0 2.685-1.107 2.685-3.015 0-1.894-.86-2.984-2.684-2.984zm1.187.967h.843c1.112 0 1.622.686 1.622 2.04 0 1.353-.505 2.02-1.622 2.02h-.843z' />
                  <path d='M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z' />
                </svg>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target='_blank'
                rel='noopener noreferrer'
                className='play-button-link'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-youtube'
                  viewBox='0 0 16 16'>
                  <path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z' />
                </svg>
              </a>
            </div>

            <div className='card-body'>
              <h5 className='card-title'>{trailer.type}</h5>
              <p className='card-text'>
                {trailer.name || "This is a teaser trailer."}
              </p>
            </div>
            <div className='card-footer'>
              <small className='text-body-secondary'>
                Published on {new Date(trailer.published_at).toDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PromoSection;
