// JavaScript Document

function open_printable(container) {
	var contents = document.getElementById(container).innerHTML;
	var print_window = window.open("../print.php", "print_window", "location=1, status=1, scrollbars=1, width=800, height=700");
	print_window.moveTo(50,50);
	var html_body = "<div id='printableContent' style='font-size:.9em;'>"+contents+"</div>";
	print_window.document.write(html_body);
	var inputs = print_window.document.getElementById('printable_vers');
	var links = print_window.document.getElementsByTagName('a');
	inputs.parentNode.removeChild(inputs);
	var links_length = links.length;
	for(var i = 0; i < links_length; i++) {
		if(links[i].getAttribute('href') == "#top") {
			links[i].style.display = "none";
		}
	}
}