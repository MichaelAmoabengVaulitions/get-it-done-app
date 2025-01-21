# Get It Done App

A robust and simple To-Do List app built using React Native with TypeScript. This app allows users to add, edit, toggle, delete, and persist tasks, with smooth animations and intuitive UI.

---

## Features

- **Add Tasks**: Create new tasks with ease.
- **Edit Tasks**: Update the title of existing tasks.
- **Toggle Completion**: Mark tasks as completed or uncompleted.
- **Delete Tasks**: Remove tasks with confirmation.
- **Animations**: Smooth transitions and micro animations for a delightful user experience.
- **Persistence**: Tasks are saved to local storage, ensuring they persist across app restarts.
- **Filter Tasks**: View tasks based on their status (All, Completed, or Uncompleted).
  
https://github.com/user-attachments/assets/7d257b8a-beb5-466d-b522-417b809c9db4

---

## Prerequisites

Ensure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile emulator or a physical device with Expo Go installed

---

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:MichaelAmoabengVaulitions/get-it-done-app.git
   cd get-it-done-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app on your device:
   - Use the QR code displayed in your terminal or browser with the **Expo Go** app.
   - Or launch the app on an emulator (iOS Simulator or Android Emulator).

---

## Project Structure

```plaintext
get-it-done-app/
├── .expo/                 # Expo specific files (auto-generated)
├── assets/                # Static assets such as images and fonts
├── node_modules/          # Installed dependencies
├── src/                   # Main source folder
│   ├── components/        # Reusable components
│   ├── consts/            # Constants (e.g., colors, dimensions)
│   │   ├── Colors.ts      # Color definitions
│   │   └── Dimensions.ts  # Dimension utilities
│   ├── hooks/             # Custom React hooks
│   │   └── useTasks.ts    # Task-related hook for state management
│   ├── screens/           # Screen components
│   │   └── TaskListScreen.tsx  # Main task list screen
│   └── types/             # TypeScript type definitions
│       └── index.d.ts     # Global types for the app
├── .gitignore             # Git ignored files
├── App.tsx                # Main app entry point
├── app.json               # Expo app configuration
├── babel.config.js        # Babel configuration for Expo
├── index.ts               # Application entry file
├── metro.config.js        # Metro bundler configuration
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Lock file for dependencies
└── tsconfig.json          # TypeScript configuration
```

---

## Key Libraries

- **React Native**: Core framework for building the app.
- **React Native Reanimated**: Provides animations and transitions.
- **AsyncStorage**: For persistent data storage.
- **State Management**: useReducer from React .
- **TypeScript**: Ensures type safety and better developer experience.

---

## Available Scripts

- **Start** the development server:
  ```bash
  npm start
  ```

- **Run on iOS Simulator**:
  ```bash
  npm run ios
  ```

- **Run on Android Emulator**:
  ```bash
  npm run android
  ```
---

## How to Use the App

1. **Add a Task**:
   - Use the input field to type the task title and press enter on the keyboard 

2. **Toggle Completion**:
   - Tap on a task to mark it as completed or uncompleted.

3. **Edit a Task**:
   - Tap the edit icon (✏️), update the title, and press enter or blur the input field.

4. **Delete a Task**:
   - Tap the delete icon (🗑️), confirm the action in the displayed alert.

5. **Filter Tasks**:
   - Use the filter bar to switch between "All", "Completed", and "Uncompleted" tasks.

---

## Future Enhancements

- Add support for sorting tasks by due date or priority.
- Implement drag-and-drop for reordering tasks.
- Introduce user authentication for syncing tasks across devices.

---

## Troubleshooting

- If the app doesn't load, ensure all dependencies are installed by running:
  ```bash
  npm install
  ```

- Clear the Expo cache and restart:
  ```bash
  expo start -c
  ```
- Lint your code:
  ```bash
  npm run lint
  ```
---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests to improve the app.

