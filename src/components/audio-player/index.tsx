import React from 'react';
import './audio-player.sass';
import playIcon from '../../assets/icons/play.png';
import pauseIcon from '../../assets/icons/pause.png';
import resetIcon from '../../assets/icons/reset.png';
import timerIcon from '../../assets/icons/stopwatch.png';
import Timer from '../timer';

interface AudioPlayerProps {
  play: boolean;
  onChange: (overridePlay?: boolean) => void;
  onReset: () => void;
}

function AudioPlayer({ play, onChange, onReset }: AudioPlayerProps) {
  const [showTimer, setShowTimer] = React.useState(false);
  return (
    <>
      <div className="player">
        <button
          className={`player__timerIcon ${
            showTimer ? 'player__timerIcon_active' : ''
          }`}
          onClick={() => setShowTimer(!showTimer)}
        >
          <span
            className="player__icon"
            style={{
              backgroundImage: `url(${timerIcon})`,
            }}
          />
        </button>
        <button className="player__play" onClick={() => onChange()}>
          <span
            className="player__icon"
            style={{
              backgroundImage: `url(${play ? pauseIcon : playIcon})`,
            }}
          />
        </button>
        <button className="player__reset" onClick={onReset}>
          <span
            className="player__icon"
            style={{
              backgroundImage: `url(${resetIcon})`,
            }}
          />
        </button>
      </div>
      <Timer
        onStopPlayer={() => onChange(true)}
        className={`player__timer ${showTimer ? 'player__timer_active' : ''}`}
      />
    </>
  );
}

export default AudioPlayer;
