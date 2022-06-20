import { ReactNode } from 'react';

type Params = {
  onClose: () => void,
  children: ReactNode,
}

export function Modal({ children, onClose }: Params): JSX.Element {

  return (
    <div style={{ position: 'absolute', width: '550px', height: '410px', marginBottom: '50px' }}>
      <div className="is-active modal modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div onClick={onClose} className="modal__overlay" data-close-modal />
          <div className="modal__content">
            {children}
            <button onClick={onClose} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
