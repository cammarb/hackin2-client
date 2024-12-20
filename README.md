# Hackin2 Client

This repository contains the frontend code built with React Typescript and Vite. It is designed to work in conjunction with the [Hackin2 API](https://github.com/cammarb/hackin2-api) backend to provide a seamless user experience.

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

Hackin2 is a platform that helps companies connect with cybersecurity freelancers. This repository contains the frontend client, which provides the user interface for interacting with the Hackin2 API. Users can use the client to browse cybersecurity freelancers, submit project requests, and manage their accounts.

## Features

- User authentication and registration.
- Bounty Program browsing and filtering.
- Bounty reports submission and management.
- Account settings and profile management.
- Responsive and intuitive user interface.

## Getting Started

### Prerequisites

To run the client locally, you need the following prerequisites:

- Node.js (version >= 20)
- NPM

### Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/cammarb/hackin2-client.git
cd hackin2-client
```

Install the dependencies:

```bash
npm install
```

### Configuration

Before running the client, you need to set up the configuration. Copy the .env.example file and rename it to .env, then fill in the appropriate values for the environment variables:

VITE_API_BASE_URL = 'https://hackin2-api.example.com/api/v1'

### Usage

You can start the application with the following command:

```bash
npm run dev
```
