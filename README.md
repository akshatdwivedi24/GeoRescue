# GeoRescue - Disaster Management System

A comprehensive disaster management system built with Spring Boot and React, featuring real-time alerts, geolocation mapping, incident reporting, and more.

## Features

- Real-time alerts and notifications
- Interactive geolocation mapping
- Incident reporting and management
- Shelter and resource locator
- Rescue operations management
- Emergency contact system
- Google OAuth2 authentication

## Prerequisites

- Java 21
- Node.js 18+
- Maven
- npm

## Setup Instructions

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/akshatdwivedi24/GeoRescue.git
cd GeoRescue
```

2. Create a `.env` file in the root directory with the following content:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

3. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd FrontEnd
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Google OAuth2 Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials
5. Create an OAuth 2.0 Client ID
6. Add authorized redirect URIs:
   - http://localhost:8081/oauth2/callback/google
   - http://localhost:5173/oauth2/callback/google

## Development

The application is structured as follows:
- Backend: Spring Boot application in the root directory
- Frontend: React application in the `FrontEnd` directory

## Security

- Sensitive information is stored in environment variables
- Never commit credentials to version control
- Use `.env` file for local development
- Use secure environment variables in production

## License

This project is licensed under the MIT License - see the LICENSE file for details. 