<script>
    let campos = ["Campo 1", "Campo 2"];
</script>

<div id="formulario">
    <h2>Formulário</h2>
        {#each campos as campo}
            <div>
            <label for={campo}>{campo}:</label><br>
            <input type="text" id={campo.toLowerCase()} name={campo.toLowerCase()}>
            </div>
        {/each}
</div>