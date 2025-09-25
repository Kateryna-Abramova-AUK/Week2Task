# Hello AI - LLM API Demo

A minimal web application that sends prompts to an LLM API and displays responses using OpenRouter's AI models.


## 🚀 Live Demo

[Try the Live Demo Here](https://kateryna-abramova-auk.github.io/Week2Task/) 

## ⚡ Quick Start

### Method 1: Simple Setup (Free Tier)
1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start chatting with the AI using the free tier!

### Method 2: With API Key (Recommended)
1. Clone or download the project files
2. Rename `config.example.js` to `config.js`
3. Get your free API key from [OpenRouter](https://openrouter.ai/keys)
4. Edit `config.js` and replace `'free'` with your API key:
   ```javascript
   OPENROUTER_API_KEY: 'sk-or-v1-your-actual-key-here'
   ```
5. Open `index.html` in your browser

## 🔧 Configuration

### API Key Setup
1. Visit [OpenRouter Keys Page](https://openrouter.ai/keys)
2. Create a free account if needed
3. Generate a new API key
4. Copy the key (starts with `sk-or-v1-`)
5. Paste it in `config.js`

## 🎯 Usage

1. **Enter your prompt** in the text area
2. **Click "Send to AI"** or press **Ctrl+Enter**
3. **Wait for the response** - loading indicator will show progress
4. **Read the AI's response** in the output area

### API Integration
```javascript
// Example API call structure
{
  model: 'mistralai/mistral-7b-instruct:free',
  messages: [{ role: 'user', content: 'Your prompt' }],
  max_tokens: 500
}
```

### Debug Mode
Open browser console (F12) and use:
```javascript
// Check API status
window.aiAPI.getApiKeyStatus()

// Test API connection
window.uiController.handleSubmit()

// View configuration
console.log(window.CONFIG)
```

## 🌐 API Reference

### OpenRouter API
- **Base URL**: `https://openrouter.ai/api/v1`
- **Endpoint**: `/chat/completions`
- **Authentication**: Bearer token
- **Rate Limits**: [View Details](https://openrouter.ai/docs#limits)

### Supported Models
- Mistral 7B Instruct (Free)
- Google Gemini Pro (Free)
- Meta Llama 2 (Free)
- And 100+ other models

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai) for providing free AI API access
- [Mistral AI](https://mistral.ai) for the excellent 7B model
- All open-source contributors to the AI ecosystem


![alt text](image.png)
