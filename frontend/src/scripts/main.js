const { ipcRenderer } = require("electron");
const axios = require("axios");
const marked = require("marked").marked;

// Get DOM elements
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");

// Function to update the preview
const updatePreview = () => {
  const markdown = editor.value;
  preview.innerHTML = marked(markdown);
};

// Function to save the file
const saveFile = async () => {
  const content = editor.value;

  // Open a save dialog via IPC
  const filePath = await ipcRenderer.invoke("save-dialog");

  if (filePath) {
    try {
      const response = await axios.post("http://localhost:5000/save", {
        filepath: filePath, // Pass the full file path
        content,
      });
      console.log("File saved:", response.data);
      alert("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Failed to save file.");
    }
  }
};

// Function to load the file
const loadFile = async () => {
  // Open a file dialog via IPC
  const filePaths = await ipcRenderer.invoke("open-dialog");

  if (filePaths && filePaths.length > 0) {
    const filePath = filePaths[0]; // Full file path

    try {
      const response = await axios.get("http://localhost:5000/load", {
        params: { filepath: filePath }, // Pass the full file path
      });
      editor.value = response.data.content;
      preview.innerHTML = marked(response.data.content);
      console.log("File loaded:", response.data);
      alert("File loaded successfully!");
    } catch (error) {
      console.error("Error loading file:", error);
      alert("Failed to load file.");
    }
  }
};

// Event listeners
editor.addEventListener("input", updatePreview);
saveButton.addEventListener("click", saveFile);
loadButton.addEventListener("click", loadFile);

// Initialize preview with empty content
updatePreview();