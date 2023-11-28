import e from"./api.js";async function lockUploadButton(){document.getElementById("uploadButton").classList.toggle("bg-gray-600",!0),document.getElementById("uploadButton").classList.toggle("hover:bg-gray-700",!0),document.getElementById("uploadButton").classList.toggle("hover:bg-blue-800",!1),document.getElementById("uploadButton").classList.toggle("bg-blue-700",!1),document.getElementById("uploadButton").disabled=!0}async function unlockUploadButton(){document.getElementById("uploadButton").classList.toggle("bg-gray-600",!1),document.getElementById("uploadButton").classList.toggle("hover:bg-gray-700",!1),document.getElementById("uploadButton").classList.toggle("bg-blue-700",!0),document.getElementById("uploadButton").classList.toggle("hover:bg-blue-800",!0),document.getElementById("uploadButton").disabled=!1}async function showErrorModal(e){document.getElementById("errorMessage").innerText=e,document.getElementById("errorModal").style.display="block",document.querySelector(".overlay").style.display="block"}async function closeModal(e){document.getElementById("errorModal").style.display="none",document.querySelector(".overlay").style.display="none"}document.getElementById("uploadButton").addEventListener("click",async()=>{let t=document.getElementById("fileInput"),l=document.getElementById("linkInput");if(!t.files.length&&!l.value.length){await showErrorModal("Пожалуйста, выберите файл/ссылку для загрузки.");return}try{await lockUploadButton();let o;l.value.length>0&&(o=await e.transcribeLink(l.value)),t.files.length>0&&(o=await e.transcribeAudioFile(t.files[0])),o&&(document.getElementById("resultText").innerText=o,document.getElementById("result").style.display="")}catch(n){console.error("Ошибка:",n),await showErrorModal("Произошла ошибка во время обработки. Попробуйте еще раз.")}finally{await unlockUploadButton()}}),document.getElementById("errorMessage").addEventListener("click",closeModal),document.getElementById("errorButton").addEventListener("click",closeModal),document.querySelector(".overlay").addEventListener("click",closeModal);