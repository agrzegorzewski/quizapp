# Simple Quiz App

## Live Demo

A live demo of the app is available at [https://quizapp.grzegorzew.ski](https://quizapp.grzegorzew.ski).

## Introduction

This project is a Simple Quiz App that leverages the [Open Trivia Database](https://opentdb.com) to fetch an assortment of questions for users to answer. Built with Next.js 14.1 and utilizing Mantine for its UI components, this app is designed to provide an engaging and responsive quiz experience. Questions are fetched server-side and delivered along with the client UI, ensuring a seamless user experience without the need for refetching client-side.

## Key Features

-   **Dynamic Quiz Generation**: Leverages the Open Trivia Database to generate quizzes across a variety of subjects and difficulties.
-   **Server-Side Rendering**: Questions are fetched server-side and sent with the initial page load, minimizing load times and enhancing user experience.
-   **Modern UI**: Utilizes Mantine components for a sleek, modern user interface that is both responsive and accessible.
-   **Customizable Quiz Options**: Users can select quiz categories, difficulty, and type before starting, allowing for a personalized quiz experience.

## Key Technologies

-   **Next.js 14.1**: For server-side rendering and static site generation.
-   **Mantine**: A comprehensive React component library for building responsive and visually appealing user interfaces.
-   **Open Trivia Database API**: For fetching an extensive range of trivia questions and answers.

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node 20 or higher

    or

-   Docker

### Build the app directly

To get the app running on your local machine, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/agrzegorzewski/quizapp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd quizapp
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to `http://localhost:3000` to view the app.

### Build the app using Docker

To build the app using Docker, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/agrzegorzewski/quizapp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd quizapp
    ```
3. Build the Docker image:
    ```bash
    docker build -t quizapp .
    ```
4. Run the Docker container:
    ```bash
    docker run -p 3000:3000 quizapp
    ```
    or if you want to run the container in the background:
    ```bash
    docker run -p 3000:3000 -d quizapp
    ```
5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage

To use the app, simply navigate to the home page and select your desired quiz options. Once you've made your selections, click the "Start Quiz" button to begin. Answer the questions as they appear, and once you've completed the quiz, you'll be presented with your score and the option to restart. Enjoy!

## License

This project is open-source and licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

-   [Open Trivia Database](https://opentdb.com)
-   [Next.js](https://nextjs.org)
-   [Mantine](https://mantine.dev)
-   [Tabler Icons](https://tablericons.com)
-   [Create T3 App](https://create.t3.gg/)
-   [Docker](https://docker.com)
