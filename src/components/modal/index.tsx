import { ReactNode } from 'react';
import './modal.sass';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  open: boolean;
  background?: string;
  title: string;
}

function Modal({ children, onClose, open, background, title }: ModalProps) {
  return (
    <div
      className={`modal ${open && 'modal_fade'}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="modal__body">
        <div className="modal__headWrapper">
          <div className="modal__header container">
            <h2 className="modal__header__title">{title}</h2>
            <button className="modal__header__close" onClick={onClose}>
              <FormattedMessage {...messages.close} />
            </button>
          </div>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
