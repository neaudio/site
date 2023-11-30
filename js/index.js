// Модульные API-вызовы
import Api from "./api.js";

document.getElementById("uploadButton").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const linkInput = document.getElementById("linkInput");

    if (!fileInput.files.length && !linkInput.value.length) {
        await showErrorModal("Пожалуйста, выберите файл/ссылку для загрузки.");
        return;
    }

    try {
        await lockUploadButton();
        let transcribedText = undefined;
        var blobURL = undefined;

        if (linkInput.value.length > 0){
            transcribedText = await Api.transcribeLink(linkInput.value);
        }
        if (fileInput.files.length > 0) {
            blobURL = window.URL.createObjectURL(fileInput.files[0]);
            transcribedText = await Api.transcribeAudioFile(fileInput.files[0]);
        }

        if (blobURL){
            document.getElementById("audioField").classList.toggle("hidden", false)
            document.getElementById("audioSource").src = blobURL;
        } else {
            document.getElementById("audioField").classList.toggle("hidden", true)
        }

        if (transcribedText){
            document.getElementById("resultText").innerText = transcribedText;
            document.getElementById("result").style.display = ""; // display
        }

    } catch (error) {
        console.error("Ошибка:", error);
        await showErrorModal("Произошла ошибка во время обработки. Попробуйте еще раз.");
    }
    finally {
        await unlockUploadButton();
    }
});

async function lockUploadButton(){
    document.getElementById("uploadButton").classList.toggle("bg-gray-600", true)
    document.getElementById("uploadButton").classList.toggle("hover:bg-gray-700", true)
    document.getElementById("uploadButton").classList.toggle("hover:bg-blue-800", false)
    document.getElementById("uploadButton").classList.toggle("bg-blue-700", false)
    document.getElementById("uploadButton").disabled = true;


}

async function unlockUploadButton(){
    document.getElementById("uploadButton").classList.toggle("bg-gray-600", false)
    document.getElementById("uploadButton").classList.toggle("hover:bg-gray-700", false)
    document.getElementById("uploadButton").classList.toggle("bg-blue-700", true)
    document.getElementById("uploadButton").classList.toggle("hover:bg-blue-800", true)
    document.getElementById("uploadButton").disabled = false;


}

async function showErrorModal(message) {
    document.getElementById('errorMessage').innerText = message;
    document.getElementById('errorModal').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}
// Функция для закрытия модального окна
async function closeModal(e) {
    document.getElementById('errorModal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

function downloadAsFile(text, filename, fileType) {
    const blob = new Blob([text], { type: fileType });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

// error handling
document.getElementById("errorMessage").addEventListener("click", closeModal)
document.getElementById("errorButton").addEventListener("click", closeModal)
document.querySelector(".overlay").addEventListener("click", closeModal)
document.getElementById('downloadButton').addEventListener('click', function() {
    const text = document.getElementById('resultText').innerText;
    downloadAsFile(text, 'result.txt', 'text/plain');
});
document.getElementById('copyButton').addEventListener('click', function() {
    document.getElementById('copyButton').disabled = true;
    const text = document.getElementById('resultText').innerText;
    navigator.clipboard.writeText(text);
    document.getElementById('copyButton').innerHTML="<span class=\"material-icons\">done</span> Готово!";
    setTimeout(()=>{
        document.getElementById('copyButton').disabled = false;
        document.getElementById('copyButton').innerHTML="<span class=\"material-icons\">content_copy</span>" +
            "Скопировать";

    }, 2000)
});

