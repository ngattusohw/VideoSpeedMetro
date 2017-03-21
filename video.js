var initalBPM;

function localFileVideoPlayer() {
  var URL = window.URL || window.webkitURL;
  var displayMessage = function (message, isError){
    var element = document.querySelector('#message');
    element.innerHTML = message;
    element.className = isError ? 'error' : 'info';
  }
  var playSelectedFile = function (event){
    var file = this.files[0];
    var type = file.type;
    document.getElementById('content').innerHTML += '<video id="myVideo" controls autoplay></video>';
    var videoNode = document.querySelector('video');
    var canPlay = videoNode.canPlayType(type);
    if (canPlay === '') canPlay = 'no';
    var message = 'Can play type "' + type + '": ' + canPlay;
    var isError = canPlay === 'no';
    displayMessage(message, isError);

    if (isError){
      return;
    }

    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
  }

  var inputNode = document.querySelector('input');
  inputNode.addEventListener('change', playSelectedFile, false);
}

// document.onkeypress= function(evt)
// {

//     var charCode = evt.keyCode || evt.which;
//     var charStr = String.fromCharCode(charCode);
//     var vid = document.getElementById("myVideo");
    
//     console.log(charStr);

//     if(charStr == "-")
//     {
//       vid.playbackRate -= .5;
//     }

//     else if(charStr == "+")
//     {
//       vid.playbackRate = 2;
//     }

//     else if (charStr == "T" || charStr == "t"){
//       vid.playbackRate = 1;
//     }

// }

function setInital(){
    initalBPM = document.getElementById("initalBPM").value;
    console.log(initalBPM);

    if(initalBPM == ""){
        alert("Please fill out the inital BPM to continue!");
        initalBPM=null;
        return;
    }
    //check to see if theres anything in val before setting to initalBPM

    $('#choose').css("display" , "block");

}



//Start BPM tracking
var startTime = null;
var currentBeats = 0;


function handleNewBeat() {
    if (currentBeats == 0) {
        startTime = new Date();
    }
    currentBeats++;
    updateBpm();
}

function handleReset() {
    startTime = null;
    currentBeats = 0;
    updateBpm();
}

function updateBpm() {
    var value = '&nbsp;';
    var title = 'BPM';
    if (currentBeats > 1) {
        var now = new Date();
        var miliseconds = now.getTime() - startTime.getTime();
        var minutes = miliseconds / 60000.0;
        var bpm = (currentBeats - 1) / minutes;
        value = bpm.toFixed(2);
        title = 'BPM (' + currentBeats.toString() + ' beats)';
    } else if (currentBeats == 1) {
        title = 'BPM (1 beat)';
    }
    $('#divBpm').html(value); 
    $('#divBpmTitle').html(title);
    updateSpeed(bpm);
}

shortcut.add(" ",function() {
    handleNewBeat();
});
shortcut.add("m",function(){
    handleNewBeat();
});
shortcut.add("x",function() {
    handleReset();
});
shortcut.add("Shift+x",function() {
    handleReset();
});
shortcut.add("t", function() {
    updateSpeed(initalBPM);
});


function updateSpeed(setBPM){
    var vid = document.getElementById("myVideo");
    //console.log(setBPM);

    if(setBPM == null){
        return;
    }
      
    var speed = setBPM/initalBPM;
    console.log(speed);

    vid.playbackRate = speed;
}




