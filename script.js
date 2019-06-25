let btnEdit = document.querySelector('.convert');
let btnRep = document.querySelector('#replace');
let inputText = document.querySelector('#input-text');
let wordFrequency = document.querySelector('#options-freq');

// FUNCTION LOGIC

// removing function
function removeWords() {
    let inputTextArea = document.getElementById('input-text');
    let outputTextArea = document.getElementById('output-text');
    let removeWordsField = document.querySelector('#options-delete');
    let wordsToDelete = removeWordsField.value.trim().toLowerCase().split(' '); 
    let textArray = inputTextArea.value.trim().split(/\b/);

    let resultText = textArray.filter(word=>{
        return !wordsToDelete.includes(word.toLowerCase());
    })

    outputTextArea.value = resultText.join('');
}

//replacing function
function replace() {
    let textArray = inputText.value.trim().split(/\b/);
    let outputTextArea = document.getElementById('output-text');
    let wordsToReplace = document.querySelector('#options-replace').value.trim().split(' ');
    let replacement = document.querySelector('#options-replace__new').value;

    textArray.forEach(word=>{
        for (let wordRep of wordsToReplace) {
            if (word.toLowerCase() == wordRep.toLowerCase()) {
                textArray.splice(textArray.indexOf(word),1,replacement)
            }
        }
    })
    outputTextArea.value = textArray.join('');
}

//counting words and sentences function
function counter() {
    let wordsAmountField = document.querySelector('#wordsAmount');
    let sentencesAmountField = document.querySelector('#sentencesAmount');
    let textArray = inputText.value.trim().split(/ \b/);
    let sentenceCounter = 0;

    textArray.forEach(w=>{
        if (w[w.length - 1] == '!' || w[w.length - 1] == '?' || w[w.length - 1] == '.' 
        || w[w.length - 1] == '...') {
            sentenceCounter++;
        }
    });

    sentencesAmountField.innerHTML = sentenceCounter;
    wordsAmountField.innerHTML = textArray.length;
}

// word's frequency function
function wordTimes() {
    let word = wordFrequency.value.trim();
    let textArray = inputText.value.trim().split(/\b/);
    let wordTimesField = document.querySelector('#options-freq__times');
    let counter = 0;

    textArray.forEach(w=>{
        if(word == w) {
            counter++;
        }
    })
    wordTimesField.innerHTML = counter;
}

// HANDLING EVENTS

btnEdit.addEventListener('click', removeWords);

inputText.addEventListener('input', counter);

btnEdit.addEventListener('click', ()=>{
    let wordsAmountField = document.querySelector('#wordsAmountRes');
    let textArray = document.querySelector('#output-text').value.trim().split(/ \b/);

    wordsAmountField.innerHTML = textArray.length;
});

btnRep.addEventListener('click', replace);

wordFrequency.addEventListener('input', wordTimes)

// text appearing animation

const description = document.querySelector('.characteristics');

const options = {
    root: null,
    threshold: 0.5,
}

const observer = new IntersectionObserver(function(entries,observer){
    console.log(entries[0].target)
    entries.forEach(e=>{
        if (!e.isIntersecting) {
            return;
        }
        console.log(e.target);
        e.target.classList.toggle('animation')
        observer.unobserve(e.target);
    });
}, options)

observer.observe(description);
