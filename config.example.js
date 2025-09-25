// config.example.js - Example configuration file
// Copy this file to config.js and update with your actual API key

const CONFIG = {
    OPENROUTER_API_KEY: 'free', // Change to your API key: 'sk-or-v1-...'
    
    API_SETTINGS: {
        baseURL: 'https://openrouter.ai/api/v1',
        endpoints: {
            chat: '/chat/completions'
        },
        model: 'mistralai/mistral-7b-instruct:free', // You can change this model
        maxTokens: 500,
        headers: {
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Hello AI Demo'
        }
    }
};

// Initialize headers with API key
CONFIG.API_SETTINGS.headers['Authorization'] = `Bearer ${CONFIG.OPENROUTER_API_KEY}`;