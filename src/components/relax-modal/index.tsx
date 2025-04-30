import React, { FormEvent } from 'react';
import Modal from '../modal';
import './relax-modal.sass';
import { renderStars } from '../../utils/stars';

interface RelaxModalProps {
  onClose: () => void;
  open: boolean;
}

function RelaxModal({ onClose, open }: RelaxModalProps) {
  const [problem, setProblem] = React.useState('');

  React.useEffect(() => {
    let stars: number[] = [];
    if (open) {
      stars = renderStars(150, 'relaxBackground');
    }

    return () => {
      stars.forEach((star) => clearInterval(star));
      const starDivs = document.querySelectorAll('#relaxBackground .star-item');
      starDivs.forEach((div) => div.remove());
    };
  }, [open]);

  const handleAddProblem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProblem(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!problem || !problem.trim()) {
      return;
    }
    // todo
  };
  return (
    <Modal onClose={onClose} open={open} title="Relax">
      <div className="relaxModal" id="relaxBackground">
        <div className="relaxModal__content">
          <h3 className="relaxModal__title">
            Put a stressful thought in the star
          </h3>
          <div className="relaxModal__star"></div>
          <form className="relaxModal__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What's bothering you?..."
              className="relaxModal__form__input"
              value={problem}
              onChange={handleAddProblem}
            />
            <button type="submit" className="relaxModal__form__button">
              DONE
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default RelaxModal;
