from flask import Flask, request, jsonify
import os

app=Flask(__name__)

os.makedirs("saves",exist_ok=True)

@app.route("/save",methods=["POST"])
def save_file():
    data=request.get_json()
    filename=data.get("filename","untitled.md")
    content=data.get("content","")
    with open(f"saves/{filename}","w") as f:
        f.write(content)
    return jsonify({"status":"success","filename": filename})


@app.route("/load",methods=["GET"])
def load_file():
    filename=request.args.get("filename","untitled.md")
    try:
        with open (f"saves/{filename}","r") as f:
            content=f.read()
        return jsonify({"status":"success","content":content})
    except FileNotFoundError:
        return jsonify({"status":"error","message":"File not found 404"}),404
    

if __name__=="__main__":
    app.run(port=5000)