import{client as t}from"https://cdn.jsdelivr.net/npm/@gradio/client@0.1.4/dist/index.min.js";export default{name:"App",stt_client:await t("https://sanchit-gandhi-whisper-jax.hf.space/"),async transcribeAudioBlob(t){for(let e=0;e<3;e++)try{let r=await this.stt_client.predict("/predict",[t,"transcribe",!1]);return r.data[0]}catch(i){console.log(i)}throw Error("tryCounter exceed.")},async transcribeAudioFile(t){for(let e=0;e<3;e++)try{let r=await this.stt_client.predict("/predict_1",[t,"transcribe",!1]);return r.data[0]}catch(i){console.log(i)}throw Error("tryCounter exceed.")},async transcribeLink(t){for(let e=0;e<3;e++)try{let r=await this.stt_client.predict("/predict_2",[t,"transcribe",!1]);return r.data[1]}catch(i){console.log(i)}throw Error("tryCounter exceed.")}};