import React, { useEffect, useState } from 'react';

function Game () {
    const [grid, setGrid] = useState([])

    const ROWS = 10;
    const COLS = 10;

    // MÉTODO RECURSIVO
    const crearGridInicial = (contador, grid) => {
        const rowInterna  = [];
        return contador === ROWS ? grid : ( grid.push(crearRowDeGridInicial(0, rowInterna)), crearGridInicial(contador + 1, grid) );
    }

    // MÉTODO RECURSIVO 
    const crearRowDeGridInicial = (contador, row) => {
        return contador === COLS ? row : ( row.push(Math.floor(Math.random() * 2)), crearRowDeGridInicial(contador + 1, row) );
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

        let griCreado = crearGridInicial(0, grid)
        setGrid(griCreado)
    }

    useEffect(() => {
        inicializaGrid()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /*
    // Se intenta hacer recursivo la renovación del grid
    const crearGridRenovado = (contador_i, gridSeteadoEnHook) => {
        switch (contador_i) {
            case ROWS:
                return gridSeteadoEnHook;
        
            default:
                crearRowDeGridRenovado(contador_i, 0, gridSeteadoEnHook);
                return crearGridRenovado(contador_i + 1, gridSeteadoEnHook);
        }
    }

    const crearRowDeGridRenovado = (contador_i, contador_j, gridSeteadoEnHook) => {
        switch (contador_j) {
            case COLS:
                return gridSeteadoEnHook;
        
            default:
                let sum     = 0
                posicionDeVecinos.forEach((posiciones) => {
                    const x = contador_i + posiciones[0]
                    const y = contador_j + posiciones[1]
                    sum = (x >= 0 && x < ROWS && y >= 0 && y < COLS) ? sum + gridSeteadoEnHook[x][y] : sum;
                })
                // Si una célula está viva y tiene dos o tres vecinas vivas, sobrevive.
                // Si una célula está muerta y tiene tres vecinas vivas, nace.
                // Si una célula está viva y tiene más de tres vecinas vivas, muere.
                gridSeteadoEnHook[contador_i][contador_j] = (sum < 2 || sum > 3) ? 0 : ( (sum === 3) ? 1 : gridSeteadoEnHook[contador_i][contador_j] );
                return crearRowDeGridRenovado(contador_i, contador_j + 1, gridSeteadoEnHook);
        }
    }

    const gridRenovadoRecursivo = (gridSeteadoEnHook) => {
        let grid_renovado_recursivo = crearGridRenovado(0, gridSeteadoEnHook);
        setGrid(grid_renovado_recursivo);
    }
    */

    const gridRenovado = (parametroGrid) => {
        return parametroGrid.map((row, i) => {
            return row.map((col, j) => {
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

    function correrAutomata() {
        setGrid(gridRenovado)
        // setGrid(gridRenovadoRecursivo(grid))
        // gridRenovadoRecursivo(grid)
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
            <div style={{ 
                display: "flex", 
                flexWrap: "wrap" 
                }}
            >
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
