
export default class Mapa {
    constructor() {
        this.grafo = {};
    }

    adicionarVertice(vertice) {
        this.grafo[vertice] = {};
    }

    adicionarAresta(origem, destino, peso) {
        this.grafo[origem][destino] = peso;
        this.grafo[destino][origem] = peso;
    }

    dijkstra(origem, destino) {
        let distancias = {};
        let anterior = {};
        let naoVisitados = Object.assign({}, this.grafo);

        for (let vertice in this.grafo) {
            distancias[vertice] = Infinity;
            anterior[vertice] = null;
        }

        distancias[origem] = 0;

        while (Object.keys(naoVisitados).length > 0) {
            let verticeAtual = this.encontrarMenorDistancia(distancias, naoVisitados);
            delete naoVisitados[verticeAtual];

            for (let vizinho in this.grafo[verticeAtual]) {
                let peso = this.grafo[verticeAtual][vizinho];
                let distanciaAlternativa = distancias[verticeAtual] + peso;
                if (distanciaAlternativa < distancias[vizinho]) {
                    distancias[vizinho] = distanciaAlternativa;
                    anterior[vizinho] = verticeAtual;
                }
            }
        }

        let caminho = [];
        let vertice = destino;
        while (vertice !== null) {
            caminho.unshift(vertice);
            vertice = anterior[vertice];
        }

        return caminho;
    }

    encontrarMenorDistancia(distancias, naoVisitados) {
        let menorDistancia = Infinity;
        let verticeMenor = null;
        for (let vertice in naoVisitados) {
            if (distancias[vertice] < menorDistancia) {
                menorDistancia = distancias[vertice];
                verticeMenor = vertice;
            }
        }
        return verticeMenor;
    }
}


