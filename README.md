# todo-list-app

A simple, lightweight to-do list web app built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies. Tasks are saved in your browser, so they are still there after a refresh.

## Features

- Add new tasks
- Mark tasks as complete or incomplete
- Edit tasks (double-click the text or use the pencil button; Enter saves, Esc cancels)
- Delete tasks
- Filter by All, Active or Completed
- Clear all completed tasks at once
- Live count of tasks left
- Automatic saving with `localStorage`
- Responsive layout that works on desktop and mobile

## Project Structure

```
todo-list-app/
├── index.html   # Page structure
├── style.css    # Styling
├── script.js    # App logic
└── README.md    # Project documentation
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   ```
2. Open the folder:
   ```bash
   cd todo-list-app
   ```
3. Open `index.html` in your browser. No server or installation is needed.

## Usage

| Action        | How                                           |
| ------------- | --------------------------------------------- |
| Add a task    | Type in the input box and press Enter or Add  |
| Complete task | Tick the checkbox                             |
| Edit a task   | Double-click the text or click the pencil     |
| Delete a task | Click the × button                            |
| Filter tasks  | Use the All / Active / Completed buttons      |
| Clear done    | Click "Clear completed"                       |

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
