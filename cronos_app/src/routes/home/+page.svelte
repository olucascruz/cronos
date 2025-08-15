<script>
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
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
					markedDates.push(new Date(current));
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
	}

	onMount(() => {
		calendarInstance = flatpickr("#meuCalendario", {
			inline: true,
			dateFormat: "d/m/Y",
			mode: "multiple"
		});
	});
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<style>
     .container {
        background-color: saddlebrown;
        height: 100vh;
        display: flex;

    }
    .left-side {
         display: flex;
         flex-direction: column;
         width: 50%;
         align-items: center;
         background-color: blueviolet;
    }
     .right-side {
         display: flex;
         flex-direction: column;
         width: 50%;
         align-items: center;
         background-color: rgb(219, 181, 255);
    }
   .div-calendar {
    background-color: rgb(37, 19, 139);
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1px));
    gap: 20px;
    width: 100%;
    
    }


    form {
        display: flex;
        flex-direction: column;
        max-width: 650px;
        height: 300px;
        background-color: rgb(33, 179, 145);
        padding: 20px;
        padding-left: 50px;
        margin-left: -30px;
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
    input{
        height: 40px;
        width: 80%;
        border-radius: 15px;
        border: none;
        padding: 5px;
        font-size: 16px;
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
    }

    label {
        font-weight: bold;
        color: rgb(39, 0, 63);
    }
    .results {
        margin-top: 20px;
        padding: 10px;
        border-radius: 15px;
        width: 300px;
        text-align: center;
        color: rgb(255, 255, 255);
        background-color: rgb(33, 179, 145);
        
    }
    .row-results {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
        width: 80%;
        }
</style>

<div class="container">
    <div class="left-side">
    <div>
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
        
        
        <div class="row">
            <div class="col">
                <label for="hours">Horas do dia contabilizadas</label>
                <input type="number" id="hours" name="hours" placeholder="Enter number of hours" min="1" max="23" step="0.5" bind:value={hoursPerDay}>
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
    <div class="row-results">
        <div class="results">
            <h3>Total de dias úteis: {totalDays}</h3>
        </div>
        <div class="results">
            <h3>Total de horas disponíveis: {totalHours}</h3>
        </div>
    </div>
    </div>
    <div class="right-side">    
        <div class="div-calendar">
            <div id="meuCalendario"></div>
            <div id="meuCalendario"></div>
            <div id="meuCalendario"></div>
            <div id="meuCalendario"></div>


    </div>
    </div>

</div>