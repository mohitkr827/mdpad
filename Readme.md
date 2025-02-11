# MDpad (v1.0.0)

A simple and elegant **Markdown editor** built with **Electron** (frontend) and **Python Flask** (backend). Edit, save, and load Markdown files with live previews.

---

## Features

- **Live Preview**: Real-time rendering of Markdown.
- **Save/Load Files**: Save to or load from any location on your computer.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

---

## Prerequisites

- **Node.js** (v16+): [Download](https://nodejs.org/)
- **Python** (v3.8+): [Download](https://www.python.org/)
- **Git**: [Download](https://git-scm.com/)

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mohitkr827/mdpad.git
cd mdpad
```

### 2. Backend Setup
```bash
cd backend
python -m venv .myvenv       # Create virtual environment
source .myvenv/bin/activate  # macOS/Linux
.myvenv\Scripts\activate     # Windows
pip install -r requirements.txt
python server.py
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run build:tailwind
npm start
```

---

## Usage

1. **Edit**: Type Markdown in the editor panel.
2. **Preview**: See rendered output in real-time.
3. **Save**: Click "Save" to save as `.md`.
4. **Load**: Click "Load" to open existing `.md` files.

---

## Project Structure
```
mdpad/
├── backend/
│   ├── server.py
│   ├── requirements.txt
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── styles.css
│   ├── src/
│   │   ├── scripts/
│   │   │   ├── main.js
│   │   ├── styles/
│   │   │   ├── tailwind.css
├── main.js
├── package.json
```

---

## License
MIT License. See [LICENSE](LICENSE).

---

## Version History
- **v1.0.0**: Initial release (2023-10-25).