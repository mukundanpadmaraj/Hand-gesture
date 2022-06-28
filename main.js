prediction=""

Webcam.set({
    width:320,
    height:180,
    image_format:"png",
    png_quality:100
})
camera=document.getElementById("camera")

Webcam.attach(camera)

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img src="+data_uri+" id='capturedImage'>"
    })
}

console.log(ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/VvF5n8Kly/model.json",modelLoaded)

function modelLoaded(){
    console.log("model loaded")
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is "+prediction
    var utterThis=new SpeechSynthesisUtterance(speak_data)
    synth.speak(utterThis)
}

function predictGesture(){
    img=document.getElementById('capturedImage')
    classifier.classify(img, gotResult)
}

function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        prediction=result[0].label

        document.getElementById("result_gesture_name").innerHTML=prediction

        speak()

        if(prediction == "Thumbs up"){
            document.getElementById("update_gesture").innerHTML="&#128077;"
        }
        if(prediction == "Victory"){
            document.getElementById("update_gesture").innerHTML="&#9996;"
        }
        if(prediction == "Amazing"){
            document.getElementById("update_gesture").innerHTML="&#128076;"
        }
    }
}