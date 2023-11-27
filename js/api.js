import {
    client
} from "https://cdn.jsdelivr.net/npm/@gradio/client@0.1.4/dist/index.min.js";

export default {
    name: "App",
    stt_client: await client("https://sanchit-gandhi-whisper-jax.hf.space/"),
    async transcribeAudioBlob(audioBlob) {
        for (let tryCounter = 0; tryCounter < 3; tryCounter++) {
            try {
                const result = await this.stt_client.predict("/predict", [
                    audioBlob,
                    "transcribe",
                    true
                ]);
                return result.data[0];
            } catch (e){
                console.log(e)
            }

        }
        throw new Error("tryCounter exceed.");
    },

    async transcribeAudioFile(audioBlob) {
        for (let tryCounter = 0; tryCounter < 3; tryCounter++) {
            try {
                const result = await this.stt_client.predict("/predict_1", [
                    audioBlob,
                    "transcribe",
                    true
                ]);
                return result.data[0];
            } catch (e){
                console.log(e)
            }

        }
        throw new Error("tryCounter exceed.");
    },

    async transcribeLink(audioURL) {
        for (let tryCounter = 0; tryCounter < 3; tryCounter++) {
            try {
                const result = await this.stt_client.predict("/predict_2", [
                    audioURL,
                    "transcribe",
                    true
                ]);
                return result.data[1];
            } catch (e){
                console.log(e)
            }

        }
        throw new Error("tryCounter exceed.");
    }
}