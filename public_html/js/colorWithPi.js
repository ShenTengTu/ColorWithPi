function colorWithPi(dotNumber,column,dotr,dotGap,haveText){
    var piDigitArray = [];
    piDigitArray = calcPiDigits(6*dotNumber);
    var piDigitString = piDigitArray.toString().replace(new RegExp(",","g"),"");
    
    var svgns ="http://www.w3.org/2000/svg";
    var node_svg = document.createElementNS(svgns,"svg");
    node_svg.setAttribute("id", "svg0");
    node_svg.setAttribute("width", (dotr*2+dotGap)*(column+1));
    node_svg.setAttribute("height", (dotr*2+dotGap)*(Math.floor(dotNumber/column)+1));
        
    for(var i=0;i<dotNumber;i++){
        var colorCode = piDigitString.substring(i*6,i*6+6);
        
        var node_circle = document.createElementNS(svgns,"circle");
        node_circle.setAttribute("id", "circle"+i);
        node_circle.setAttribute("cx", (dotr*2+dotGap)*(i%column+1));
        node_circle.setAttribute("cy", (dotr*2+dotGap)*(Math.floor(i/column)+1));
        node_circle.setAttribute("r", dotr);
        node_circle.setAttribute("fill", "#"+colorCode);
        node_svg.appendChild(node_circle);
        
        if(haveText === true){
            var node_text = document.createElementNS(svgns,"text");
            node_text.setAttribute("id", "text"+i);
            node_text.setAttribute("font-size", dotr/2);
            node_text.setAttribute("font-family","Verdana");
            node_text.setAttribute("x", (dotr*2+dotGap)*(i%column+1)-dotr+1);
            node_text.setAttribute("y", (dotr*2+dotGap)*(Math.floor(i/column)+1)+5);
            node_text.setAttribute("fill", "#FFFFFF");
            node_text.appendChild(document.createTextNode(colorCode));
            node_svg.appendChild(node_text);
        }
        
    }
    
    document.body.appendChild(node_svg);
    
}


