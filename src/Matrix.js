import React from "react";
import Cell from "./Cell";
import "./style.css";

class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: this.generateMatrix(),
      isAnyoneAlive: false
    };
  }

  generateMatrix() {
    let rows = 50;
    let columns = 50;
    let matrix = [];
    let counter = 0;
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push({ id: counter++, alive: false });
      }
      matrix.push(row);
    }
    return matrix;
  }

  cellReact(cellId) {
    this.setState(
      {
        matrix: this.state.matrix.map(row =>
          row.map(
            cell =>
              cell.id === cellId ? { ...cell, alive: !cell.alive } : cell
          )
        )
      },
      () => {
        this.timeout = setTimeout(() => {
          this.lifeMiracle();
        }, 1000);
      }
    );
  }

  generateIndexes(x, y, matrix) {
    // function to generate a matrix to indentify what indexes can be verified
    var indexes = [];
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (
          i >= 0 &&
          j >= 0 &&
          (i < matrix.length && j < matrix.length) &&
          (i !== x || j !== y)
        ) {
          indexes.push({ x: i, y: j });
        }
      }
    }
    return indexes;
  }

  countNeighborsAlive(x, y, matrix) {
    let neighborsCounter = 0;
    this.generateIndexes(x, y, matrix).map(neighbor => {
      matrix[neighbor.x][neighbor.y].alive && neighborsCounter++;
    });
    return neighborsCounter;
  }

  lifeMiracle() {
    var matrixCopy = this.state.matrix.map(row => {
      return row.map(cell => {
        return { ...cell };
      });
    });
    let row = [];
    let neighbors = 0;
    let anyAlive = false;
    let cellOriginalState = false;
    for (let i = 0; i < this.state.matrix.length; i++) {
      row = matrixCopy[i];
      for (let j = 0; j < row.length; j++) {
        neighbors = this.countNeighborsAlive(i, j, this.state.matrix);
        if (matrixCopy[i][j].alive === true) {
        }
        if (neighbors < 2 || neighbors > 3) {
          matrixCopy[i][j].alive = false;
        } else if (neighbors === 3) {
          matrixCopy[i][j].alive = true;
        }
        if (anyAlive !== true && matrixCopy[i][j].alive === true) {
          anyAlive = true;
        }
      }
    }
    this.setState({ matrix: matrixCopy }, () => {
      if (anyAlive) {
        this.timeout = setTimeout(() => this.lifeMiracle(), 200);
      }
    });
  }

  render() {
    var i = 0;
    return this.state.matrix.map(row => (
      <div key={i++} className="Row">
        {row.map(cell => (
          // <span
          //   className="Cell"
          //   style={{
          //     backgroundColor: cell.alive && "#FF5456"
          //   }}
          //   onClick={() => {
          //     clearTimeout(this.timeout);
          //     this.cellReact(cell.id);
          //   }}
          //   key={cell.id}
          // />
          <Cell
            key={cell.id}
            alive={cell.alive}
            onClick={() => {
              clearTimeout(this.timeout);
              this.cellReact(cell.id);
            }}
          />
        ))}
      </div>
    ));
  }
}

export default Matrix;
