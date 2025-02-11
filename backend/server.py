from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/save", methods=["POST"])
def save_file():
    data = request.json
    filepath = data.get("filepath")  # Full file path provided by the frontend
    content = data.get("content", "")

    if not filepath:
        return jsonify({"status": "error", "message": "File path is required"}), 400

    try:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        # Write the content to the file
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return jsonify({"status": "success", "filepath": filepath})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/load", methods=["GET"])
def load_file():
    filepath = request.args.get("filepath")  # Full file path provided by the frontend

    if not filepath:
        return jsonify({"status": "error", "message": "File path is required"}), 400

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        return jsonify({"status": "success", "content": content})
    except FileNotFoundError:
        return jsonify({"status": "error", "message": "File not found"}), 404
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)