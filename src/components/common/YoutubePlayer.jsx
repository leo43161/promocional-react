// app/ui/YoutubePlayer.jsx
import { Suspense } from 'react';

// --- Componente del Esqueleto de Carga (ahora interno) ---
function VideoSkeleton() {
  const skeletonStyle = {
    backgroundColor: '#333',
    borderRadius: '8px',
    width: '560px',
    height: '315px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888',
    fontSize: '1.2rem',
    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={skeletonStyle}>
        <p>Cargando video...</p>
      </div>
    </>
  );
}

// --- Componente del Reproductor (ahora interno) ---
function Player({ youtubeUrl, title }) {
  // Simula una pequeña demora para que el esqueleto sea visible
  new Promise((resolve) => setTimeout(resolve, 1000));

  const getYouTubeVideoId = (url) => {
    let videoId = '';
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    ];
    console.log(patterns)
    for (const pattern of patterns) {

      const match = url.match(pattern);
      if (match) {
        console.log(match);
        videoId = match[1];
        break;
      }
    }
    return videoId;
  };

  const videoId = getYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    return <p>URL de YouTube no válida.</p>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`;

  return (
    <iframe
      id="ytplayer"
      width="560"
      height="315"
      type="text/html"
      src={embedUrl}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  );
}

// --- Componente Principal que exportas y usas ---
export default function YoutubePlayer({ youtubeUrl, title = 'Video de YouTube' }) {
  console.log("youtubeUrl");
  console.log(youtubeUrl);
  return (
    <Suspense fallback={<VideoSkeleton />}>
      <Player youtubeUrl={youtubeUrl} title={title} />
    </Suspense>
  );
}