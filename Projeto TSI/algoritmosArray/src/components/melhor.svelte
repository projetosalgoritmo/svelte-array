<script>
    let numRows = 4;
    let numCols = 4;
    let grid = Array(numRows).fill().map(() => Array(numCols).fill(0));
    let startRow = 0;
    let startCol = 0;
    let endRow = numRows - 1;
    let endCol = numCols - 1;
    let visited = Array(numRows).fill().map(() => Array(numCols).fill(false));
    let path = [];
    let distances;

    function shortestPathBFS() {
        let queue = [];
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        distances = Array(numRows).fill().map(() => Array(numCols).fill(Infinity));

        queue.push([startRow, startCol]);
        distances[startRow][startCol] = 0;

        let maxIterations = numRows * numCols;
        let iterations = 0;

        while (queue.length > 0 && iterations < maxIterations) {
            let [row, col] = queue.shift();

            if (row === endRow && col === endCol) {
                return distances[row][col];
            }

            for (let [dx, dy] of directions) {
                let newRow = row + dx;
                let newCol = col + dy;

                if (isValid(newRow, newCol) && !visited[newRow][newCol]) {
                    visited[newRow][newCol] = true;
                    queue.push([newRow, newCol]);
                    distances[newRow][newCol] = distances[row][col] + 1;
                }
            }

            iterations++;
        }

        if (iterations >= maxIterations) {
            console.error("Número máximo de iterações atingido. O caminho pode estar muito longo.");
        }

        return -1;
    }

    function isValid(row, col) {
        return row >= 0 && row < numRows && col >= 0 && col < numCols;
    }

    function reset() {
        visited = Array(numRows).fill().map(() => Array(numCols).fill(false));
        path = [];
    }

    function setStart(row, col) {
        startRow = row;
        startCol = col;
        path = [];
    }

    function setEnd(row, col) {
        endRow = row;
        endCol = col;
    }

    function constructPath(distances) {
        let row = endRow;
        let col = endCol;
        let tempPath = [];

        let maxIterations = numRows * numCols;
        let iterations = 0;

        while ((row !== startRow || col !== startCol) && iterations < maxIterations) {
            tempPath.push([row, col]);
            let minNeighborDist = Infinity;
            let minNeighborRow = row;
            let minNeighborCol = col;

            for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                let newRow = row + dx;
                let newCol = col + dy;

                if (isValid(newRow, newCol) && distances[newRow][newCol] < minNeighborDist) {
                    minNeighborDist = distances[newRow][newCol];
                    minNeighborRow = newRow;
                    minNeighborCol = newCol;
                }
            }

            row = minNeighborRow;
            col = minNeighborCol;

            iterations++;
        }

        if (iterations >= maxIterations) {
            console.error("Número máximo de iterações atingido. O caminho pode estar muito longo.");
        } else {
            tempPath.reverse();
            path = tempPath;
        }
    }

    function printPath(distances) {
        let pathString = path.map(([row, col]) => `[${row},${col}]`).join(' -> ');
        return "Caminho até o destino:\n" + pathString;
    }

    function isPartOfPath(row, col) {
        return path.some(([r, c]) => r === row && c === col);
    }
</script>

<div class="grid">
    {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
    <div role="button" class="cell {rowIndex === startRow && colIndex === startCol ? 'start' : ''} {rowIndex === endRow && colIndex === endCol ? 'end' : ''} {visited[rowIndex][colIndex] ? 'visited' : ''} {isPartOfPath(rowIndex, colIndex) ? 'path' : ''}"
        on:click={() => setStart(rowIndex, colIndex)} on:contextmenu|preventDefault={() => setEnd(rowIndex, colIndex)}>
        {cell}
    </div>
    {/each}
    {/each}
</div>

<button on:click={() => {
    let steps = shortestPathBFS();
    if (steps >= 0) {
        constructPath(distances);
        alert("O menor caminho é de " + steps + " passos.\n" + printPath(distances));
    } else {
        alert("Não foi possível encontrar um caminho até o destino.");
    }
}}>Encontrar Menor Caminho</button>
<button on:click={reset}>Resetar</button>

<style>
    .grid {
        display: grid;
        width: 50vw;
        height: 50vw;
        grid-template-columns: repeat(4, 1fr);
        border: 2px solid black;
    }

    .cell {
        width: 100%;
        height: 100%;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        cursor: pointer;
    }

    .start {
        background-color: green;
    }

    .end {
        background-color: red;
    }

    .visited {
        background-color: lightblue;
    }

    .path {
        background-color: yellow;
    }
</style>
