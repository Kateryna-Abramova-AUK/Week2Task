// DOM Elements
class DOMElements {
    constructor() {
        this.submitBtn = document.getElementById('submit-btn');
        this.promptInput = document.getElementById('prompt');
        this.responseDiv = document.getElementById('response');
        this.loadingDiv = document.getElementById('loading');
        this.errorDiv = document.getElementById('error');
        this.apiKeyStatus = document.getElementById('api-key-status');
        this.currentModel = document.getElementById('current-model');
    }
}

// UI Controller
class UIController {
    constructor(domElements) {
        this.dom = domElements;
        this.initializeEventListeners();
        this.setSamplePrompt();
        this.displayApiKeyInfo();
    }

    initializeEventListeners() {
        // Submit button click
        this.dom.submitBtn.addEventListener('click', () => this.handleSubmit());

        // Ctrl+Enter shortcut
        this.dom.promptInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.handleSubmit();
            }
        });

        // Clear error when user starts typing
        this.dom.promptInput.addEventListener('input', () => {
            this.hideError();
        });
    }

    displayApiKeyInfo() {
        const status = aiAPI.getApiKeyStatus();
        this.dom.currentModel.textContent = CONFIG.API_SETTINGS.model;
        
        if (status.isFreeTier) {
            this.showFreeTierWarning();
        }
    }

    showFreeTierWarning() {
        console.warn('Using free tier API key. For better performance, add your OpenRouter API key to config.js');
    }

    async handleSubmit() {
        const prompt = this.dom.promptInput.value.trim();
        
        if (!this.validatePrompt(prompt)) {
            return;
        }

        this.setLoadingState(true);
        this.hideError();
        this.clearResponse();

        const result = await aiAPI.sendPrompt(prompt);
        
        this.setLoadingState(false);
        
        if (result.success) {
            this.displayResponse(result.content, result.model);
        } else {
            this.displayError(result.error);
        }
    }

    validatePrompt(prompt) {
        if (!prompt) {
            this.displayError('Please enter a prompt.');
            return false;
        }

        if (prompt.length > 2000) {
            this.displayError('Prompt is too long. Please keep it under 2000 characters.');
            return false;
        }

        return true;
    }

    setLoadingState(isLoading) {
        this.dom.submitBtn.disabled = isLoading;
        this.dom.loadingDiv.style.display = isLoading ? 'flex' : 'none';
        
        if (isLoading) {
            this.dom.submitBtn.textContent = 'Sending...';
        } else {
            this.dom.submitBtn.textContent = 'Send to AI';
        }
    }

    displayResponse(content, model = null) {
        this.dom.responseDiv.textContent = content;
        this.dom.responseDiv.style.color = '#333';
        
        if (model) {
            console.log('Response received from model:', model);
        }
    }

    displayError(message) {
        this.dom.errorDiv.textContent = message;
        this.dom.errorDiv.style.display = 'block';
        this.dom.responseDiv.textContent = 'Error occurred. Please try again.';
        this.dom.responseDiv.style.color = '#e74c3c';
    }

    hideError() {
        this.dom.errorDiv.style.display = 'none';
    }

    clearResponse() {
        this.dom.responseDiv.textContent = 'Waiting for response...';
        this.dom.responseDiv.style.color = '#666';
    }

    setSamplePrompt() {
        const samplePrompts = [
            "Explain how large language models work in simple terms.",
            "What are the benefits of artificial intelligence?",
            "Write a short poem about technology.",
            "How does machine learning differ from traditional programming?"
        ];
        
        const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
        this.dom.promptInput.value = randomPrompt;
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const domElements = new DOMElements();
    const uiController = new UIController(domElements);
    
    // Make objects globally available for debugging
    window.uiController = uiController;
    window.aiAPI = aiAPI;
    window.CONFIG = CONFIG;
});