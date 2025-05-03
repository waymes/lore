import React from 'react';
import { audioTracks } from '../../constants';
import Modal from '../modal';
import AudioTrack from '../audio-track';
import './meditate-modal.sass';
import AudioPlayer from '../audio-player';
import bannerImage from '../../assets/images/water.jpg';

interface MeditateModalProps {
  onClose: () => void;
  open: boolean;
}

type AudioItem = {
  title: string;
  icon: string;
  url: string;
  audio?: HTMLAudioElement;
  loading?: boolean;
};

function MeditateModal({ onClose, open }: MeditateModalProps) {
  const [play, setPlay] = React.useState(false);
  const [list, setList] = React.useState<Array<AudioItem>>(audioTracks);

  const handleVolumeChange = (url: string, volume: number) => {
    setList(
      list.map((item) => {
        if (item.url === url) {
          const newItem = { ...item };
          if (!newItem.audio) {
            const audio = new Audio(item.url);
            audio.loop = true;
            audio.volume = volume;
            audio.oncanplaythrough = () => {
              setList((newState) =>
                newState.map((el) =>
                  el.url === item.url ? { ...el, loading: false } : el
                )
              );
            };
            newItem.audio = audio;
            newItem.loading = true;
          } else {
            newItem.audio.volume = volume;
            if (volume === 0) {
              newItem.audio.pause();
            } else if (newItem.audio.paused) {
              newItem.audio.play();
              if (!play) {
                setPlay(true);
              }
            }
          }
          if (play) {
            handlePlayToggle(false);
          }
          return newItem;
        }
        return item;
      })
    );
  };

  const handlePlayToggle = (overridePlay: boolean = play) => {
    pauseAllTracks(overridePlay);
    setPlay(!overridePlay);
  };
  const handleClose = () => {
    pauseAllTracks();
    setPlay(false);
    onClose();
  };

  const pauseAllTracks = (pause = true, silence = false) => {
    setList(
      list.map((el) => {
        if (el.audio && el.audio?.volume > 0) {
          if (pause) {
            el.audio.pause();
            if (silence) el.audio.volume = 0;
          } else el.audio.play();
        }
        return el;
      })
    );
  };

  const handleResetPlay = () => {
    pauseAllTracks(true, true);
    setPlay(false);
  };

  return (
    <Modal
      onClose={handleClose}
      open={open}
      title="Meditation"
      background={bannerImage}
    >
      <div className="meditateModal container">
        <h3 className="meditateModal__title">
          Ambient sound to wash away distraction
        </h3>
        <AudioPlayer
          play={play}
          onChange={handlePlayToggle}
          onReset={handleResetPlay}
        />
        <div className="meditateModal__audioList">
          {list.map((audio) => (
            <AudioTrack
              key={audio.icon}
              {...audio}
              onChange={handleVolumeChange}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default MeditateModal;
