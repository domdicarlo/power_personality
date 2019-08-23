/**
 *  This js file contains code to render the iframe which handles 
 *  login, logout, MyAPA and cart functionality.
 */
/*jQuery no Conflict*/
var jQ = jQuery; //.noConflict();
var isHttpsPage = window.location.protocol == "https:";
//Gets called when setting login and logout link in header
function addHyperlink(elementId, addHtml) {
	var prevText = jQ(elementId).text();
	//if (prevText != "") window.location.reload(true);
	jQ(elementId).prepend(addHtml);
}

function hideDOM(id) {
	jQ(id).hide();
}

function showDOM(id) {
	jQ(id).show();
}

	// Returns path till /idm/
	function urlPath(){
	    var urlString = location.href;
	    var xstart = urlString.indexOf("/idm/") + 1;
	    return urlString.substring(0, xstart);
	}

	//Returns path till /apa/
	function baseUrlPath(){
	    var urlString = location.href;
	    var xstart = urlString.lastIndexOf("/apa/") + 1;
	    return urlString.substring(0, xstart);
	}
	
	function logoutApp(event){
		event.preventDefault();
		var ret = true; 
		
		if("function" == typeof(logOutExternalApp)){
			ret = logOutExternalApp();
		}
			
		if(ret){
			logouPortal();
		}

		
	}


		function logouPortal(){
				var erightsReturnParam = "?ERIGHTS_TARGET=";
				var logoutUrl = myApaUrl + "/apa/idm/logout.seam";

				// This variable value will only be set for integrating apps with same domain.
				var logoutTargetLink = parent.logoutTargetLink;
				
				if((typeof logoutTargetLink == 'undefined') || logoutTargetLink == null || logoutTargetLink ==''){ 
					var target =  "";
					if(window.parent.parent){
						target = window.parent.parent.location.href;
					}else{
						if(window.parent){
							target = window.parent.location.href;
						}	
					}
					if(target.indexOf('thanks')  > -1 || target.indexOf('portal')  > -1) {
						target = myApaUrl + '/portal/home.seam';
					}
					logoutTargetLink = encodeURIComponent(target);
				}
				
				logoutUrl = logoutUrl + erightsReturnParam + logoutTargetLink;
				window.parent.location.href = logoutUrl ;
			}  



function updateShoppingCart(quantity, totalPrice) {
	
	if(jQ(".cartQuantity").text() != ""){
		quantity = jQ(".cartQuantity").text();
	}
	
	if (quantity) {
		var cartText = "(" + quantity + ")";
		jQ("#CartQuantity").html(cartText);
	}else{
		var cartText = "(" + quantity + ")";
		jQ("#CartQuantity").html(cartText);
	}
	if (totalPrice) {
		jQ("#CartPrice").html(totalPrice);
	}
}

function addHtmlAtEndOfBody(htmlString) {
	var bodyChildren = jQ('body').children();
	var lastChild = bodyChildren.get(bodyChildren.length - 1);
	var iframeObject = jQ(htmlString);
	jQ(lastChild).after(iframeObject);
}

function createIframe() {
	if(isHttpsPage){
		addHtmlAtEndOfBody('<iframe style="display: none;" id="apaAuthIframe" src="' + myApaUrl.replace("http:", "https:") + '/apa/idm/apaAuth.html" width="0" height="0" frameborder="no"></iframe>');
	}else{
		addHtmlAtEndOfBody('<iframe style="display: none;" id="apaAuthIframe" src="' + myApaUrl + '/apa/idm/apaAuth.html" width="0" height="0" frameborder="no"></iframe>');
	}
}

function createShopIframe() {
	if(isHttpsPage){
		addHtmlAtEndOfBody('<iframe style="display: none;" id="shoppingIframe" src="' + myApaUrl.replace("http:", "https:") + '/apa/shop/cartFrame.html" width="0" height="0" frameborder="no"></iframe>');
	}else{
		addHtmlAtEndOfBody('<iframe style="display: none;" id="shoppingIframe" src="' + myApaUrl + '/apa/shop/cartFrame.html" width="0" height="0" frameborder="no"></iframe>');
	}
}


