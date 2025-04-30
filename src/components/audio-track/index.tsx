import Slider from 'rc-slider';
import './audio-track.sass';

interface AudioTrackProps {
  title: string;
  icon: string;
  url: string;
  loading?: boolean;
  audio?: HTMLAudioElement;
  onChange: (url: string, volume: number) => void;
}

function AudioTrack({
  title,
  icon,
  url,
  loading,
  audio,
  onChange,
}: AudioTrackProps) {
  return (
    <div className="audio">
      <div
        className="audio__icon"
        style={{ backgroundImage: `url(${icon})` }}
      />
      <div className="audio__title">{title}</div>
      <Slider
        min={0}
        max={1}
        defaultValue={0}
        step={0.1}
        value={audio?.volume || 0}
        onChange={(volume) => onChange(url, volume as number)}
      />
      {loading && <div className="audio__loader" />}
    </div>
  );
}

export default AudioTrack;
