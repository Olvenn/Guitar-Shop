import { ReactNode } from 'react';

type ModalParams = {
  onClose: () => void,
  children: ReactNode,
}

export function Modal({ children, onClose }: ModalParams): JSX.Element {

  return (
    <div className="modal__wrapper">
      <div onClick={onClose} className="modal__overlay" data-close-modal></div>
      <div className="modal__content">
        {children}
        <button onClick={onClose} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
          <span className="button-cross__icon"></span>
          <span className="modal__close-btn-interactive-area"></span>
        </button>
      </div>
    </div>
  );
}
