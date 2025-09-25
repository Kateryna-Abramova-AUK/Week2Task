// config.js - API Configuration
// ⚠️ WARNING: This file contains sensitive information. Add it to .gitignore!

const CONFIG = {
    OPENROUTER_API_KEY: 'sk-or-v1-...', // Default to free tier
    // Replace 'free' with your actual API key: 'sk-or-v1-...'
    
    API_SETTINGS: {
        baseURL: 'https://openrouter.ai/api/v1',
        endpoints: {
            chat: '/chat/completions'
        },
        model: 'mistralai/mistral-7b-instruct:free',
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