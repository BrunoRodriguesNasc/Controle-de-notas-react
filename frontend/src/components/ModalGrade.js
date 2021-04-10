import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import * as api from '../api/apiService';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectGrade }) {

  const {id, student, subject, type, value} = selectGrade;

  const [gradeValue, setGradeValue] = useState([value]);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const getValidation = async() =>{
    const validation = await api.getValidationFromGradeType(type);
    setGradeValidation(validation)
    }

    getValidation()
  }, [type]);
  


  useEffect(() => {

    if (gradeValue < gradeValidation.minValue || gradeValue > gradeValidation.maxValue) {
      setErrorMessage(`O valor deve ser entre ${gradeValidation.minValue} e ${ gradeValidation.maxValue} (inclusive)`)
      return;
    }

    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (event) => {
   if (event.keyCode === 9){
     onClose(null)
   };
  };

  const handleFormSubmit = (event) => {

  } ;

  return (
    <div>
      <Modal isOpen={true}>
      <form onSubmit={handleFormSubmit}></form>
        <div className="input-field">
          <input id="inputName" type="text" value={student} readOnly/>
          <label className="active" htmlFor="inputName">
            Nome do aluno:
          </label>
        </div>
      </Modal>
    </div>
  )
}
