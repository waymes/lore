import './audio-player.sass';
import playIcon from '../../assets/icons/play.png';
import pauseIcon from '../../assets/icons/pause.png';

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
          backgroundImage: `url(${play ? pauseIcon : playIcon})`,
        }}
      />
    </button>
  );
}

export default AudioPlayer;
