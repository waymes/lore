import './audio-player.sass';

interface AudioPlayerProps {
  play: boolean;
  onChange: () => void;
}

function AudioPlayer({ play, onChange }: AudioPlayerProps) {
  return (
    <button className="player" onClick={onChange}>
      <div
        className="player__icon"
        style={{
          backgroundImage: `url(/icons/${play ? 'pause.png' : 'play.png'})`,
        }}
      />
    </button>
  );
}

export default AudioPlayer;
