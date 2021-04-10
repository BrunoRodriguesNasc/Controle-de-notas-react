import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import * as api from "../api/apiService";

Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectGrade }) {

  const { id, student, subject, type, value } = selectGrade;

  const [gradeValue, setGradeValue] = useState([value]);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation)
    }

    getValidation()
  }, [type]);


 //Validando o valor da NOTA
  useEffect(() => {

    if (gradeValue < gradeValidation.minValue || gradeValue > gradeValidation.maxValue) {
      setErrorMessage(`O valor deve ser entre ${gradeValidation.minValue} e ${gradeValidation.maxValue} (inclusive)`)
      return;
    }

    setErrorMessage("");
  }, [gradeValue, gradeValidation]);


//Adcionando o evento para fechar o modal 'SHIFT'
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 9) {
      onClose(null)
    };
  };


//Salvando o valor que o usuario digitou  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id,
      newValue: gradeValue,
    };

    onSave(formData)

  };

  const handleGradeChange = (event) => {
    setGradeValue(parseInt(event.target.value))
  };

  const handleModalClose = () => {
    onClose(null)
  };

  return (
    <div>
      <Modal isOpen={true}>

        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleModalClose}>
            x
        </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" value={student} readOnly />
            <label className="active" htmlFor="inputName">
              Nome do aluno:
          </label>
          </div>

          <div className="input-field">
            <input id="inputSubject" type="text" value={subject} readOnly />
            <label className="active" htmlFor="inputSubject">
              Disciplina:
          </label>
          </div>

          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo de avaliação:
          </label>
          </div>
          <div className="Input-field">
            <label className="active" htmlFor="inputGrade">
              Nota:
          </label>
            <input
              id="inputGrades"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
          </div>
          <div
            style={styles.flexRow}>
            <button className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ''}>
              Salvar
          </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>

    </div>
  )
};


const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px"
  },

  title: {
    fontSize: "1.3 rem",
    fontWeight: "bold"
  },

  flexStart: {
    justifyContent: "flex-start"
  },

  errorMessage: {
    color: "red",
    fontWeight: "bold"
  }
};