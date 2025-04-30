import React from 'react';
import { audioTracks } from '../../constants';
import Modal from '../modal';
import AudioTrack from '../audio-track';
import './meditate-modal.sass';
import AudioPlayer from '../audio-player';

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
            const audio = new Audio(`/audio/${item.url}`);
            audio.loop = true;
            audio.volume = volume;
            audio.oncanplaythrough = () => {
              if (play) {
                audio.play();
              }

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
            } else if (volume !== 0 && newItem.audio.paused) {
              newItem.audio.play();
            }
          }
          return newItem;
        }
        return item;
      })
    );
  };
  const handlePlayToggle = () => {
    setPlay(!play);
    list.forEach((el) => {
      if (el.audio && el.audio.volume > 0) {
        if (play) {
          el.audio.pause();
        } else {
          el.audio.play();
        }
      }
    });
  };
  const handleClose = () => {
    setPlay(false);
    list.forEach((el) => {
      if (el.audio) {
        el.audio.pause();
      }
    });
    onClose();
  };

  return (
    <Modal
      onClose={handleClose}
      open={open}
      title="Meditation"
      background="/water.jpg"
    >
      <div className="meditateModal container">
        <h3 className="meditateModal__title">
          Ambient sound to wash away distraction
        </h3>
        <AudioPlayer play={play} onChange={handlePlayToggle} />
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