var iframeCompletedCallbackFn = null;

function createIFrames(callbackFn) {
	iframeCompletedCallbackFn = callbackFn;
	createIframe();
	createShopIframe();

}

function executeIframeOnCompleteFn() {
	
}

function checkMyApaUrl() {
	try {
		myApaUrl;
	} catch (err) {
		myApaUrl = undefined;
	}
	if(myApaUrl == undefined) {
		myApaUrl = '';
	}
}

jQ(document).ready(	function() {
	checkMyApaUrl();
 
	jQ("#audioCaptcha").click(function() {
		//jQ("<br /><iframe src='/apa/seam/resource/audioCaptcha' height='18px'></iframe>").appendTo(jQuery(this));
		return false;
	});

});

//Seam.Remoting.displayLoadingMessage = function() {showOverlay();}

//Seam.Remoting.hideLoadingMessage = function() {hideOverlay();}

//function showOverlay() {jQ("<div id='overlay'><div id='overlayImage'><div class='waitText'>Please Wait...</div></div>").appendTo("body");}
function showOverlay() {
	jQ("<div id='overlay'></div><div id='overlayImage'><img src='" + myApaUrl + "/apa/shop/img/ajax.gif' /><div class='waitText'>Please Wait...</div></div>").appendTo("body");
	jQ("#overlay").css("width", jQ(document).width());
	jQ("#overlay").css("height", jQ(document).height());
}

function hideOverlay() {jQ("#overlay").remove();hideOverlayImage();}

function hideOverlayImage() {jQ("#overlayImage").remove();}

function showActiveLicenseOverlay() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='activeLicenseDiv'><div class='notLoggedInWindowClose'>" +
			"<a href='#' onclick='javascript:hideActiveLicenseDiv()'>Close</a></div>" +
			"<div class='notLoggedInForm'>" +
				"<div class='popupTitle'>Sorry, we can't add this item to your cart.</div>" +
				"<p class='popupSubtitle'>You already have an active license on this product.</p>" +
				"<div style='text-align: center;'>" +
					"<button class='submit okBtn' onclick='javascript:hideActiveLicenseDiv()' >OK</button></div></div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function hideActiveLicenseDiv(reloadPage) {
	hideOverlay();
	jQ(".activeLicenseDiv").remove();
}


function showLogInOverlay(apaItemId, quantity) {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='notLoggedInDiv'>" +
			"<div class='notLoggedInWindowClose'>" + 
				"<a href='#' onclick='javascript:hideLogInOverlay()'></a></div>" +
				"<div class='notLoggedInForm'><div class='popupTitle'>Please Log In</div>" +
					"<p class='popupSubtitle'>Membership in APA is required to place this order.</p>" +
						"<p class='popupBody' id='loginLink'> Please log in  to your APA account so that we can verify your membership.</p>" +
						"</br></br><div style='text-align: center;'><button class='submit okBtn' onclick='javascript:loginWithCartItem("+apaItemId+"," + quantity + ")' >Log In</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='submit okBtn' onclick='javascript:hideLogInOverlay()' >Cancel</button> </div>" +
						"</div></div>").appendTo("body");
	window.scrollTo(0,0);
}


function hideLogInOverlay() {hideOverlay();jQ(".notLoggedInDiv").remove();}

