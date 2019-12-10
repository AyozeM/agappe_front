import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from 'react';
import './App.css';
import { RegisterForm } from "./components/RegisterForm";
import MomentUtils from "@date-io/moment";
const App: React.FC = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <section>
        <h1>Agappes</h1>
        <RegisterForm></RegisterForm>
      </section>
    </MuiPickersUtilsProvider>
  );
}

export default App;
