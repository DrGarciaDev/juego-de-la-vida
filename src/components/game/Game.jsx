import React, { useEffect, useState } from 'react';
import './Game.css';

function Game () {
    const [grid, setGrid] = useState([])

    const COLS = 40;
    const ROWS = 40;

    // MÉTODO RECURSIVO
    const crearGrid = (contador, grid) => {
        const rowInterna  = [];
        //base case
        switch (contador) {
            case ROWS:
                return grid;
        
            default:
                grid.push(crearRow(0, rowInterna));
                return crearGrid(contador + 1, grid);
        }
    }

    // MÉTODO RECURSIVO 
    const crearRow = (contador, row) => {
        switch (contador) {
            case COLS:
                return row;
        
            default:
                row.push(Math.floor(Math.random() * 2))
                return crearRow(contador + 1, row);
        }
    }

    useEffect(() => {
        let griCreado = crearGrid(0, grid)
        setGrid(griCreado)

        console.log(grid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
        
        </>
    );
}

export default Game;