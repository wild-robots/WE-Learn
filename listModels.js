
import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
    const apiKey = "AIzaSyDCqDaW-xJaW0WM5fP9d_MVuk5FIlXeKII";
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const models = await genAI.listModels();
        console.log("Available models:");
        models.models.forEach(m => {
            console.log(`- ${m.name} (${m.supportedGenerationMethods})`);
        });
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

listModels();
