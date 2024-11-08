# Vultr AI Chatbot

A Laravel-based chatbot that interacts with users and utilizes the Vultr Vector Store for response generation.

## Table of Contents

- [Installation](#installation)
- [Build and Deployment](#build-and-deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/srikxcipher/SERENE-AI/tree/vultr-laravel-chatbot.git
   cd repository

    
2. **Configure your environment:**
   Copy the .env.example file to .env:
    ```bash
   cp .env.example .
   Update the .env file with your application's configurations and Vultr API credentials:
    ```bash
   VULTR_API_KEY=your_api_key
   VULTR_VECTOR_STORE_URL=https://api.vultrinference.com/v1/vector_store
   VULTR_COLLECTION_ID=chatbot
4. **Generate the application key:**
   

