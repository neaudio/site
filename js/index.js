import e from"./api.js";async function lockUploadButton(){document.getElementById("uploadButton").classList.toggle("bg-gray-600",!0),document.getElementById("uploadButton").classList.toggle("hover:bg-gray-700",!0),document.getElementById("uploadButton").classList.toggle("hover:bg-blue-800",!1),document.getElementById("uploadButton").classList.toggle("bg-blue-700",!1),document.getElementById("uploadButton").disabled=!0}async function unlockUploadButton(){document.getElementById("uploadButton").classList.toggle("bg-gray-600",!1),document.getElementById("uploadButton").classList.toggle("hover:bg-gray-700",!1),document.getElementById("uploadButton").classList.toggle("bg-blue-700",!0),document.getElementById("uploadButton").classList.toggle("hover:bg-blue-800",!0),document.getElementById("uploadButton").disabled=!1}async function showErrorModal(e){document.getElementById("errorMessage").innerText=e,document.getElementById("errorModal").style.display="block",document.querySelector(".overlay").style.display="block"}async function closeModal(e){document.getElementById("errorModal").style.display="none",document.querySelector(".overlay").style.display="none"}function downloadAsFile(e,t,l){let n=new Blob([e],{type:l}),o=document.createElement("a");o.href=URL.createObjectURL(n),o.download=t,o.click()}document.getElementById("uploadButton").addEventListener("click",async()=>{let t=document.getElementById("fileInput"),l=document.getElementById("linkInput");if(!t.files.length&&!l.value.length){await showErrorModal("Пожалуйста, выберите файл/ссылку для загрузки.");return}try{await lockUploadButton();let n;var o=void 0;l.value.length>0&&(n=await e.transcribeLink(l.value)),t.files.length>0&&(o=window.URL.createObjectURL(t.files[0]),n=await e.transcribeAudioFile(t.files[0])),o?(document.getElementById("audioField").classList.toggle("hidden",!1),document.getElementById("audioSource").src=o):document.getElementById("audioField").classList.toggle("hidden",!0),n&&(document.getElementById("resultText").innerText=n,document.getElementById("result").style.display="")}catch(a){console.error("Ошибка:",a),await showErrorModal("Произошла ошибка во время обработки. Попробуйте еще раз.")}finally{await unlockUploadButton()}}),document.getElementById("errorMessage").addEventListener("click",closeModal),document.getElementById("errorButton").addEventListener("click",closeModal),document.querySelector(".overlay").addEventListener("click",closeModal),document.getElementById("downloadButton").addEventListener("click",function(){let e=document.getElementById("resultText").innerText;downloadAsFile(e,"result.txt","text/plain")}),document.getElementById("copyButton").addEventListener("click",function(){document.getElementById("copyButton").disabled=!0;let e=document.getElementById("resultText").innerText;navigator.clipboard.writeText(e),document.getElementById("copyButton").innerHTML='<span class="material-icons">done</span> Готово!',setTimeout(()=>{document.getElementById("copyButton").disabled=!1,document.getElementById("copyButton").innerHTML='<span class="material-icons">content_copy</span>Скопировать'},2e3)});