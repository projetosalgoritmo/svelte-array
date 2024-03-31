<script>
    import Mapa from '../routes/js/dijkstra.js';

    let origem = '';
    let destino = '';
    let adicionarVertice = '';
    let adicionarAresta = [];

    let mapa = new Mapa();

    function adicionarVerticeHandler() {
        if (adicionarVertice.trim() !== '') {
            mapa.adicionarVertice(adicionarVertice);
        }
    }

    function adicionarArestaHandler() {
        adicionarAresta.forEach(element => {
            mapa.adicionarAresta(element[0], element[1], element[2]);
        });
    }

    function calcularCaminho() {
        adicionarArestaHandler();
        let caminhoMaisCurto = mapa.dijkstra(origem, destino);
        console.log(caminhoMaisCurto);
    }

</script>

<h1>Chegou</h1>

<h2>Formulário Dijkstra</h2>

<div>
    <label for="origem">Origem:</label>
    <input type="text" bind:value={origem} id="origem">
</div>

<div>
    <label for="destino">Destino:</label>
    <input type="text" bind:value={destino} id="destino">
</div>

<div>
    <label for="adicionarVertice">Adicionar Vértice:</label>
    <input type="text" bind:value={adicionarVertice} id="adicionarVertice">
    <button on:click={adicionarVerticeHandler}>Adicionar</button>
</div>

<div>
    <button on:click={() => adicionarAresta.push(['A', 'B', 6])}>Adicionar Aresta (A, B, 6)</button>
    <button on:click={() => adicionarAresta.push(['A', 'C', 10])}>Adicionar Aresta (A, C, 10)</button>
    <button on:click={() => adicionarAresta.push(['B', 'C', 1])}>Adicionar Aresta (B, C, 1)</button>
    <button on:click={calcularCaminho}>Calcular Caminho</button>
</div>
