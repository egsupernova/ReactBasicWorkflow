//Dependencies
import React, {Component} from 'react';
import {render} from 'react-dom';
//ASSETS
import './app.css';

class Componente extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:"Sergi"
        }
    }
    render(){
        return(
            <div>
                <h1>Hola {this.state.name}</h1>
            </div>
        );
    }
}

render(<Componente/>, document.getElementById('app'));
