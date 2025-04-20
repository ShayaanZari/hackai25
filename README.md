# Hope Haven - Empowering Survivors

## Inspiration

We all know someone – a friend, a family member – who has faced the devastating impact of abuse. Finding safety and support in these situations can be confusing and difficult, especially during a crisis. Navigating available resources can feel like an impossible task during a crisis. Our inspiration comes from a deep understanding of this struggle. We believe everyone deserves clear, accessible ways to find support and safety. This project, **Hope Haven**, is our commitment to making that a reality.

## What it Does

Hope Haven provides a simple, guided experience for individuals facing difficult or abusive situations. This app helps users:

* **Assess Risk:** Understand the immediate risk level through intuitive questioning.
* **Recognize Escalation:** Identify patterns and predict potential danger.
* **Connect with Resources:** Eventually connect directly with relevant and accessible support organizations that can provide the help needed.

## How It Was Built

We needed a tech stack that could be developed rapidly. Hence, we used:

* **React Native:** To create a seamless mobile experience accessible across various devices.
* **n8n:** To orchestrate powerful API calls and automate the flow of information.
* **Gemini:** Integrating advanced AI to analyze user input and connect them with appropriate resources through a multi-agent architecture.

## Getting Started (Development Instructions)

To get the development environment up and running, follow these steps:

### 1. React Native (Mobile App)

1.  **Prerequisites:** Ensure you have Node.js, npm (or yarn), and the React Native CLI installed on your system. Follow the official React Native environment setup guide for your operating system: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

2.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd your-project-directory/mobile-app  # Assuming your React Native app is in a 'mobile-app' folder
    ```

3.  **Install dependencies:**
    ```bash
    npm install  # or yarn install
    ```

4.  **Run the app:**
    * **For iOS:**
        ```bash
        npx react-native run-ios
        ```
        (You may need Xcode installed)
    * **For Android:**
        ```bash
        npx react-native run-android
        ```
        (You may need the Android SDK and emulator/device set up)

### 2. n8n (Automation Backend)

1.  **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed.

2.  **Installation:** You can install n8n globally or within a project. For local development:
    ```bash
    npm install n8n -g  # Install globally
    # or
    # npm install n8n --save-dev # Install as a project dependency (if you have a dedicated n8n project folder)
    ```

3.  **Start n8n:**
    ```bash
    n8n start
    ```
    This will usually open the n8n UI in your web browser (typically at `http://localhost:5678`). You can then create your workflows that handle API calls and interact with Gemini.

### 3. Gemini (AI Integration - Likely via API)

1.  **Prerequisites:**
    * You will need an API key from Google Cloud AI Platform or Google AI Studio to access the Gemini models. Follow the official Google documentation to set up your project and obtain an API key.

2.  **Integration within n8n:**
    * In your n8n workflows, you will likely use the "HTTP Request" node or a dedicated Google Cloud node (if available) to make API calls to the Gemini API endpoints.
    * You will need to configure the API endpoint (e.g., for text generation or other Gemini functionalities), include your API key in the headers or query parameters as required by the Gemini API documentation, and format your requests according to the API specifications.

    * **Example (Conceptual n8n HTTP Request Node Configuration):**
        * **Method:** POST
        * **URL:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY`
        * **Headers:** `Content-Type: application/json`
        * **Body (JSON Example):**
            ```json
            {
              "contents": [{ "parts": [{"text": "Analyze this user input: ..."}] }]
            }
            ```
        * **Note:** Refer to the official Gemini API documentation for the exact endpoint, request body structure, and authentication methods.

3.  **Integration within React Native (if direct calls are made):**
    * If your React Native app directly interacts with the Gemini API (less common for complex AI logic, often handled by a backend like n8n), you would use a library like `axios` or the built-in `fetch` API in JavaScript to make HTTP requests to the Gemini API endpoints. Ensure you securely handle your API key and follow the API documentation for request formatting and authentication.

**Important Notes:**

* Replace `[YOUR_REPOSITORY_URL]` with the actual URL of your project's Git repository.
* The specific commands and setup steps might vary slightly depending on your operating system, project structure, and the versions of the tools you are using. Always refer to the official documentation for the most up-to-date instructions.
* For the Gemini integration, you will need to consult the official Google Cloud AI Platform or Google AI Studio documentation for detailed API usage and authentication guidelines.
* This "Getting Started" section assumes a basic understanding of React Native and n8n development.

## Challenges We Faced

A core challenge that we faced was creating a system that respects user privacy while still allowing users to get the support they needed. To tackle this problem, we designed a question sequence that determines risk without requiring users to log in, ensuring no personal or sensitive data is logged. We eventually found a way to develop a method to track the evolving nature of a situation without compromising individual anonymity.

## Accomplishments That We're Proud Of

We're incredibly proud of every aspect of Hope Haven, from the user-friendly visuals to the smart algorithm platform, which was purposefully designed for maximum assistance and ease of use. We built this from the ground up, making sure it's a thoughtful and effective tool for people who need it the most.

## What We Learned

Despite having limited prior experience working with React Native, n8n, and AI integration, our team was able to embrace the challenge. We gained invaluable hands-on experience in full-stack mobile development, automation workflows, and leveraging AI for social good. This hackathon has been an incredible learning journey for all of us and a great experience we hope to take into the future.

## What's Next for Hope Haven

We hope to scale these features in the future and improve how the app conveys information and support options to users. On the other hand, we hope to develop a more sophisticated algorithm to better understand situation escalation and resource effectiveness, all while ensuring user anonymity. We aspire to eventually direct users to a live agent who is willing to not only diagnose but also to be there live 24/7.
