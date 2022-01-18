import './App.css';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import {Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
      <Route exact path = "/" element = {<FormComponent/>}/>
      <Route exact path = "/table" element = {<TableComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
