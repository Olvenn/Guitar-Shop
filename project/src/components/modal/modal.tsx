type ModalParams = {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  children: React.ReactNode,
}

export function Modal({ isActive, setIsActive, children }: ModalParams): JSX.Element {
  const handleModalClick = () => {
    setIsActive(false);
  };

  const haigh = '410px';

  return (
    <div style={{ position: 'absolute', width: '550px', height: `${isActive ? haigh : 0}`, marginBottom: '50px' }}>
      <div className={`${isActive ? 'is-active' : ''} modal modal--success modal-for-ui-kit`}>
        <div className="modal__wrapper">
          <div onClick={handleModalClick} className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            {children}
            <button onClick={handleModalClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
