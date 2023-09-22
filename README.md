# Chat App with React Native & Firebase

An intuitive and real-time chat application built with React Native, Firebase, and Expo. It provides users with instant messaging and secure authentication.

## Features

- **Real-time Messaging**: Send and receive messages instantly using Firebase Realtime Database.
- **Authentication**: Secure user authentication through Firebase Authentication.
- **Cross-platform**: Fully compatible with both Android and iOS platforms.

## Installation

**Prerequisites**:

- Make sure you have [Node.js](https://nodejs.org/) installed.
- Install [Expo CLI](https://docs.expo.dev/get-started/installation/) globally using `npm install -g expo-cli`.

**Steps**:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yukichew/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**

   ```bashxx
   npm install
   ```

3. **Setup Firebase:**

   - Create a Firebase project from the Firebase Console.
   - Enable desired authentication methods and set up Realtime Database and Cloud Storage.
   - Replace the Firebase configuration in firebaseConfig.js with your Firebase project details.

4. **Start the app:**

   ```bash
   expo start
   ```
