# QuizMaster – Full-Stack Quiz Application

QuizMaster is a full-stack web application that allows users to create quizzes by category, answer multiple-choice questions, submit their responses, and view their scores. It is built using React for the frontend and Spring Boot for the backend, with PostgreSQL as the database.

## Features

- Create quizzes by selecting a category and number of questions.
- Display multiple-choice questions with four options.
- Submit answers and calculate the final score.
- Retrieve questions through REST APIs.
- Store quiz and question data in a PostgreSQL database.
- Responsive user interface for interacting with quizzes.

## Tech Stack

**Frontend**
- React
- JavaScript
- HTML5
- CSS3
- Axios

**Backend**
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST APIs

**Database**
- PostgreSQL

**Tools**
- Git and GitHub
- Postman
- VS Code / IntelliJ IDEA

## Project Structure

```text
QuizMaster/
├── Backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── mvnw
├── quiz-frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the application:

- Java Development Kit (JDK) 17
- Maven (or use the included Maven Wrapper)
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/IndiraMallarapu/QuizMaster.git
cd QuizMaster
```

### 2. Configure PostgreSQL

Create a PostgreSQL database named `questiondb`.

Configure the database connection in `Backend/src/main/resources/application.properties` using environment variables:

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/questiondb}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:}
spring.jpa.hibernate.ddl-auto=update
```

Set `DB_USERNAME` and `DB_PASSWORD` to match your PostgreSQL credentials. Ensure your database contains question records before creating a quiz.

### 3. Run the Spring Boot Backend

Open a terminal in the project root and execute:

```bash
cd Backend
mvnw.cmd spring-boot:run
```

On Windows, you can use the included Maven Wrapper. The backend runs on port `8080` by default.

### 4. Run the React Frontend

Open a second terminal:

```bash
cd quiz-frontend
npm install
npm start
```

The frontend runs at:

http://localhost:3000

Make sure the backend is running before using the quiz application.

## API Endpoints

The backend exposes the following quiz APIs:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/Quiz/Create?category=Java&numq=5&title=JQuiz` | Create a quiz |
| GET | `/Quiz/quiz/{id}` | Retrieve quiz questions |
| POST | `/Quiz/submit/{id}` | Submit answers and retrieve the score |

The backend also provides question-related endpoints for managing and retrieving question data.

## How It Works

1. The user selects a quiz category and the number of questions.
2. The frontend sends a request to the Spring Boot backend to create the quiz.
3. The backend retrieves suitable questions from PostgreSQL.
4. The frontend displays the questions and available options.
5. The user selects answers and submits the quiz.
6. The backend evaluates the responses and returns the final score.

## Future Enhancements

- Display correct and incorrect answer feedback after submission.
- Add user authentication and quiz history.
- Introduce difficulty-based quiz selection.
- Add a leaderboard and performance analytics.
- Deploy the frontend, backend, and database to cloud hosting platforms.

## Author

**Indira Mallarapu**

GitHub: [IndiraMallarapu](https://github.com/IndiraMallarapu)

---

*QuizMaster is a learning project developed to practice full-stack application development using React, Spring Boot, REST APIs, and PostgreSQL.*
