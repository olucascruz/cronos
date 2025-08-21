<script>
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
    import { Portuguese } from "flatpickr/dist/l10n/pt.js";
	import 'flatpickr/dist/flatpickr.min.css';

	let initialDate = '';
	let endDate = '';
	let hoursPerDay = 0;
	let daysChecked = {
		seg: false,
		ter: false,
		quar: false,
		qui: false,
		sex: false,
		sab: false,
		dom: false
	};


    function getDays() {
        // Filtra as chaves com valor true e junta em uma string
        return Object.keys(daysChecked)
            .filter(day => daysChecked[day])
            .join(', ');
    }
	let totalDays = 0;
	let totalHours = 0;
    let titleTask = "Prazo";
    let calendarInstance = null;

	const dayMap = {
		dom: 0,
		seg: 1,
		ter: 2,
		quar: 3,
		qui: 4,
		sex: 5,
		sab: 6
	};

	function calculateTotal() {
		const start = new Date(initialDate);
		const end = new Date(endDate);

		let days = 0;
		let current = new Date(start);
		let markedDates = [];

		while (current <= end) {
			const dayOfWeek = current.getDay();
			for (const day in daysChecked) {
				if (daysChecked[day] && dayMap[day] === dayOfWeek) {
					days++;
					markedDates.unshift(new Date(current));
					break;
				}
			}
			current.setDate(current.getDate() + 1);
		}

		totalDays = days;
		totalHours = days * hoursPerDay;
      
		// Atualiza o calendário com os dias marcados
		if (calendarInstance) {
			calendarInstance.setDate(markedDates, true);
		}
        const exportButton = document.querySelector('.bt-export');
        if (exportButton) {
            exportButton.disabled = totalDays === 0 || totalHours === 0;
        }
	}
   
	onMount(() => {
		calendarInstance = flatpickr("#meuCalendario", {
            locale: Portuguese,
			inline: true,
			dateFormat: "d/m/Y",
            showMonths: 2,
			mode: "multiple",
            allowInput: false
		});
	});
    let meuConteudo; 
    function exportar() {
            
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");
        if(!ctx) {
            console.error("Não foi possível obter o contexto do canvas.");
            return;
        }
        // Fundo branco
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Texto principal (tabela simulada)
        ctx.fillStyle = "#000000";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Total de dias úteis: " + totalDays, 50, 50);
        ctx.fillText("Total de horas disponíveis: " + totalHours +"h", 50, 90);

        // Separador
        ctx.beginPath();
        ctx.moveTo(50, 110);
        ctx.lineTo(750, 110);
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // Título da tarefa
        ctx.font = "bold 18px Arial";
        ctx.fillText(titleTask, 50, 150);

        // Conteúdo da tarefa
        ctx.font = "16px Arial";
        ctx.fillText("Dias da atividade: " + getDays(), 50, 180);
        ctx.fillText("Horas diárias: " + hoursPerDay +"h", 50, 210);
        ctx.fillText("Prazo: " + initialDate + " - " + endDate, 50, 240);

        // Exporta para PNG
        const link = document.createElement("a");
        link.download = "relatorio.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    
    }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<style>
   
     .container {
        height: 100vh;
        display: flex;
        color: whitesmoke;
    }
    .left-side {
         display: flex;
         flex-direction: column;
         width: 50%;
         align-items: flex-end;
    }
     .right-side {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        width: 50%;
    }

    .bt-export {
        position: relative;
        height: 50px;
        width: 150px;
        border-radius: 15px;
        border: none;
        background-color: rgb(255, 255, 255);
        cursor: pointer;    
        font-weight: bold;
        bottom: 0;
    }
    .div-calendar {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    }

    .div-calendar  div {
        margin: 0;
        padding: 0;
    }
    form {
        display: flex;
        flex-direction: column;
        height: auto;
        background-color: rgb(95, 74, 232);
        margin-top: 10px;
        padding: 20px;
        border-radius: 15px;
    }
    form:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    .row {
        display: flex;
        gap: 25px;
        justify-content: center;
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
    input[type="number"], input[type="date"] {
        height: 40px;
        width: 150px;
        border-radius: 15px;
        border: none;
        padding: 5px;
        font-size: 16px;
        text-align: center;
    }

    input[type="checkbox"] {
        width: 20px;
        height: 20px;
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
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* sombra suave */
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
    
    .div-button button{
        background-color: rgb(190, 183, 245);
        color: rgb(66, 15, 133);
        cursor: pointer;
        width: 200px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* sombra suave */
        font-size: 16px;
        



    }

    .div-button button:hover{
        background-color: rgb(199, 192, 245);
    }

    label {
        font-weight: bold;
        color: rgb(255, 255, 255);
    }
     
    .div-title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: aliceblue;
        margin-top: -50px;
    }
    .div-title > h1, .div-title > img {
        margin-top: 0;
    }

    img{
        width: 200px;
        height: 200px;
        margin-top: 20px;
        margin-left: -20px;
    }

    table {
        background-color: rgb(95, 74, 232);
        border-radius: 15px;
        width: 100%;
        margin-top: 10px;
        height: 100px;
        border-collapse: collapse;
    }
    table, th, td {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    .content{
        height: auto;
        width: 618px;
        height: 50%;
        margin-left: 50px;
        margin-right: 50px;

    }
    .input-hours{
        text-align: center;
    }

    .title-prazo{
        text-align: center;
        height: 60px;
        border-radius: 15px;
        font-size: 20px;
        border: none;
        background-color: aliceblue;
    }
    .div-button-export{
        width: 100%;
        display: flex;
        justify-content: flex-end;

    }
    .result-export{
        background-color: rgb(95, 74, 232);
        margin-top: -15px;
        height: 320px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        
    }

    
    .result-export  p {
        font-size: 18px;
    }
    
    .result-content{
        padding-left: 20px;
        
    }
</style>

<div class="div-title">
    <h1>Bem vindo ao</h1><img src="Cronos-removebg-preview.png" alt="">
</div>
<div class="container">
    <div class="left-side">
        <!-- svelte-ignore component_name_lowercase -->
        <div class="content">
            <div class="div-button-export"> 
                <button style="opacity:0;"></button>
            </div>
            <form on:submit|preventDefault={calculateTotal}>
                <label for="title-prazo">Título da Atividade</label>
                <input id="title-prazo" name="title-prazo" class="title-prazo" type="text" bind:value={titleTask}>
                <p>Marque os dias úteis, as horas disponíveis e o prazo.</p>
                <div class="row">
                    {#each Object.keys(daysChecked) as day}
                    <div class="col">
                        <label for={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                        <input type="checkbox" id={day} name={day} bind:checked={daysChecked[day]}>
                        </div>
                    {/each}
                </div>
                
                
                <div class="row">
                    <div class="col">
                        <label for="hours">Total de horas diárias</label>
                        <input class="input-hours" type="number" id="hours" name="hours" placeholder="Enter number of hours" min="1" max="23" step="0.5" bind:value={hoursPerDay}>
                    </div>
                    <div class="col">
                        <label for="initial-date">Data inicial</label>
                        <input type="date" id="initial-date" name="initial-date" bind:value={initialDate}>
                    </div>
                    <div class="col">
                        <label for="end-date">Data final</label>
                        <input type="date" id="end-date" name="end-date" bind:value={endDate}>
                    </div>
                </div> 
                <div class="div-button">
                    <button type="submit">Calcular</button>
                </div>
            </form>
        
           </div>




</div>
    <div class="right-side">
        <div class="content">
            <div class="div-button-export">
                <button class="bt-export" id="btnExportar" on:click={exportar} disabled> Exportar </button>
            </div>
            <div id="result" bind:this={meuConteudo}>
                <table>
                    <tbody>
                        <tr>
                            <th>Total de dias úteis</th>
                            <th>Total de horas disponíveis</th>
                        </tr>
                        <tr>
                            <td>{totalDays}</td>
                            <td>{totalHours}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- {#if showExport} -->
                <!-- <div class="result-export">
                    <hr>
                    <div class="div-title">
                    <h3>{titleTask}</h3>
                    </div>
                    <div class="result-content">
                    <p><strong>Dias da atividade:</strong> {getDays()}</p>
                    <p><strong>Horas diárias:</strong> {hoursPerDay}</p>
                    <p><strong>Prazo:</strong> {initialDate} - {endDate}</p>
                    </div>
                </div> -->
            
                <div class="div-calendar">
                        <div id="meuCalendario"></div>
                </div>
            </div>
        </div>
    </div>
</div>