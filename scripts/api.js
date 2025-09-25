// API Service using config.js
class OpenRouterAPI {
    constructor() {
        this.config = CONFIG.API_SETTINGS;
        this.updateApiKeyStatus();
    }

    // Update API key status display
    updateApiKeyStatus() {
        const isFreeTier = CONFIG.OPENROUTER_API_KEY === 'free';
        const statusElement = document.getElementById('api-key-status');
        const keyTypeElement = document.getElementById('key-type');
        
        if (statusElement) {
            if (isFreeTier) {
                statusElement.innerHTML = `
                    <span class="status-free">Using Free Tier</span>
                    <small>Add your API key in config.js for better performance</small>
                `;
            } else {
                statusElement.innerHTML = `
                    <span class="status-premium">Using Premium API Key</span>
                    <small>Better rate limits and performance</small>
                `;
            }
        }
        
        if (keyTypeElement) {
            keyTypeElement.textContent = isFreeTier ? 'Free Tier' : 'Premium';
        }
    }

    async sendPrompt(prompt) {
        try {
            console.log('Sending request to OpenRouter API...');
            console.log('Model:', this.config.model);
            console.log('API Key type:', CONFIG.OPENROUTER_API_KEY === 'free' ? 'Free' : 'Premium');

            const response = await fetch(`${this.config.baseURL}${this.config.endpoints.chat}`, {
                method: 'POST',
                headers: this.config.headers,
                body: JSON.stringify({
                    model: this.config.model,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: this.config.maxTokens
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error: ${response.status} ${response.statusText}. ${errorText}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                return {
                    success: true,
                    content: data.choices[0].message.content,
                    usage: data.usage,
                    model: data.model
                };
            } else {
                throw new Error('No response from AI model');
            }
            
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Method to update API key dynamically
    updateApiKey(newKey) {
        CONFIG.OPENROUTER_API_KEY = newKey;
        this.config.headers['Authorization'] = `Bearer ${newKey}`;
        this.updateApiKeyStatus();
    }

    // Method to get current API key status
    getApiKeyStatus() {
        return {
            isFreeTier: CONFIG.OPENROUTER_API_KEY === 'free',
            key: CONFIG.OPENROUTER_API_KEY === 'free' ? 'free' : 'configured'
        };
    }
}

// Create API instance
const aiAPI = new OpenRouterAPI();