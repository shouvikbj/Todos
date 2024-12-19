# `React + Vite + Capacitor`

# Todo Application

A simple todo application built using React, Capacitor, and SQLite. This app allows you to create, read, update, and delete todos while storing the data locally in a SQLite database.

## Features

- Add todo items
- Mark todo items as done/undone
- Delete todo items
- Persistent local storage using SQLite

## Prerequisites

- Node.js (v16 or later)
- Capacitor CLI installed globally: `npm install -g @capacitor/cli`
- SQLite Plugin: `@capacitor-community/sqlite`

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Capacitor Platforms

If you haven't already, add the platforms for your project:

```bash
npx cap add android
npx cap add ios
```

### 4. Build the App

First build the app, then sync dependencies and then launch the app in Android Studio. All with a single command.

```bash
npm run launch:android
```
