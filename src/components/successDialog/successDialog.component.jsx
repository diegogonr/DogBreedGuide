import React from 'react';
import './successDialog.styles.css'

const SuccessDialog = ({ open, onClose, success }) => {
  console.log(success);
  return (
    <div className={`overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="dialog">
        <div className="dialog-header">
          {success? (<h2 className='text-success'>Éxito</h2>): (<h2 className='text-error'>Fracaso</h2>) }
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="dialog-content">
        {success? (<p>¡El perro fue creado correctamente!</p>): (<p >El perro no fue creado, ya hay un perro con ese nombre</p>) }

          
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;