function showNotMemberOverlay() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='notLoggedInDiv'>" +
			"<div class='notLoggedInWindowClose'>" + 
				"<a href='#' onclick='javascript:hideLogInOverlay()'></a></div>" +
				"<div class='notLoggedInForm'><div class='popupTitle'>We're Sorry</div>" +
				"<p class='popupSubtitle'>Membership in APA is required to place this order, but your account doesn't appear to be associated with an active membership in APA.</p>" +
				"<p class='popupBody' id='loginLink'> If you believe you have received this message in error, please contact the APA Service Center at (800) 374-2721 or (202) 336-5500, Monday through Friday, between the hours of 9:00 a.m. and 6:00 p.m. ET or e-mail <a href='mailto:loginconcern@apa.org'>loginconcern@apa.org</a>.</p>" +
				"<div style='text-align: center;'>" +
					"<button class='submit okBtn' onclick='javascript:hideLogInOverlay()' >Close</button></div></div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function showOutOfQuantityOverlay() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='activeLicenseDiv'><div class='notLoggedInWindowClose'>" +
			"<a href='#' onclick='javascript:hideActiveLicenseDiv(true)'>Close</a></div>" +
			"<div class='notLoggedInForm'>" +
				"<div class='popupTitle'>Sorry, we do not have the quantity you requested.</div>" +
				"<p class='popupSubtitle'>We are updating your cart with the maximum quantity available.</p>" +
				"<div style='text-align: center;'>" +
					"<button class='submit okBtn' onclick='javascript:hideActiveLicenseDiv(true)' >OK</button></div></div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function showNoMoreQuantityAllowedInCart() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='notLoggedInDiv'>" +
			"<div class='notLoggedInWindowClose'>" + 
				"<a href='#' onclick='javascript:hideLogInOverlay()'>Close</a></div>" +
				"<div class='notLoggedInForm'><div class='popupTitle'>Sorry, we can't add this item to your cart.</div>" +
				"<p class='popupSubtitle'>This item may only be purchased in single quantities.</p>" +
				"<p class='popupBody' id='loginLink'>" +
				"You may, however, purchase other similar items.</p>" +
				"<div style='text-align: center;'>" +
					"<button class='submit okBtn' onclick='javascript:hideLogInOverlay()' >OK</button></div></div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function showCartHasAPAItem() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='notLoggedInDiv'>" +
			"<div class='notLoggedInWindowClose'>" + 
				"<a href='#' onclick='javascript:hideLogInOverlay()'>Close</a></div>" +
				"<div class='notLoggedInForm'><div class='popupTitle'>Sorry, we can't add this item to your cart</div>" +
					"<p class='popupSubtitle'>You must pay CESA fees separately from purchasing other APA products.</p>" +
					"<p class='popupBody'>We can't process a purchase that has both CE Sponsor Approval fees and other kinds of products.</p>" +
						"<p class='popupBody' id='loginLink'></p>" +
						"<div style='float: left;'>" +
							"<div class='popupButtonDivLeft'>" +
								"<div class='blueBtnDiv'><a href='#' onclick='finishMyPurchase()'>Finish My Purchase</a></div>" +
								"<p>Purchase the item(s) already in my cart, and then I'll return to pay my CESA fees</p></div>" +
							"<div class='popupButtonDivRight'>" +
								"<div class='blueBtnDiv'><a href='#' onclick='payCesasFee()'>Pay CESA Fees</a></div>" +
								"<p>Remove the item(s) from my cart to pay my CE Sponsor Approval fees now</p></div>" +
						"</div>" +
						"</div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function showCartHasCESASItem() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='notLoggedInDiv'>" +
			"<div class='notLoggedInWindowClose'>" + 
				"<a href='#' onclick='javascript:hideLogInOverlay()'>Close</a></div>" +
				"<div class='notLoggedInForm'><div class='popupTitle'>Sorry, we can't add this item to your cart</div>" +
					"<p class='popupSubtitle'>You must pay CESA fees separately from purchasing other APA products.</p>" +
					"<p class='popupBody'>You have CE Sponsor Approval fees in your cart, and we can't process a purchase that has both " +
						"CESA fees and other kinds of products.</p>" +
						"<p class='notLoggedInDivP' id='loginLink'></p>" +
						"<div style='float: left;'>" +
							"<div class='popupButtonDivLeft popupButtonDiv'>" +
								"<div class='blueBtnDiv'><a href='#' onclick='finishMyCesasPurchase()'>Pay CESA Fees</a></div>" +
								"<p>Go to the shopping cart to complete your fee payment</p></div>" +
							"<div class='popupButtonDivRight popupButtonDiv'>" +
								"<div class='blueBtnDiv'><a href='#' onclick='purchaseAPAItem()'>Purchase this item</a></div>" +
								"<p>Remove the CESA fees from your cart and add this item instead</p></div>" +
						"</div>" +
						"</div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function showReadyToPayCesasFeeOverlay() {
	showOverlay();
	hideOverlayImage();
	jQ("<div class='notLoggedInDiv'>" +
			"<div class='notLoggedInWindowClose'>" + 
				"<a href='#' onclick='javascript:hideLogInOverlay()'>Close</a></div>" +
				"<div class='notLoggedInForm'><div class='popupTitle'>Ready to pay your CESA fees?</div>" +
					"<p class='popupSubtitle'>Before you viewed your shopping cart, you were in the progress of paying your CE Sponsor Approval fees." + 
					"Now that your cart is empty, you can go back to CESAS to Finish your payment.</p>" +
						"<p class='notLoggedInDivP' id='loginLink'></p>" +
						"<div style='float: left;'>" +
							"<div class='popupButtonDivLeft popupButtonDiv'>" +
								"<div class='blueBtnDiv'><a href='#' onclick='payCesasFee()'>Pay your CESA fees</a></div>" +
								"<p>Go back to CESAS payment page</p></div>" +
							"<div class='popupButtonDivRight popupButtonDiv'>" +
								"<div class='blueBtnDiv'><a href='#' onclick='hideReadyToPayCesasFeeOverlay()'>No thanks</a></div>" +
								"<p>Close this window and return to your cart</p></div>" +
						"</div>" +
						"</div></div>").appendTo("body");
	window.scrollTo(0,0);
}

