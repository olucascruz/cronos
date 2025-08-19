<script>
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
    import { Portuguese } from "flatpickr/dist/l10n/pt.js";
	import 'flatpickr/dist/flatpickr.min.css';
    import { form } from '$app/server';
    import html2canvas from "html2canvas";

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
	let totalDays = 0;
	let totalHours = 0;

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
        let monthsCount = (end.getFullYear() - start.getFullYear()) * 12 
                + (end.getMonth() - start.getMonth()) + 1;
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
    if (!meuConteudo) return;

    html2canvas(meuConteudo).then(canvas => {
      const link = document.createElement("a");
      link.download = "relatorio.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<style>
   
     .container {
        background-color: rgb(47, 13, 75);
        height: 100vh;
        display: flex;
        color: whitesmoke;
    }
    .left-side {
         display: flex;
         flex-direction: column;
         width: 50%;
         align-items: center;
    }
     .right-side {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 50%;
    }

    .bt-export {
        margin-top: 60px;
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
    margin-top: 145px;
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
        height: 65%;
        background-color: rgb(95, 74, 232);
        padding: 50px;
        border-radius: 15px;
    }
    form:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
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
    input[type="number"], input[type="date"] {
        height: 40px;
        width: 90%;
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
        margin-top: 60px;
    }

    label {
        font-weight: bold;
        color: rgb(39, 0, 63);
    }
     
    .div-title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .div-title > h1, .div-title > img {
        margin-top: 0;
    }

    img{
        width: 200px;
        height: 200px;
        margin-top: 20px;
    }

    table {
        background-color: rgb(95, 74, 232);
        border-radius: 15px;
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
    }
    table, th, td {
        text-align: center;
    }

    .left-content{
        height: auto;
        width: 75%;
        height: 50%;
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

</style>

<div class="container">
    <div class="left-side">
        <div class="div-title">
            <h1>Bem vindo ao</h1><img src="Cronos-removebg-preview.png" alt="">
        </div>
    <p>Marque os dias úteis, as horas disponíveis e o prazo.</p>
    <!-- svelte-ignore component_name_lowercase -->
    <div class="left-content" bind:this={meuConteudo}>
        <form on:submit|preventDefault={calculateTotal}>
            <label for="title-prazo">Título do Prazo</label>
            <input id="title-prazo" name="title-prazo" class="title-prazo" type="text" value="Prazo">
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
    </div>




</div>
    <div class="right-side">    
        <button class="bt-export" id="btnExportar" on:click={exportar} disabled> Exportar </button>
        <div class="div-calendar">
                <div id="meuCalendario"></div>
        </div>
    </div>
</div>