import React, { useEffect, useState } from 'react';

function Game () {
    const [grid, setGrid] = useState([])

    const ROWS = 10;
    const COLS = 10;

    // MÉTODO RECURSIVO
    const crearGrid = (contador, grid) => {
        const rowInterna  = [];
        //base case
        switch (contador) {
            case ROWS:
                return grid;
        
            default:
                grid.push(crearRowDeGrid(0, rowInterna));
                return crearGrid(contador + 1, grid);
        }
    }

    // MÉTODO RECURSIVO 
    const crearRowDeGrid = (contador, row) => {
        switch (contador) {
            case COLS:
                return row;
        
            default:
                row.push(Math.floor(Math.random() * 2))
                return crearRowDeGrid(contador + 1, row);
        }
    }

    const posicionDeVecinos = [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
    ]

    const inicializaGrid = () => {
        setGrid([]);

        let griCreado = crearGrid(0, grid)
        setGrid(griCreado)
    }

    useEffect(() => {
        inicializaGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function correrAutomata() {
        let gridRenovado = (parametroGrid) => {
            return parametroGrid.map((row, i) => {
                return row.map((cell, j) => {
                    let sum     = 0
                    posicionDeVecinos.forEach((posiciones) => {
                        const x = i + posiciones[0]
                        const y = j + posiciones[1]
                        sum = (x >= 0 && x < ROWS && y >= 0 && y < COLS) ? sum + parametroGrid[x][y] : sum;
                    })
                    // Si una célula está viva y tiene dos o tres vecinas vivas, sobrevive.
                    // Si una célula está muerta y tiene tres vecinas vivas, nace.
                    // Si una célula está viva y tiene más de tres vecinas vivas, muere.
                    return (sum < 2 || sum > 3) ? 0 : ( (sum === 3) ? 1 : parametroGrid[i][j] );
                })
            })
        }
        setGrid(gridRenovado)
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    spaceBetween: "10px",
                    margin: "2rem",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <button
                    style={{ marginRight: "1rem" }}
                    onClick={() => {
                        correrAutomata()
                    }}
                    >
                        Generación +
                </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {grid && grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div key={`${i}-${k}`}
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: grid[i][k] ? "black" : "",
                                border: "1px solid black"
                            }}
                        >{`${i},${k}`}</div>
                    ))
                )}
            </div>
        </>
    );
}

export default Game;
