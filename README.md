# Automatic Flagging System

A full-stack application designed to automate the evaluation and flagging of candidate applications based on configurable rules. The system provides a user-friendly interface for submitting applications, reviewing flagged records, and managing the review process.

## Preview

<!-- Add a screenshot here if available -->
<p align="center"><img width="700" alt="Automatic Flagging System Preview" src="https://github.com/user-attachments/assets/97fa6378-771a-4ffe-943a-5d61ef7c413e" /></p>

## Features

- Submit candidate applications via a structured form
- Automated flagging of applications based on predefined rules
- View, review, and update flagged applications
- Responsive design with Angular and PrimeNG UI components
- RESTful API for application data management

## Tech Stack

- **Frontend**: Angular + TypeScript + PrimeNG
- **Backend**: Node.js + Express + TypeScript
- **Database**: (Mock database or specify if using MongoDB, PostgreSQL, etc.)
- **UI Components**: PrimeNG
- **HTTP Client**: Angular HttpClient

## Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

## Installation

1. Clone the repository and install dependencies:

    ```bash
    git clone https://github.com/your-username/Automatic-Flagging-System.git
    cd Automatic-Flagging-System
    pnpm install
    ```

2. Install dependencies for both client and server Just to be same:

    ```bash
    # Install client dependencies
    cd apps/client
    pnpm install

    # Install server dependencies
    cd ../server
    pnpm install
    ```

3. Start the app all you need is one command thanks to turbo. :

    ```bash
    # In one terminal
    cd automatic-flagging-system
    pnpm run dev

    ```

## Project Structure

```
Automatic-Flagging-System/
├── apps/
│   ├── client/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/
│   │   │   │   │   ├── form/
│   │   │   │   │   ├── table/
│   │   │   │   │   └── review-section/
│   │   │   │   └── layout/
│   │   │   └── index.html
│   │   └── package.json
│   └── server/
│       ├── src/
│       │   ├── controllers/
│       │   ├── routers/
│       │   ├── models/
│       │   ├── services/
│       │   └── schema/
│       └── package.json
└── package.json
```

You can also check out client2. It was an attempt to make a Hybrid andgular app so I could use PrimeNG components on AngularJS as per the original requirements. Took me a very long time and I didn't succed however I did learn alot. I will continue to work on it and do want to finish it. It will probably go for an older version of Angular (Mayber 4) as it seems more cooperative for what I'm trying to do. Will be hard to find PrimeNG document for that version though.

## API Endpoints

- `POST /application/evaluate` - Submit and evaluate a candidate application
- `GET /application` - Retrieve all applications
- `PUT /application/review` - Review/update an application

## Data Flow

1. User submits a candidate application via the frontend form.
2. Frontend sends the form data to the backend `/application/evaluate` endpoint.
3. Backend evaluates the application, applies flagging logic, and returns the result.
4. User can view flagged applications and review/update them as needed.

## Error Handling

- Validates form and application data before processing
- Returns descriptive error messages for invalid submissions or server errors
- Handles unavailable services gracefully

## Security

- Environment variables for sensitive data
- Input validation on both client and server
- Secure API communication (recommend using HTTPS in production)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## Contact

For any questions or issues, please contact [promiseono@gmail.com](mailto:promiseono@gmail.com).
