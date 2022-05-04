import './App.css';
import Main from './components/MainComponents';
import { DISHES } from './shared/dishes';
import { Component } from 'react';

class App extends Component{
  render(){
    return (
      <div>
        <Main/>
      </div>
    );
  }
}

export default App;
