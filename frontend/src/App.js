import React from 'react';
import * as api from './api/apiService'
import 'materialize-css/dist/css/materialize.min.css'

 function App() {
    const testApi = async () =>{
    const result = await api.getAllGrades();
    console.log(result)
  }
  testApi();
  return (
    <div className="App">
      <p>Olá Mundo</p> 
    </div>
  );
}

export default App;
