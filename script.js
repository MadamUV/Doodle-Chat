var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var clickColor = new Array();

var MAX_WIDTH = 800;
var MAX_HEIGHT = 600;

var width;
var height;

var currentStep = 0;
var lastStep = 0;
var differences = [];
var curColor = "#222222"

$(document).ready(function(){
    $('#colorSelector').css('backgroundColor', curColor);
    //color picker
    $('#colorSelector').ColorPicker({
        color: '#222222',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            curColor = "#" + hex;
            $('#colorSelector').css('backgroundColor', curColor);
            $("#draw").prop("checked", true);
        }
    });
    
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    
    $('#canvas').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        console.log(mouseX);
        console.log(mouseY);

        paint = true;
        
        currentStep = clickX.length;
        
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    }); 

    $('#canvas').mouseup(function(e){
        paint = false;
        lastStep = clickX.length;
        differences.push(lastStep-currentStep);   
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
        lastStep = clickX.length;
        differences.push(lastStep-currentStep);
    });
}); 

function redraw(){
    context.save();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(imageObj, 0, 0, width, height);
    //drawing
    context.lineJoin = "round";
    context.lineWidth = 5;    
    for(var i=0; i < clickX.length; i++) {		
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];        
        context.stroke();
    }    
}

function clearCanvas()
{
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor  = [];
    imageObj.src = "";
    document.getElementById('textToAdd').value='';
    textToFill = '';
    restorePoints = [];
}

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
}    