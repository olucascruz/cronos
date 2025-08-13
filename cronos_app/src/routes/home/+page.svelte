<script>
    // Variáveis reativas para armazenar o estado do formulário
    let initialDate = '';
    let endDate = '';
    let hoursPerDay = 0;
    
    // Objeto reativo para os checkboxes
    let daysChecked = {
        seg: false,
        ter: false,
        quar: false,
        qui: false,
        sex: false,
        sab: false,
        dom: false
    };

    // Variáveis para armazenar o resultado do cálculo
    let totalDays = 0;
    let totalHours = 0;

    // Função que será chamada ao submeter o formulário
    function calculateTotal() {
        // As datas e horas são automaticamente sincronizadas pelas variáveis reativas
        const start = new Date(initialDate);
        const end = new Date(endDate);
        
        let days = 0;
        let current = new Date(start);
        
        // Mapeamento dos dias da semana (índice 0 = Domingo, 1 = Segunda, ...)
        const dayMap = {
            dom: 0,
            seg: 1,
            ter: 2,
            quar: 3,
            qui: 4,
            sex: 5,
            sab: 6
        };

        // Loop para contar os dias selecionados
        while (current <= end) {
            const dayOfWeek = current.getDay();
            
            for (const day in daysChecked) {
                if (daysChecked[day] && dayMap[day] === dayOfWeek) {
                    days++;
                    break;
                }
            }
            current.setDate(current.getDate() + 1);
        }

        // Atualiza as variáveis de resultado, que por sua vez atualizam a interface
        totalDays = days;
        totalHours = days * hoursPerDay;
    }
</script>

<style>

    form {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        height: 300px;
        background-color: rgb(33, 179, 145);
        padding: 20px;
        padding-left: 50px;
        margin-left: -30px;
        border-radius: 15px;
    }
    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .col {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input, label, button {
        margin: 5px 0;
    }
    input{
        height: 40px;
        border-radius: 15px;
        border: none;
        padding: 5px;
    }
    button {
        position: relative;
        height: 50px;
        border-radius: 15px;
        border: none;
        background-color: rgb(255, 255, 255);
        cursor: pointer;    
        font-weight: bold;
        bottom: 0;
        width: 150px;
    }
    button:hover {
        background-color: rgb(200, 200, 200);
    }
    .div-button {
        display: flex;
        justify-content: center;
        align-items: end;
        height: 30%;
        width: 100%;
    }

    label {
        font-weight: bold;
        color: rgb(39, 0, 63);
    }
</style>

<div class="container">
<h1>Bem vindo ao Cronos</h1>
<p>Marque os dias úteis, as horas disponíveis e o prazo.</p>

<form on:submit|preventDefault={calculateTotal}>
    <div class="row">
        {#each Object.keys(daysChecked) as day}
            <div class="col">
                <label for={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                <input type="checkbox" id={day} name={day} bind:checked={daysChecked[day]}>
            </div>
        {/each}
    </div>
    
    <label for="hours">Horas do dia contabilizadas</label>
    <input type="number" id="hours" name="hours" placeholder="Enter number of hours" min="1" max="23" step="0.5" bind:value={hoursPerDay}>
    
    <div class="row">
        <label for="initial-date">Data inicial</label>
        <input type="date" id="initial-date" name="initial-date" bind:value={initialDate}>
        
        <label for="end-date">Data final</label>
        <input type="date" id="end-date" name="end-date" bind:value={endDate}>
    </div>
    <div class="div-button">
    <button type="submit">Calcular</button>
    </div>
</form>

{#if totalDays > 0}
    <h3>Total de dias úteis: {totalDays} — Total de horas disponíveis: {totalHours}</h3>
{/if}

</div>