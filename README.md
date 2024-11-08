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
   cd SERENE-AI

2. **Install dependencies:**
   Make sure you have Composer installed. Then run:
   ```bash
   composer install

    
2. **Configure your environment:**
   Copy the .env.example file to .env:
    ```bash
    cp .env.example .

3. **Setup the Vultr requirements**    
    ```bash
   VULTR_API_KEY=your_api_key
   VULTR_VECTOR_STORE_URL=https://api.vultrinference.com/v1/vector_store
   VULTR_COLLECTION_ID=chatbot

4. **Generate the application key:**
    ```bash
    php artisan key:generate

## Build and Deployment
1. **Build the application:**
   If you're using features like Laravel Mix for asset compilation, run:
   ```bash
   npm install
   npm run dev

2. **Deploying the application:**
   You can deploy your Laravel application to a server that meets the Laravel server requirements. Common steps for deployment include:
   -Uploading your project files to the server.
   -Setting the correct permissions for storage and bootstrap/cache directories:
   ```bash
   chmod -R 775 storage
   chmod -R 775 bootstrap/cache

  -Configuring your web server (e.g., Nginx or Apache) to serve the application from the public directory.
  -Running the following command to optimize your application for production:
   
    ```bash
    php artisan optimize

## Usage
1. **Starting the local development server:**
   ```bash
   php artisan serve

   Access your application at http://localhost:8000.

3. **Interacting with the chatbot:**
4. 
   -Open your browser and navigate to the home page.
   
   -Type a message in the input box and click "Send" to interact with the chatbot.
   
5. **Adding training data:**
   -Use the "Add Training Data" section to input content and descriptions for training purposes.

## Contributing

Contributions are welcome! Please follow these steps:

-Fork the repository.

-Create a new branch for your feature or fix.

-Make your changes and commit them.

-Push your branch and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


