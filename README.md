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

2. Set up environment variables:
   Create a `.env` file in the root directory with the following content:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
   
   For Windows PowerShell:
   ```powershell
   $env:GOOGLE_CLIENT_ID="your_google_client_id"
   $env:GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```
   
   For Unix/Linux:
   ```bash
   export GOOGLE_CLIENT_ID="your_google_client_id"
   export GOOGLE_CLIENT_SECRET="your_google_client_secret"
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

1. Go to the Google Cloud Console
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials
5. Create an OAuth 2.0 Client ID
6. Add authorized redirect URIs:
   - http://localhost:8081/login/oauth2/code/google
   - http://localhost:5173

## Development

The application is structured as follows:
- Backend: Spring Boot application in the root directory
- Frontend: React application in the `FrontEnd` directory

### Key Features
* Real-time incident tracking
* Interactive map interface
* Shelter management system
* Emergency contact directory
* Rescue operation coordination
* User authentication and authorization

## Security

- Environment variables are used for sensitive information
- NEVER commit credentials to version control
- Use `.env` file for local development
- Use secure environment variables in production
- CORS is configured for secure cross-origin requests
- OAuth2 is implemented for secure authentication
- Session management is configured for security
- All API endpoints are properly secured

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 