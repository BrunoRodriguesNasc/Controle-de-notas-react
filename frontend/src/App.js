import React, { useEffect, useState } from 'react';
import * as api from './api/apiService'
import Spinner from './components/Spinner';


 function App() {

  const [allGrades, setAllGrades] = useState([]);
  const [selectGrades, setSelectedGrade] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState([]);

  useEffect(() => {
    const getGrades = async () =>{
      const grades =  await api.getAllGrades();
      setTimeout(()=> {
        setAllGrades(grades);
      }, 2000);
    };
    getGrades();
  },[]);

  return (
    <div className="App">
      <h1 className="center" >Controle de notas</h1>
      {allGrades.length > 0 && <p>Notas disponiveis</p>}
      {allGrades.length == 0 && <Spinner/>}
    </div>
  );
}

export default App;
