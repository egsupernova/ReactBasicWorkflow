import React, { Component } from "react";

const Hello = ({ name }) =>  <h1 > Hello {name} </h1>;

export default class App extends Component {
    render() {
        return (
          <div>
              <Hello name={"world"} />
          </div>
        );
    }
}
