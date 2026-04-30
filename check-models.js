require('dotenv').config({ path: '.env.local' });

async function checkModels() {
    try {
        const fetch = (await import('node-fetch')).default;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        console.log("✅ ඔබගේ API Key එකට වැඩ කරන Models ලැයිස්තුව:\n");
        
        if (data.models) {
            data.models.forEach(model => {
                if(model.name.includes('gemini') && model.supportedGenerationMethods.includes('generateContent')) {
                    // 'models/' කියන කෑල්ල අයින් කරලා නම විතරක් පෙන්වන්න
                    console.log(`➡️  ${model.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("දෝෂයක්! API Key එක වැරදියි හෝ එය අවහිර වී ඇත:", data);
        }
    } catch (error) {
        console.error("Connection Error:", error);
    }
}

checkModels();