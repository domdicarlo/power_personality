// JavaScript Document

function hoverPopUp(element, divName, width, contents) {
	var elementWidth = element.offsetWidth;
	var elementX = 0;
	var elementY = 0;
	if (element.offsetParent) {
		do {
			elementX += element.offsetLeft;
			elementY += element.offsetTop;
		} while (element = element.offsetParent);
	}
	var hoverPopUpElement = document.createElement("div");
	hoverPopUpElement.setAttribute('id', divName);
	hoverPopUpElement.setAttribute('name', divName);
	hoverPopUpElement.style.width = width + 'px';
	hoverPopUpElement.style.color = "#333333";
	hoverPopUpElement.style.background = "#D6E0EA";
	hoverPopUpElement.style.border = "#ABC0D5 1px solid";
	hoverPopUpElement.style.fontSize = "10px";
	hoverPopUpElement.style.padding = "4px";
	hoverPopUpElement.style.left = (elementX+elementWidth)+5+'px';
	hoverPopUpElement.style.float ='left';
	hoverPopUpElement.style.position = 'absolute';
	hoverPopUpElement.style.zIndex = 99;
	hoverPopUpElement.style.overflow = 'visible';
	
	// INSERT ELEMENT INTO PAGE BODY
	document.body.appendChild(hoverPopUpElement);
	document.getElementById(divName).innerHTML = contents;
	var height = document.getElementById(divName).offsetHeight;
	document.getElementById(divName).style.top = elementY-(parseInt(height)/2)+'px';
}

// DELETE ELEMENT
function removeElement(id) {
	if(document.getElementById(id)) {
		if (typeof id == 'string') {
			id = document.getElementById(id);
		}
		if (id && id.parentNode) {
			id.parentNode.removeChild(id);
		}
	}
}