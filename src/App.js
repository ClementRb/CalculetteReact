import React from 'react';
import './App.css';

const DisplayWindow = (props) => (<input type='text' value={props.expression} disabled='true'/>);
let result = 0

class Button extends React.Component {
  constructor() {
    super();
    
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    this.props.onKeyPressed(this.props.text);
  }
  
  render() {
    return <button className="calc_btn btn btn-dark" onClick={this.onClick}>{this.props.text}</button>
  }
}

class Home extends React.Component {

  constructor () {
    super()
    
    this.state = {
      expression: '',
    }

    this.whenOperationConfirmed = 0
    this.onKeyPressed = this.onKeyPressed.bind(this)
    this.onEvaluatePressed = this.onEvaluatePressed.bind(this)
    this.onDeletePressed = this.onDeletePressed.bind(this)
  }
  
  onKeyPressed(text) {
    if(this.whenOperationConfirmed === 1){
      if(~['-', '=', '*', '+', '.', '/'].indexOf(text)){
        this.setState((prev) => ({expression: prev.expression + text}))
      }
      else{
        this.setState({expression: '' + text})
      }
      this.whenOperationConfirmed = 0
    }
    else{
      this.setState((prev) => ({expression: prev.expression + text}))
    }
  }
  
  onEvaluatePressed() {
    if(~['-', '=', '*', '+', '.', '/'].indexOf(this.state.expression)){
      alert("Erreur, entrez une valeur correct !")
      this.setState({expression: ''})
    }
    else{
      result = eval(this.state.expression)
      this.setState({expression: result.toString()})
      this.whenOperationConfirmed = 1
    }
  }
  
  onDeletePressed() {
    this.setState(({expression: ''}))
  }

  render() {
    let numberKeysOneToThree = []
    for(let i =1; i < 4; i++) {
      numberKeysOneToThree.push(<td><Button text={i} onKeyPressed={this.onKeyPressed}/></td>)
    }

    let numberKeysFourToSix = []
    for(let i =4; i < 7; i++) {
      numberKeysFourToSix.push(<td><Button text={i} onKeyPressed={this.onKeyPressed}/></td>)
    }

    let numberKeysSevenToNine = []
    for(let i =7; i < 10; i++) {
      numberKeysSevenToNine.push(<td><Button text={i} onKeyPressed={this.onKeyPressed}/></td>)
    }
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 id="title">Calculatrice:</h1>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 center-block">
            <table className="calculatrice" id="calc">
              <tbody>
                <tr>
                  <td colSpan="4" className="calc_td_resultat">
                    <DisplayWindow expression={this.state.expression}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button text="AC" onKeyPressed={this.onDeletePressed}/>
                  </td>
                  <td>
                    <Button text="*" onKeyPressed={this.onKeyPressed}/>
                  </td>
                  <td>
                    <Button text="/" onKeyPressed={this.onKeyPressed}/>
                  </td>
                  <td>
                    <Button text="." onKeyPressed={this.onKeyPressed}/>
                  </td>
                </tr>
                <tr>
                  {numberKeysSevenToNine}
                  <td className="calc_td_btn">
                    <Button className="calc_btn btn btn-dark" text="+" onKeyPressed={this.onKeyPressed}/>
                  </td>
                </tr>
                <tr>
                  {numberKeysFourToSix}
                  <td>
                    <Button text="-" onKeyPressed={this.onKeyPressed}/>
                  </td>
                </tr>
                <tr>
                  {numberKeysOneToThree}
                  <td>
                    <Button className="calc_btn btn btn-dark" text="=" onKeyPressed={this.onEvaluatePressed}/>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <Button className="btn btn-dark" text="0" onKeyPressed={this.onKeyPressed}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;