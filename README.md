# Defendly Client

This repository contains the frontend code built with React and Vite. It is designed to work in conjunction with the [Defendly API](https://github.com/Hackin2-company/defendly.api) backend to provide a seamless user experience.

### Table of Contents
- Introduction
- Features
- Getting Started
  - Prerequisites
  - Installation
  - Configuration
  - Usage
- API Documentation
- License
  
## Introduction
Defendly is a platform that helps companies connect with cybersecurity freelancers. This repository contains the frontend client, which provides the user interface for interacting with the Defendly API. Users can use the client to browse cybersecurity freelancers, submit project requests, and manage their accounts.

## Features
- User authentication and registration.
- Freelancer browsing and filtering.
- Project submission and management.
- Account settings and profile management.
- Responsive and intuitive user interface.

## Getting Started
### Prerequisites
To run the client locally, you need the following prerequisites:
- Node.js (version >= 16)
- Yarn
### Installation
Clone this repository to your local machine:
```bash
git clone https://github.com/Hackin2-company/defendly.client.git
cd defendly.client
```
Install the dependencies:
```bash 
yarn install
```

### Configuration
Before running the client, you need to set up the configuration. Copy the .env.example file and rename it to .env, then fill in the appropriate values for the environment variables:

VITE_API_BASE_URL = 'https://defendly-api.example.com';

### Usage
Once the client is installed and configured, you can start it with the following command:
```bash
yarn dev
```

## API Documentation
For detailed API documentation and examples on how to use the endpoints, please refer to the [Frontend Documentation](https://www.notion.so/How-To-Set-Up-the-Frontend-466d7c60a4c04a6da3df2f88e6e8263c) file in Notion.

### License
TBD