function hideReadyToPayCesasFeeOverlay() {
	hideOverlay();
	jQ(".notLoggedInDiv").remove();
}

function payCesasFee() {
	window.location.href = myApaUrl + "/apa/shop/cesasBilling.jsf";
}
function finishMyPurchase(){
	window.location.href = myApaUrl + "/apa/shop/shoppingCart.jsf";
}
function finishMyCesasPurchase() {
	window.location.href = myApaUrl + "/apa/shop/billingAddressSelect.jsf";
}
function purchaseAPAItem() {
	window.location.href = myApaUrl + "/apa/shop/removeCesasContinueShopping.jsf";
}

function login() {
	window.location.href = myApaUrl + "/apa/idm/login.seam?ERIGHTS_TARGET=" + encodeURIComponent(window.parent.location.href);    
}

function loginWithCartItem(apaItem, quantity) {
	if(apaItem != undefined && apaItem  != '' ){
		var locStr= window.parent.location.href;
		var n = locStr.indexOf('#');
		locStr = locStr.substring(0, n != -1 ? n : locStr.length);
		window.location.href = myApaUrl + "/apa/idm/login.seam?ERIGHTS_TARGET=" + encodeURIComponent(locStr + "?apaItem=" +apaItem +"&quantity=" +quantity) ;
	}else{
		window.location.href = myApaUrl + "/apa/idm/login.seam?ERIGHTS_TARGET=" + encodeURIComponent(window.parent.location.href) ;
	}
}


function register() {
	window.location.href = myApaUrl + "/sso/idm/register.jsf?ERIGHTS_TARGET=" + encodeURIComponent(window.parent.location.href);    
}

function addItemToCart(itemId, quantity){
	// alert("In iframe called addItemToCart("+itemId+", " + quantity + ")");
	document.getElementById('shoppingIframe').contentWindow.addItemToCart(itemId, quantity);
}

function addApaItemToCart(itemId, quantity , applicationId , paramKeyValues,callBackFunction){
	// alert("In iframe called addItemToCart("+itemId+", " + quantity + ")");
	document.getElementById('shoppingIframe').contentWindow.addApaItemToCart(itemId, quantity , applicationId , paramKeyValues,callBackFunction);
}

