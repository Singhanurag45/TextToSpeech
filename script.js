let speech = new SpeechSynthesisUtterance();
let voices = [];
let voicesSelect = document.querySelector("select");
let synth = window.speechSynthesis;

// Function to load voices
function loadVoices() {
  voices = synth.getVoices();
  voicesSelect.innerHTML = ""; // Clear previous options
  voices.forEach((voice, i) => {
    let option = new Option(voice.name, i);
    voicesSelect.add(option);
  });

  // Set default voice
  if (voices.length > 0) {
    speech.voice = voices[0];
  }
}

// Ensure voices load properly
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

// Change voice when user selects a different one
voicesSelect.addEventListener("change", () => {
  speech.voice = voices[parseInt(voicesSelect.value)];
});

// Speak text when button is clicked
document.querySelector("button").addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel(); // Stop previous speech before starting new one
  }
  speech.text = document.querySelector("textarea").value;
  synth.speak(speech);
});
