import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import GameManager from './Systems/GameManager'


const gameManager = new GameManager()
gameManager.init()

function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className='status>'></div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (this.state.winner) {
      console.log("GAME OVER")
      return
    }
    
    if (squares[i]) {
      console.log('ALREADY CHECKED')
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    
    this.setState({
      history: history.concat([{squares: squares}]),
      xIsNext: !this.state.xIsNext,
      winner: calculateWinner(squares)
    })
  }

  render() {
    const history = this.state.history
    const current = history[history.length -1]

    const moves = history.map((step, move) => {
      const desc = move ? 'go to move #' + move : 'Go to game start'
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (this.state.winner) {
      console.log('Game Over')
      status = 'Winner: ' + this.state.winner
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{ status }</div>
          <div>{ moves }</div>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  console.log('calculateWinner')
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
}

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Game />)