function addApaItemToCart2(itemId, quantity , applicationId , paramKeyValues){
	// alert("In iframe called addItemToCart("+itemId+", " + quantity + ")");
	document.getElementById('shoppingIframe').contentWindow.addApaItemToCart2(itemId, quantity , applicationId , paramKeyValues);
}

function addItemAndConstidToCart(itemId, quantity, constitId, applicationTransactionNumber, callbackFn) {
	document.getElementById('shoppingIframe').contentWindow.addItemAndConstidToCart(itemId, quantity, constitId, applicationTransactionNumber, callbackFn);
}

function addPsycnetProductToCart(sessionId, itemId, uid, name, description, imageUrl, productUrl, documentCode, onlineFirstPublications, callbackFn) {
	document.getElementById('shoppingIframe').contentWindow.addPsycnetProductToCart(sessionId, itemId, uid, name, description, imageUrl, productUrl, documentCode, onlineFirstPublications, callbackFn);
}

function getCartItems(callbackFn) {
	document.getElementById('shoppingIframe').contentWindow.getCartItems(callbackFn);
}

function removeProduct(itemId, callbackFn) {
	document.getElementById('shoppingIframe').contentWindow.removeProduct(itemId, callbackFn);
}


function removeProductFromCart(itemId, callbackFn) {
	document.getElementById('shoppingIframe').contentWindow.removeProductFromCart(itemId, callbackFn);
}



function refreshCart() {
	document.getElementById('shoppingIframe').contentWindow.refreshCart();
}

/*
function callbackFn(prodList) {
	for (i=0; i<prodList.length; i++) {
		var s = prodList[i].itemNumber + " : " + prodList[i].itemUid;
		alert(s);
	}
}*/



function checkAndCreateJSessionIdCookie() {
	var cookieVal = YAHOO.util.Cookie.get("JSESSIONID");
	if (cookieVal != null) {
		checkJsessionIdThruAjax();
	}
}

jQ(document).ready(function() {
	//checkAndCreateJSessionIdCookie();
});

function getXMLObject() {//XML OBJECT
	var xmlHttp = false;
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); // For Old Microsoft Browsers
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // For Microsoft IE 6.0+
		} catch (e2) {
			xmlHttp = false; // No Browser accepts the XMLHTTP Object then false
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest(); //For Mozilla, Opera Browsers
	}
	return xmlHttp; // Mandatory Statement returning the ajax object created
}

var xmlhttp = new getXMLObject();

function checkJsessionIdThruAjax() {
	if (xmlhttp) {
		xmlhttp.open("GET", myApaUrl + "/apa/shop/getSessionId.jsp", true); //gettime will be the servlet name
		xmlhttp.onreadystatechange = handleServerResponse;
		xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp.send('');
	}
}

function handleServerResponse() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
			var jid = xmlhttp.responseText;
			if (jid.indexOf("</html>") != -1) {
				jid = jid.substring(0, jid.indexOf("</html>"));
				YAHOO.util.Cookie.set("JSESSIONID", jid, {
				    path: "/",          //all pages
				    domain: "apa.org"   //any subdomain of apa.org, including www.apa.org
				});
			}
		} else {
			//alert("Error during AJAX call. Please try again");
		}
	}
}



checkMyApaUrl();

function include_dom(script_filename) {
    var html_doc = document.getElementsByTagName('head').item(0);
    var js = document.createElement('script');
    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');
/* causes Iframe issue with charge logic.
 *    if(isHttpsPage){
    	script_filename = script_filename.replace("http:", "https:");
	}*/
    js.setAttribute('src', script_filename);
    html_doc.appendChild(js);
    return false;
}

function checkHelpCenterBrochure(){
	var urlOfWindow = window.location.href;
	
	//After adding product to cart this function will delete
	if(urlOfWindow.indexOf("brochure-request") > -1) {
		var finalUrl = urlOfWindow.split("?");
		window.history.pushState(null, null, finalUrl[0]);
    } 
}

if(document.location.href.indexOf('billingAddressSelect') < 1 ){
	include_dom(myApaUrl + "/apa/scripts/refreshsession.js");
}




