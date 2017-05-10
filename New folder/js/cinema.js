//var row = Math.floor(Math.random()*10)+16;
//var col = Math.floor(Math.random()*10)+11;
function ran(){
    var r = Math.floor(Math.random()*3);
    return r;
}
var col = ran()+3;
var row = ran()+3;

for (i = 0; i < col; i++){
    for (j = 0; j < row;j++){
        var num = (i*col)+j+1+'';
        var getd = document.getElementById("d");
        var crEleDiv = document.createElement("div");
        var check = Math.floor(Math.random()*2);
            crEleDiv.setAttribute("id",""+num);
        if(check === 0){
            crEleDiv.setAttribute("class","red");
            
        }else{
            crEleDiv.setAttribute("class","blue");
        }                
        crEleDiv.setAttribute('onclick',"change('"+num+"')");
        var n = document.createTextNode(num);
        crEleDiv.appendChild(n);
        document.body.appendChild(crEleDiv);
        
        getd.appendChild(crEleDiv);
        
    }
    var crEleBr = document.createElement("br");
    getd.appendChild(crEleBr);
}
function change(idnum){
    button = document.getElementById(idnum);
    buttonColor = button.getAttribute("class");
    if(buttonColor == 'red'){
        alert('Đã bị đặt');
    }
    else{
        button.setAttribute('class','red');
        setTimeout(function(){alert('Thanh cong')},100);
    }
}