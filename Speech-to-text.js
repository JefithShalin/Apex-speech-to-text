//Add this JavaScript code in ‘Execute when Page Loads’ section

document.getElementById("start-speech").addEventListener("click", function () {
try {
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
alert("Speech Recognition is not supported in this browser.");
return;
}
const recognition = new SpeechRecognition();
const langSelect = document.getElementById("speech-lang");
recognition.lang = langSelect.value;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
document.getElementById("speech-status").style.display = "block";
document.getElementById("listening-msg").style.display = "block";
recognition.start();
recognition.onresult = function (event) {
const speechResult = event.results[0][0].transcript;
const currentText = $v("P15_NOTES");
$s("P15_NOTES", currentText + " " + speechResult);
};
recognition.onerror = function (event) {
console.error("Speech recognition error", event.error);
alert("Error during speech recognition: " + event.error);
};
recognition.onend = function () {
document.getElementById("speech-status").style.display = "none";
document.getElementById("listening-msg").style.display = "none";
};
} catch (e) {
console.error("Speech recognition not supported", e);
}
});
