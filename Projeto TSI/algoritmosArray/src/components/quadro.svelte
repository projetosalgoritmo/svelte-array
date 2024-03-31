<script>

</script>

<div id="quadro" class="quadro">
    {#each new Array(24) as _, i}
        <div class="quadrado">Cidade {i + 1}</div>
    {/each}
</div>

<style scoped>

.quadro {
    display: grid;
    width: 80vw;
    height: 100vh;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 20px;
}

.quadrado {
    background-color: lightgray;
    border: 1px solid gray;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 100px;
}

</style>