import { useEffect, useRef } from 'react';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          // Once playing, remove the event listeners
          document.removeEventListener('click', playAudio);
          document.removeEventListener('touchstart', playAudio);
          document.removeEventListener('scroll', playAudio);
        }).catch(err => {
          console.log("Autoplay prevented, waiting for interaction:", err);
        });
      }
    };

    // Add listeners for common interactions to trigger play
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);
    document.addEventListener('scroll', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
      document.removeEventListener('scroll', playAudio);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/background_music.mp3"
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}
