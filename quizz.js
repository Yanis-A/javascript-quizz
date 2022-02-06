// Datas

const quiz = [
  {
    question: "Inside which HTML element do we put the JavaScript ?",
    response: ["&lt;js>", "&lt;scripting>", "&lt;javascript>", "&lt;script>"],
    good: 3,
  },
  {
    question:
      'What is the correct JavaScript syntax to change the content of the HTML element ? &lt;p id="demo">This is a demonstration.&lt;/p>',
    response: [
      '#demo.innerHTML = "Hello World!";',
      'document.getElementById("demo").innerHTML = "Hello World!";',
      'document.getElement("p").innerHTML = "Hello World!";',
      'document.getElementByName("p").innerHTML = "Hello World!";',
    ],
    good: 1,
  },
  {
    question: "How do you create a function in JavaScript ?",
    response: [
      "function myFunction()",
      "function:myFunction()",
      "function = myFunction()",
    ],
    good: 0,
  },
  {
    question: "Which one of the following is the correct answer?",
    response: ["really not this one, i swear", "yeah definitely select this one"],
    good: 1,
  },
  {
    question: "Which one of the following JS elements does not exist?",
    response: ["function()", "addToHtml()","for()", "alert()",],
    good: 1,
  },
];

// --- Generer le formulaire

// passer en revue le tableau quizz et afficher la question

for (let j = 0; j < quiz.length; j++) {
  // question
  let template = `
	<div class="question pt-2 mt-3">
		<h5 class="py-2">${j + 1}/${quiz.length} ${quiz[j].question}</h5>`;

  // affichage des réponses
  for (let i = 0; i < quiz[j].response.length; i++) {
    let idReponse = j.toString() + i.toString();
    let idName = j.toString();

    template += `
	<div class="form-check">
		<input class="form-check-input" type="radio" id="r${idReponse}" name="response${idName}" />
		<label class="form-check-label" for="r${idReponse}">
			${quiz[j].response[i]}
		</label>
	</div>`;
  }

  template += "</div>";

  document.getElementById("quiz").innerHTML += template;
}

// --- Vérification du clic sur le bouton de validation
let validateButton = document.getElementById('validateButton');
validateButton.addEventListener('click', onFormSubmit);

function onFormSubmit() {
	// --- Compter les bonnes réponses

	let score = 0;
	
	// Parcours du tableau de questions
	for (let i = 0; i < quiz.length; i++) {

		const good = quiz[i].good;
		if (document.getElementById('r'+i+good).checked === true) {
			// score = score + 1;
			// score += 1;
			score++;
		}

		// Pour chaque question, on va chercher son tableau de réponses
		/* for (let j = 0; j < quiz[i].response.length; j++) {
			const good = quiz[i].good;

			if (good === j && document.getElementById('r'+i+j).checked === true) {
				// score = score + 1;
				// score += 1;
				score++;
			}
		} */

	}

	// --- Afficher le score final + commentaire personnalisé
	const total = quiz.length;
	const moy = total/2;
	const resultatEl = document.getElementById('result');

	if (score >= moy) {
		resultatEl.classList.remove('failed');
		resultatEl.classList.add('passed');
	}
	else {
		resultatEl.classList.remove('passed');
		resultatEl.classList.add('failed');
	}

	document.getElementById('result').innerHTML += 'Your score is '+`${score}`+' out of '+ `${quiz.length}`

	if (score === 0) {
		document.getElementById('comment').innerHTML += 'I mean... just read your lessons. &#128556'
	}
	else if (score < moy) {
		document.getElementById('comment').innerHTML += 'Meh, it is not that great, try harder. &#128533'
	}
	else if (score >= moy) {
		document.getElementById('comment').innerHTML += 'Yeah you are in the good way for succes my friend! &#9994'
	}
	else {
		document.getElementById('comment').innerHTML += 'Perfect ! &#127942'
	}

	//Scroll au top
	location.href = 'index.html#result'
	
	// Mettre toutes les bones réponses en vert
	for (let i = 0; i < quiz.length; i++) {
		const good = quiz[i].good;
		document.querySelector(`[for=r${i}${good}]`).classList.add('correct-answer')
	}
}
