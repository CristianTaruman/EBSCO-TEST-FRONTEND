import React from 'react';
import './App.css';
import { Login } from "./componentes/login/login";

class App extends React.Component{

  render(){
      return (
        <div className="App">
          <div className="login">
            <div className="container">
              <Login />
            </div>
          </div>
        </div>
      )
  }
}

export default App;