from flask import Flask, render_template, url_for, request, jsonify
from text_sentiment_prediction import *

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
 
@app.route('/predict-emotion', methods=["POST"])
def predict_emotion():
    
    # Obtener el texto ingresado del requerimiento POST.
    input_text = request.json.get("text")
    
    if not input_text:
        # Respuesta para enviar si input_text está indefinido.
        response = {
           "status" : "error",
           "message" : "Por ingresa el texto para predecir la emoción"
        }
        return jsonify(response)
    
    # Respuesta para enviar si input_text no está indefinido.
    else:
        emoticon_predecido, emoticon_predecido_url = predict(input_text)
        # Enviar respuesta.         
        
        response = {
            "status" :  "success",
            "data" : {
                "emoticon_predecido" : emoticon_predecido,
                "emoticon_predecido_url" : emoticon_predecido_url
            }
        }

        return jsonify(response)
       
app.run(debug=True)



    