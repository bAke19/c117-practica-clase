//Crear la variable date - (fecha).

var date = new Date()
let display_date = date.toLocaleDateString()

//Cargar HTML DOM.
$(document).ready(function(){
    $("#display_date").html(display_date)
})
//Definir la variable para almacenar la emoción predecida.

let predicted_emotion;
let emo_url;

//HTML-->JavaScript--->Flask.
//Flask--->JavaScript--->HTML.

//Selector jQuery y la acción click.

$(function () {
    $("#predict_button").click(function () {

        let input_data = {
            "text" : $("#text").val()
        }

        console.log(input_data)

        //Llamada a AJAX 

        $.ajax({
            url: '/predict-emotion',
            type: 'POST',
            data: JSON.stringify(input_data),
            dataType : 'json',
            contentType: 'application/json',
            success: function(result){
                
                // Resultado recibido de Flask ----->JavaScript

                predicted_emotion = result.data.emoticon_predecido;
                emo_url = result.data.emoticon_predecido_url;

                // Mostrar resultado usando JavaScript----->HTML
                
                $("#prediction").html(predicted_emotion);
                $("#prediction").css("display", "block");

                $("#emo_img_url").attr('src', emo_url);
                $("#emo_img_url").css("display", "block");
            },
            //Función error 
            error: function(result){
                alert(result.responseJSON.message)
            }
        });
    });
})

