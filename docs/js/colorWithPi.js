/*for fixed bar effact*/
var canvas = document.getElementById("canvas");
var control = document.getElementById("control");
canvas.style.marginTop = control.offsetHeight + "px";
/**/

var inputs = document.getElementsByTagName("input");
var run = document.getElementById("run");
var node_svg = document.getElementById("result");
var svgns = "http://www.w3.org/2000/svg";
var dotNumber, column, dotr, dotGap, haveText;

run.onclick = execute;

execute();

function execute() {
    getInputsValue();
    if (dotNumber > 0 && column > 0 && dotr > 0 && dotGap >= 0) {
        removeSVGDownloadLink();
        disableForm(true);
        clearSvg();
        getPiDigits(dotNumber * 6);
    }
}

/*use Unbounded Spigot Algorithms(see spigot.js)*/
function getPiDigits(n) {
    var str = "";
    var count = 0;
    var spigot = new SpigotPi(toDo);
    var timeOut = window.setTimeout(function () {spigot.next_();},0);

    function toDo(digit) {
        var curr = spigot.digits();
        window.clearTimeout(timeOut);
        if (curr === 0) {
            timeOut = window.setTimeout(function () {spigot.next_();},0);
        }
        if (curr > 0 && curr <= n) {
            str += String(digit);
            if (str.length === 6) {
                toDraw(str, count);
                str = "";
                count++;
            }
            timeOut = window.setTimeout(function () {spigot.next_();},0);
        }
        if (curr === n) {
            disableForm(false);
            createSVGDownloadLink();
        }
    }
}

function disableForm(tf) {
    Array.prototype.forEach.call(inputs, function (e) {
        e.disabled = tf;
    });
    run.disabled = tf;
    run.textContent = tf ? "Wait..." : "Run";
}

function getInputsValue() {
    dotNumber = Number(inputs[0].value);
    column = Number(inputs[1].value);
    dotr = Number(inputs[2].value);
    dotGap = Number(inputs[3].value);
    haveText = inputs[4].checked;
}

function clearSvg() {
    var new_svg = document.createElementNS(svgns, "svg");
    new_svg.id = "result";
    new_svg.setAttribute("version", "1.1");//info for export
    new_svg.setAttribute("xmlns", svgns);//info for export
    var canvas = document.getElementById("canvas");
    canvas.replaceChild(new_svg, node_svg);
    node_svg = new_svg;
}

function setSvgSize(i) {
    if (i < column)
        node_svg.setAttribute("width", (dotr * 2 + dotGap) * (i + 2));
    node_svg.setAttribute("height", (dotr * 2 + dotGap) * (Math.ceil((i + 1) / column) + 1));


    window.scrollTo(0, canvas.scrollHeight);
    run.textContent = "Wait..." + Math.ceil(i / dotNumber * 100) + "%";
}

function toDraw(colorCode, i) {
    setSvgSize(i);
    var node_circle = document.createElementNS(svgns, "circle");
    node_circle.setAttribute("id", "circle" + i);
    node_circle.setAttribute("cx", (dotr * 2 + dotGap) * (i % column + 1));
    node_circle.setAttribute("cy", (dotr * 2 + dotGap) * (Math.floor(i / column) + 1));
    node_circle.setAttribute("r", dotr);
    node_circle.setAttribute("fill", "#" + colorCode);
    node_svg.appendChild(node_circle);

    if (haveText === true) {
        var node_text = document.createElementNS(svgns, "text");
        node_text.setAttribute("id", "text" + i);
        node_text.setAttribute("font-size", dotr / 2);
        node_text.setAttribute("font-family", "Verdana");
        node_text.setAttribute("x", (dotr * 2 + dotGap) * (i % column + 1) - dotr + 1);
        node_text.setAttribute("y", (dotr * 2 + dotGap) * (Math.floor(i / column) + 1) + 5);
        node_text.setAttribute("fill", "#FFFFFF");
        node_text.appendChild(document.createTextNode(colorCode));
        node_svg.appendChild(node_text);
    }
}

function createSVGDownloadLink() {
    var base64SVG = window.btoa(node_svg.outerHTML);
    var link = "data:image/svg+xml;base64,\n" + base64SVG;
    var fileName = "ColorWithPi_Dots+" + dotNumber + ".svg";
    run.insertAdjacentHTML("afterend", "<a id='downloadLink' download='" + fileName + "' href-lang='image/svg+xml'href='" + link + "' style='display:none;'></a>" +
            "<button id='download'>Download SVG</button>");
    var downloadLink = document.querySelector("#downloadLink");
    var download = document.querySelector("#download");
    download.onclick = function () {
        downloadLink.dispatchEvent(new MouseEvent("click", {"view": window, "bubbles": true, "cancelable": false}));
    };
}

function removeSVGDownloadLink() {
    var form = document.querySelector(".form");
    var downloadLink = document.querySelector("#downloadLink");
    var download = document.querySelector("#download");
    if (downloadLink)
        form.removeChild(downloadLink);
    if (download)
        form.removeChild(download);
}
