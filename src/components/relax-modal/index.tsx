import React, { FormEvent } from 'react';
import Modal from '../modal';
import './relax-modal.sass';
import { renderStars } from '../../utils/stars';
import { getRelaxPhrases } from '../../constants';
import relaxAudio from '../../assets/audio/relax.mp3';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from './messages';

interface RelaxModalProps {
  onClose: () => void;
  open: boolean;
}

function RelaxModal({ onClose, open }: RelaxModalProps) {
  const intl = useIntl();
  const [problem, setProblem] = React.useState('');
  const [animationStart, setAnimationStart] = React.useState<number | null>(
    null
  ); // not sure why I chose date.. maybe can be changed to bool
  const [activePhrase, setActivePhrase] = React.useState(0);
  const audio = React.useMemo(() => new Audio(relaxAudio), []);
  const relaxPhrases = getRelaxPhrases(intl.formatMessage);

  React.useEffect(() => {
    let stars: number[] = [];
    if (open) {
      stars = renderStars(150, 'relaxBackground');
    }

    return () => {
      stars.forEach((star) => clearInterval(star));
      const starDivs = document.querySelectorAll('#relaxBackground .star-item');
      starDivs.forEach((div) => div.remove());

      audio.pause();
      audio.currentTime = 0;
      setTimeout(() => {
        setProblem('');
        setAnimationStart(null);
        setActivePhrase(0);
      }, 1000); // wait until modal disappears
    };
  }, [open, audio]);

  React.useEffect(() => {
    let interval: number | null = null;
    if (animationStart) {
      audio.play();
      setActivePhrase(activePhrase + 1);
      interval = setInterval(() => {
        setActivePhrase((id) => {
          if (id === relaxPhrases.length - 1) {
            if (interval) clearInterval(interval);
            return id;
          }
          return id + 1;
        });
      }, (120 * 1000) / relaxPhrases.length - 1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationStart]);

  const handleAddProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!problem || !problem.trim()) {
      return;
    }
    setAnimationStart(Date.now());
  };
  return (
    <Modal
      onClose={onClose}
      open={open}
      title={intl.formatMessage(messages.relax)}
    >
      <div className="relaxModal" id="relaxBackground">
        <div
          className={`relaxModal__content ${
            animationStart ? 'relaxModal__content_animation' : ''
          }`}
        >
          <h3 className="relaxModal__title">
            {relaxPhrases.map((p, id) => (
              <span
                key={p}
                className={`relaxModal__title__phrase ${
                  id === activePhrase ? 'relaxModal__title__phrase_active' : ''
                }`}
              >
                {p}
              </span>
            ))}
          </h3>
          <div className="relaxModal__star">
            {animationStart && (
              <h3 className="relaxModal__starTitle">{problem}</h3>
            )}
          </div>
          <form className="relaxModal__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={intl.formatMessage(messages.input)}
              className="relaxModal__form__input"
              value={problem}
              onChange={handleAddProblem}
            />
            <button type="submit" className="relaxModal__form__button">
              <FormattedMessage {...messages.done} />
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default RelaxModal;
