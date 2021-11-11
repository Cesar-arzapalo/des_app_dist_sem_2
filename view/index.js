const API_URL = 'http://localhost:2800';

const HTMLResponse1 = document.querySelector("#data1");
const HTMLResponse2 = document.querySelector("#data2");


/* fetch(`http://localhost:2800/personas`)
	.then((response) => {response.json()})
	.then((persons)) */

fetch(`${API_URL}/personas`)
	.then( (response) => response.json())
	.then( (persons) => {
		console.log("primero",persons);
		const template = persons.mensaje.map( (person) => `<li>DNI: ${person.dni} | Nombre: ${person.nombre} | Celular: ${person.celular} | Fecha de nacimiento: ${person.fechanac} </li>`);
		console.log("entro al fetch");
		HTMLResponse1.innerHTML = `<ul>${template}</ul>`
	})

fetch(`${API_URL}/mentores`)
	.then( (response) => response.json())
	.then( (persons) => {
		console.log("oasdasd",persons);
		const template = persons.mensaje.map( (person) => `<li>Nivel: ${person.nivel} | tipo_Mentor : ${person.tipo_mentor}`);
		HTMLResponse2.innerHTML = `<ul>${template}</ul>`
	})