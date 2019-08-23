var $j = jQuery.noConflict();
var axel = Math.random() + "";
var ord = axel * 1000000000000000000;
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isFF = /firefox/i.test(navigator.userAgent);
var isSilk = /\bSilk\b/.test(navigator.userAgent);
var is_ios = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
var is_android = navigator.userAgent.match(/android/i);
//for image slider and carousel
var slideTimerInterval = 7000;
var slideIntervalId = [];
var carouselIntervalId = [];
var hgItemWidth = 160;
var currSlide = 0;

var html = document.getElementsByTagName('html')[0];
if (html.classList) {
    if (is_ios) html.classList.add('device-ios');
    if (is_android) html.classList.add('device-android');
}

//format date as mm/dd/yyyy
$j.date = function (dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    var date = month + "/" + day + "/" + year;
    return date;
};
//validate date field
function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '') return false;

    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK? 
    if (dtArray == null) return false;

    //Checks for mm/dd/yyyy format. 
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];
    if (dtMonth < 1 || dtMonth > 12) return false;
    else if (dtDay < 1 || dtDay > 31) return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
    }
    return true;
}
//Validate date (mm/dd/yyyy or mm-dd-yyyy)
function checkDate(Object) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(Object.value);
}

function clearDefaultText(name, default_text) {
    var inputBox = document.getElementById(name);
    if (inputBox.value == default_text) {
        inputBox.value = '';
    }
    inputBox.className = "";
}

function replaceDefaultText(name, default_text) {
    var inputBox = document.getElementById(name);
    if (inputBox.value == '') {
        inputBox.value = default_text;
        inputBox.className = "gray";
    }
}

function popup(strURL, strName) {
    window.open(strURL, strName, "menubar=1,resizable=1,width=500,height=600");
}

//Simple jump to anchor point
function jumpToAnchor(anchor) {
    location.href = location.href + "#" + anchor;
}
//scroll to id of any element with optional y offset
function scollToId(id, y) {
    y = y || 0;
    window.scrollTo(0, $j("#" + id).offset().top - y);
}

//search form on every page
function search() {
    window.location = document.getElementById('in').value + 'query=' + document.getElementById('query').value.replace('&', '%26');
}

//for email this
function openEmail() {
    if (location.pathname.toLowerCase().indexOf('/centrodeapoyo/') == 0) window.open('/email-this-es', 'EmailThis', 'toolbar=0,menubar=0,resizable=1,width=550,height=600');
    else window.open('/email-this', 'EmailThis', 'toolbar=0,menubar=0,resizable=1,width=550,height=600');
}

//for print this
function printThis() {
    if (document.getElementById("needPrintVersion")) {
        if (document.getElementById("ctcol")) window.open('/print-this', 'PrintThis', 'width=700,height=600,status=yes,menubar=yes,scrollbars=yes,resizable=yes');
        else window.print();
    }
    else window.print();
}

//for html include
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = ""; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

//for product page
function add_product_to_cart(strItemNo, intItemQuantity, shoppingCartUrl) {
	$j.ajax({
		type: "POST",
		dataType: "json",
		async: false,
		url: myApaUrl+"/apa/rest/commerce/cartItems",
		complete:function(xhr, textStatus){
			if(xhr.status==200){
				var cartQuantity = jQ("#CartQuantity");
			    var intStart = parseInt(cartQuantity.text().replace("(", "").replace(")", ""));
			    document.getElementById('shoppingIframe').contentWindow.addItemToCart(strItemNo, intItemQuantity);
			    setTimeout(function () { if (parseInt(cartQuantity.text().replace("(", "").replace(")", "")) > intStart) window.location.replace(shoppingCartUrl); }, 1500);
			}
			else{
				alert('The shopping cart is temporarily unavailable');
			}
		},
	});
    
}


//for psycnet product page
function add_pn_product_to_cart(strItemNo, shoppingCartUrl) {
    /* per http://jira.apa.org/browse/IDM-3699
	addPsycnetProductToCart(
		sessionId, 
		apaItemCode, 
		itemUID, 
		name, 
		description, 
		imageUrl, 
		productUrl, 
		documentCode, 
		isOfpPurchase, 
		onItemAddedToCart
		);				
	sessionId=session cookie associated with IDEM/ERIGHTS session
	apaItemCode=ItemCode
	itemUID=UID of Item
	name=name of itemUID
	description=description of item
	imageUrl=url of image to be displayed
	productURL=url of image
	documentcode=code of Journal
	isOfpPurchase=boolean value for whether this is OFP purchase
	onItemAddedToCart=function CallBack for response
	*/
    switch (strItemNo) {
        case '3500001': //PI direct daypass
            document.getElementById('shoppingIframe').contentWindow.addPsycnetProductToCart('', strItemNo, '', 'PsycINFO Day Pass', '24 hr pass to PsycINFO', 'http://psycnet.apa.org/images/db_info.gif', 'http://psycnet.apa.org/images/db_info.gif', '', false, onItemAddedToCart);
            break;
        case '2020001': //PSQ Direct daypass
            document.getElementById('shoppingIframe').contentWindow.addPsycnetProductToCart('', strItemNo, '', 'PsycCRITIQUES Day Pass', '24 hr pass to PsycCRITIQUES', 'http://psycnet.apa.org/images/db_critiques.gif', 'http://psycnet.apa.org/images/db_critiques.gif', '', false, onItemAddedToCart);
            break;
        case '3700001': //PE Direct daypass
            document.getElementById('shoppingIframe').contentWindow.addPsycnetProductToCart('', strItemNo, '', 'PsycEXTRA Day Pass', '24 hr pass to PsycEXTRA', 'http://psycnet.apa.org/images/db_extra.gif', 'http://psycnet.apa.org/images/db_extra.gif', '', false, onItemAddedToCart);
            break;
        case '4840001': //Combo Daypass
            document.getElementById('shoppingIframe').contentWindow.addPsycnetProductToCart('', strItemNo, '', 'Day Pass Combo', '24 hr pass to PsycCRITIQUES, PsycEXTRA and PsycINFO', 'http://psycnet.apa.org/images/db_triple_gray.gif', 'http://psycnet.apa.org/images/db_triple_gray.gif', '', false, onItemAddedToCart);
            break;
    }
    var cartQuantity = jQ("#CartQuantity");
    var intStart = parseInt(cartQuantity.text().replace("(", "").replace(")", ""));
    setTimeout(function () { if (parseInt(cartQuantity.text().replace("(", "").replace(")", "")) > intStart) window.location.replace(shoppingCartUrl); }, 1500);
}
function onItemAddedToCart(response) {
    /*
	0: Success
	1: User is not logged in (this is used to purchase items for which user need to be logged in)
	2: User is not authorized to buy this product (something like a  member only product)
	3: Product not found in DB
	4: User already have active license and cannot purchase this (this is currently strictly for CE items)
	5: Quantity requested not available
	6: User not allowed to buy more than one at a time
	7: CESAS related (overlook this)
	*/
    cartResponse = response.addToCartResponse;
    if (cartResponse == 0) updateShoppingCart(response.quantity, 0);
    else {
		$j("<div id='overlay' ></div>").appendTo("body");
		$j("<div class='notLoggedInDiv'>"+
		     "<div class='notLoggedInWindowClose' style='padding: 8px 12px;font-size: 13px; height: 14px;'><a href='#' onclick='javascript:$j(\"#overlay\").remove();$j(\".notLoggedInDiv\").remove();'>Close</a></div>"+
		     "<div class='notLoggedInForm' style='width: 90%;float: none;padding: 50px 5%;'>"+
			    "<div class='popupTitle'>Sorry, we can't add this item to your cart.</div>"+
				"<p class='popupSubtitle'>This item may only be purchased in single quantities.</p>"+
				
				"<div style='text-align: center;'>"+
				  "<button class='submit okBtn' onclick='javascript:$j(\"#overlay\").remove();$j(\".notLoggedInDiv\").remove();'>OK</button>"+
		        "</div>"+
			" </div>"+
			"</div>").appendTo("body");
	}
}

//for tabs, accordion page
function getQueryParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

//RWD - top nav, search box and left nav
function toggleMenu(className) {
    hideCitationPopup();
    resetMenu(className);
    $j("." + className).animate({ height: 'toggle' }, function () {
        if ($j("." + className).css("display") == "block") {
            showMask("rwdOverlayMask");
            if (className == "subnav") {
                $j(".ltcol").css("z-index", 150);
                $j(".ltcol .navTitle").addClass("active");
            }
            else $j(".ltcol").css("z-index", 10);
        }
        else hideMask("rwdOverlayMask");
    });
}
function resetMenu(className) {
    if (className != "topnav" && $j(".topnav").css("display") == "block") $j(".topnav").hide();
    if (className != "search" && $j(".search").css("display") == "block") $j(".search").hide();
    if (className != "subnav") {
        if ($j(".subnav").css("display") == "block") {
            $j(".ltcol").css("z-index", 10);
            $j(".subnav").hide();
        }
        $j(".ltcol .navTitle .closed").show();
        $j(".ltcol .navTitle .expand").hide();
        $j(".ltcol .navTitle").removeClass("active");
    }
}
function toggleLeftNav() {
    $j(".ltcol .navTitle .expand").toggle();
    $j(".ltcol .navTitle .closed").toggle();
    toggleMenu('subnav');
}
function hideMask(WindowId, origin) {
    if (typeof (origin) === 'undefined') origin = '';
    $j('#' + WindowId).fadeOut('slow');
    if (origin != "citationPopup" && Modernizr.mq('(max-width: 995px)')) resetMenu('');
    hideCitationPopup();
}
function showMask(WindowId) {
    var maskHeight = $j(document).height()
    var maskWidth = $j(window).width();
    $j('#' + WindowId).css({ 'height': maskHeight, 'width': maskWidth });
    $j('#' + WindowId).fadeIn('slow');
}
function showCitationPopup() {
    var popup = document.getElementById("citationPopup");
    if (popup != null && typeof (popup) !== 'undefined') {
        popup.classList.add("showCitationPopup");
    }
}
function hideCitationPopup() {
    var popup = document.getElementById("citationPopup");
    if (popup != null && typeof (popup) !== 'undefined') {
        popup.classList.remove("showCitationPopup");
    }
}

//for search left nav and related results
function expandResult(element) {
    var me = $j(element);
    if ($j('#hide' + me.attr('id')).length > 0) {
        $j('#hide' + me.attr('id')).toggle();
        me.hide();
    }
    else {
        $j('.hide_more_' + me.attr('name')).toggle();
        $j('.show_more_' + me.attr('name')).toggle();
    }
}
function collapseResult(element) {
    var me = $j(element);
    if ($j('#' + me.attr('name')).length > 0) {
        $j('#' + me.attr('name')).toggle();
        $j('#hide' + me.attr('name')).toggle();
    }
    else {
        $j('.hide_more_' + me.attr('name')).toggle();
        $j('.show_more_' + me.attr('name')).toggle();
    }
}

//for global search right rail callback
function loadPsycNet() {
    if (document.getElementById('psyc_results') != null) {
        CallServer("psycnetSearch, " + document.location.search, "");
    }
}
function ReceiveServerData(rValue) {
    if (rValue.indexOf("psycnetSearch") == 0) {
        var pnetDiv = document.getElementById('psyc_results');
        var resp = eval(rValue.substr(rValue.indexOf(",") + 1));
        if (pnetDiv != null && !(resp.error)) {
            var header = pnetDiv.getElementsByTagName('h3')[0];
            header.innerHTML = 'We found an additional ' + resp.total + ' results in our premium databases';
            var ul = pnetDiv.getElementsByTagName('ul')[0];
            for (var i = 0; i < 5; i++) {
                var li = ul.getElementsByTagName('li')[i];
                var a = li.getElementsByTagName('a')[0];
                a.setAttribute('href', resp[li.id].url);
                li.innerHTML += ' (' + resp[li.id].count + ')';
            }
        }
    }
}

//use to expand/collapse content in listboxmodule or mostpolpular at small breakpoint
function toggleDiv(divId) {
    $j("#" + divId).toggle();
    if ($j("#" + divId + "_rwdClose").hasClass("hidden")) $j("#" + divId + "_rwdClose").removeClass("hidden");
    else $j("#" + divId + "_rwdClose").addClass("hidden");
    if ($j("#" + divId + "_rwdOpen").hasClass("hidden")) $j("#" + divId + "_rwdOpen").removeClass("hidden");
    else $j("#" + divId + "_rwdOpen").addClass("hidden");
}
//display collapsibleContent in XL, L & M
function resetCollapsibleContent() {
    $j(".collapsibleContent").show();
    $j("[id$=_rwdClose]").removeClass("hidden");
    $j("[id$=_rwdOpen]").removeClass("hidden");
    $j("[id$=_rwdOpen]").addClass("hidden");
}

//use to expand/collapse content in drawer widget
function toggleDrawer(divId) {
    $j("#" + divId + "_close").toggle();
    $j("#" + divId + "_open").toggle();
    $j("#" + divId + "_details").toggle();
}

// for fixing the vertical lines
function fixColHeight() {
    var minHeight = 0;
    if (document.getElementById("ltcol")) {
        var divLeft = document.getElementById("ltcol");
        divLeft.style.height = "auto";
        if (getHeight(divLeft) > minHeight) minHeight = getHeight(divLeft);
    }
    if (document.getElementById("rtcol")) {
        var divRight = document.getElementById("rtcol");
        divRight.style.height = "auto";
        if (getHeight(divRight) > minHeight) minHeight = getHeight(divRight);
    }
    if (document.getElementById("ctcol")) {
        var divCenter = document.getElementById("ctcol");
        divCenter.style.height = "auto";
        if (getHeight(divCenter) > minHeight) minHeight = getHeight(divCenter);
    }
    if (document.getElementById("ltcol")) { divLeft.style.height = minHeight + "px"; }
    if (document.getElementById("rtcol")) { divRight.style.height = minHeight + "px"; }
    if (document.getElementById("ctcol")) { divCenter.style.height = minHeight + "px"; }
}

function getHeight(divObj) {
    var iHeight = Math.max(divObj.scrollHeight, divObj.offsetHeight) + 10;
    return iHeight;
}

//reset iframe height for external apps 
function resetIframeHeight(frameID, contentID) {
    var minHeight = 0;
    if (frameID === undefined) {	//default for external apps (0.1B, 0.4B & 0.5B)
        frameID = "appFrame";
        contentID = "content";
    }
    var iframeElement = document.getElementById(frameID);
    if (iframeElement) {
        if (iframeElement.contentWindow.document.getElementById(contentID)) {
            var appWindHeight = getHeight(iframeElement.contentWindow.document.getElementById(contentID));
            iframeElement.style.height = appWindHeight + "px";
        }
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

//these 2 below functions are used in social media share bar
function publishFacebookWallPost(appid, url) {
    var myText = '{"app_id": ' + '"' + appid + '"' + ', ' + '"method": "feed"' + ', ' + '"link": ' + '"' + url + '"' + '}';
    var obj = $j.parseJSON(myText);
    FB.ui(obj,
        function (response) {
            if (response && !response.error_code) {
                //_ga.trackFacebookShare();                --Posting completed
            }
        });
    return false;
}

//for feature-rich widgets
function autoSlideShow(containerID) {
    $j('#' + containerID + '_play').addClass("inactive");
    $j('#' + containerID + '_pause').removeClass("inactive");
    var items = $j('#' + containerID).find('[class*="Item"]');
    for (var i = 0; i < items.length; i++) {
        if ($j('#' + items[i].id).css('display') == 'block') {
            currSlide = i; break;
        }
    }
    slideSwitch(containerID, currSlide, (currSlide < items.length - 1 ? currSlide + 1 : 0), 'right', 'ease');
}
function slideSwitch(containerID, toHide, toShow, dirIn, effect) {
    var dirOut = dirIn == 'left' ? 'right' : 'left';
    var items = $j('#' + containerID).find('[class*="Item"]');
    for (var i = 0; i < items.length; i++) {
        if (i != toShow && $j('#' + items[i].id).css('display') == 'block') {
            if (i == toHide) {
                if (effect == 'ease') {
                    if (containerID.indexOf("carousel") > -1) $j('#' + containerID + '_slide' + (i + 1)).fadeOut(1000);
                    else $j('#' + containerID + '_slide' + (i + 1)).hide('slide', { direction: dirOut }, 1000);
                }
                else $j('#' + containerID + '_slide' + (i + 1)).hide('slide', { direction: dirOut }, 400);
            }
            else $j('#' + containerID + '_slide' + (i + 1)).hide();
            $j('#' + containerID + '_ind' + (i + 1)).attr('src', '/Content/Images/slide-off.png');
            $j('#' + containerID + '_tab' + (i + 1)).removeClass("active");
        }
    }
    if (effect == 'ease') {
        if (containerID.indexOf("carousel") > -1) $j('#' + containerID + '_slide' + (toShow + 1)).fadeIn(1000);
        else $j('#' + containerID + '_slide' + (toShow + 1)).show('slide', { direction: dirIn }, 1000);
    }
    else $j('#' + containerID + '_slide' + (toShow + 1)).show('slide', { direction: dirIn }, 400);
    $j('#' + containerID + '_ind' + (toShow + 1)).attr('src', '/Content/Images/slide-on.png');
    $j('#' + containerID + '_tab' + (toShow + 1)).addClass("active");
}
function slidePlay(containerID) {
    if (containerID.indexOf("carousel") > -1) {
        var carousels = $j('.carousel');
        for (var k = 0; k < carousels.length; k++) {
            if (containerID == carousels[k].id) {
                autoSlideShow(carousels[k].id);
                carouselIntervalId[k] = window.setInterval("autoSlideShow('" + carousels[k].id + "')", slideTimerInterval); break;
            }
        }
    }
    else {
        var sliders = $j('.slider');
        for (var k = 0; k < sliders.length; k++) {
            if (containerID == sliders[k].id) {
                autoSlideShow(sliders[k].id);
                slideIntervalId[k] = window.setInterval("autoSlideShow('" + sliders[k].id + "')", slideTimerInterval); break;
            }
        }
    }
}
function slidePause(containerID) {
    $j('#' + containerID + '_play').removeClass("inactive");
    $j('#' + containerID + '_pause').addClass("inactive");
    if (containerID.indexOf("carousel") > -1) {
        var carousels = $j('.carousel');
        for (var k = 0; k < carousels.length; k++) {
            if (containerID == carousels[k].id) {
                carouselIntervalId[k] = window.clearInterval(carouselIntervalId[k]); break;
            }
        }
    }
    else {
        var sliders = $j('.slider');
        for (var k = 0; k < sliders.length; k++) {
            if (containerID == sliders[k].id) {
                slideIntervalId[k] = window.clearInterval(slideIntervalId[k]); break;
            }
        }
    }
}
function slideMove(direction, containerID) {
    slidePause(containerID);
    var items = $j('#' + containerID).find('[class*="Item"]');
    for (var i = 0; i < items.length; i++) {
        if ($j('#' + items[i].id).css('display') == 'block') {
            currSlide = i; break;
        }
    }
    if (direction == "left") {
        slideSwitch(containerID, currSlide, (currSlide == 0 ? items.length - 1 : currSlide - 1), direction, 'slide');
    }
    else {
        slideSwitch(containerID, currSlide, (currSlide < items.length - 1 ? currSlide + 1 : 0), direction, 'slide');
    }
}
function slideMoveTo(containerID, toShow) {
    slidePause(containerID);
    var direction = "right";
    var items = $j('#' + containerID).find('[class*="Item"]');
    for (var i = 0; i < items.length; i++) {
        if ($j('#' + items[i].id).css('display') == 'block') {
            currSlide = i; break;
        }
    }
    if (currSlide != toShow) slideSwitch(containerID, currSlide, toShow, direction, 'ease');
}
function resetCarouselHeight() {
    var carousels = $j('.carousel');
    if (carousels.length > 0) {
        var imgHeight = "";
        var items = $j('#' + carousels[0].id).find('[class*="Item"]');
        for (var i = 0; i < items.length; i++) {
            if ($j('#' + items[i].id).css('display') == 'block') {
                imgHeight = $j('#' + items[i].id).height();
                break;
            }
        }
        if (($j('.three_col_a').length > 0 && $j('.topcontent').length == 0 && Modernizr.mq('(min-width: 996px)'))) {
            $j('.featureRichItem .carousel .container').css('height', (imgHeight + 124) + "px");
        }
        else {
            if (Modernizr.mq('(max-width: 480px)')) { $j('.featureRichItem .carousel .container').css('height', (imgHeight + 124) + "px"); }
            else {
                if (Modernizr.mq('(max-width: 767px)') || ($j('.carousel.large').length > 0 && Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 995px)'))) { $j('.featureRichItem .carousel .container').css('height', (imgHeight + 24) + "px"); }
                else { $j('.featureRichItem .carousel .container').css('height', imgHeight + "px"); }
            }
        }
        $j('.featureRichItem .carousel .container .carouselWrap').css('height', imgHeight + "px");
    }
}
//for horizontal gallery
var currUnit = 0;
function rotaryMove2(direction, rotaryID) {
    var items = $j('#' + rotaryID).find('.hgUnit');
    var NUM_ITEMS_SHOW = parseInt($j('#' + rotaryID + '_unit_items').val());
    for (var i = 0; i < items.length; i++) {
        if ($j('#' + items[i].id).css('display') == 'block') {
            currUnit = i; break;
        }
    }
    if (direction == "left") {
        rotarySwitch(rotaryID, currUnit, (currUnit == 0 ? items.length - 1 : currUnit - 1), direction, NUM_ITEMS_SHOW);
    }
    else {
        rotarySwitch(rotaryID, currUnit, (currUnit < items.length - 1 ? currUnit + 1 : 0), direction, NUM_ITEMS_SHOW);
    }
}
function rotarySwitch(rotaryID, toHide, toShow, dirIn, NUM_ITEMS_SHOW) {
    var dirOut = dirIn == 'left' ? 'right' : 'left';
    $j('#' + rotaryID + '_unit' + (toHide + 1)).hide('slide', { direction: dirOut }, 1000);
    $j('#' + rotaryID + '_unit' + (toShow + 1)).show('slide', { direction: dirIn }, 1000);
    var from = toShow * NUM_ITEMS_SHOW + 1;
    var to = from + NUM_ITEMS_SHOW - 1;
    var total = parseInt($j('#' + rotaryID + '_total').text());
    if (to > total) to = total;
    $j('#' + rotaryID + '_from').text(from);
    $j('#' + rotaryID + '_to').text(to);
}
function resetHorizontalGallery() {
    var rotaries = $j('.horizontalGallery');
    if (rotaries.length > 0) {
        var wrapperWidth = $j('.horizontalGallery .wrapper').width();
        var n = Math.floor(wrapperWidth / hgItemWidth);
        for (var x = 0; x < rotaries.length; x++) {
            $j('#' + rotaries[x].id).removeClass("noNavButton");
            var unitCount = 0;
            var itemCount = 0;
            var srcHG = "";
            var items = $j('#' + rotaries[x].id).find('.hgItem');
            if ($j('#wrapper_' + rotaries[x].id).length > 0) {
                wrapperWidth = $j('#wrapper_' + rotaries[x].id).width();
                n = Math.floor(wrapperWidth / hgItemWidth);
            }
            for (var i = 0; i < items.length; i++) {
                if (items[i].id.indexOf("nocount") < 0) {  //exclude half-items
                    itemCount++;
                    if (itemCount % n == 1 || n == 1) {
                        unitCount++;
                        srcHG += "<section class='hgUnit' id='" + rotaries[x].id + "_unit" + unitCount + "' ";
                        srcHG += (i == 0 ? "style='display: block;'>" : "style='display: none;'>");
                    }
                    srcHG += "<section class='hgItem' id='" + items[i].id + "'>";
                    srcHG += $j('#' + items[i].id).html();
                    srcHG += "</section>";
                    if (itemCount % n == 0 || i == items.length - 1) {
                        //append an extra hg item to show "half-item"
                        if (wrapperWidth > (n * hgItemWidth) && i < items.length - 1) {
                            srcHG += "<section class='hgItem' id="
                            srcHG += (items[i + 1].id.indexOf("nocount") == 0 ? "'" + items[i + 1].id + "'>" : "'nocount_" + items[i + 1].id + "'>");
                            srcHG += $j('#' + items[i + 1].id).html();
                            srcHG += "</section>";
                        }
                        srcHG += "</section>";
                    }
                }
            }
            $j('#' + rotaries[x].id).find('.hgWrapper').html(srcHG);
            $j('#' + rotaries[x].id + '_from').text('1');
            if (n < items.length) {
                $j('#' + rotaries[x].id + '_to').text(n);
            }
            else {
                $j('#' + rotaries[x].id + '_to').text(items.length);
                $j('#' + rotaries[x].id).addClass("noNavButton");
            }
            $j('#' + rotaries[x].id + '_unit_items').val(n);
        }
    }
}

function resetHeroHeight() {
    var hero = $j('.hero');
    if (hero.length > 0) {
        var heroTitleImg = $j('.titleImage');
        var heroInterior = $j('.interior');
        var imgHeight = $j('.hero-image img').height();
        var dvHeight = $j('.hero-feature').height() + 40;
        var wrapHeight = '430px';
        if (heroTitleImg.length > 0) dvHeight = 0;
        if (heroTitleImg.length > 0 || heroInterior.length > 0) wrapHeight = '330px';
        if (Modernizr.mq('(max-width: 480px)')) wrapHeight = (imgHeight + dvHeight) + "px";
        else if (Modernizr.mq('(max-width: 767px)')) wrapHeight = imgHeight + "px";
        $j('.hero-overlay').css('height', wrapHeight);
        $j('.hero-image').css('height', wrapHeight);
        if (heroTitleImg.length > 0) {
            if (Modernizr.mq('(min-width: 481px)')) $j('.titleImage .titleWrap').css('height', wrapHeight);
            else $j('.titleImage .titleWrap').css('height', 'auto');
        }
    }
}

/* START ADDING SWIPE SUPPORT */
function initSwiper() {
    // detect nodeList to add swipe support to each node 
    // you can append to this set or create a new one whenever required 
    // then pass it to attachSwiper fnc  
    var touchableNodeList = document.querySelectorAll('.add-swiper, .carousel, .horizontalGallery, .slider');

    // attachSwiper if platform is mobile (ios or andriod)
    if (is_ios || is_android) {
        addSwiper(touchableNodeList);
    }
}

function addSwiper(list) {
    for (var i = 0; i < list.length; i++) {
        attachSwiper(list[i]);
    }
}

function attachSwiper(elt) {
    log('attachedSwiper initiating ... ');
    log('selected elements: ', elt);

    if (!window.Hammer) {
        log('HammerJS not loaded, please insert a referenct for hammer.js before global.js');
        return;
    }
    // new hammer instance for elt element
    var touchable = new Hammer(elt, {
        drag_max_touches: 0,
        prevent_default: true,
        scale_treshold: 0,
    });
    log('new hammer instance intiated for: ', elt);

    // detect prev/next buttons
    var prev = elt.querySelector('.pre img');
    var next = elt.querySelector('.next img');

    if (next && next.onclick != null && typeof next.onclick == 'function') {
        swipe("left", next);
    } else {
        log('cannot find next elements, or its onlick handler');
    }

    if (prev && prev.onclick != null && typeof prev.onclick == 'function') {
        swipe("right", prev);
    } else {
        log('cannot find prev elements, or its onlick handler');
    }

    function swipe(gesture, nav) {
        gesture = "swipe" + gesture;
        touchable.on(gesture, function (e) {
            nav.onclick();
        });
    }

}

function log(msg, extra) {
    var debugSwiper = true;
    if (debugSwiper) {
        console.log(msg, extra ? extra : '');
        console.log('------------------------------------------------');
    }
}
/* END ADDING SWIPE SUPPORT */

/* Set active membership li */
function setNavActiveElt() {
    console.clear();
    jQuery('.subBrandNav li').removeClass('on');
    var url = window.location.pathname;
    if (url.substr(-1) == '/') url = url.slice(0, -1);
    var parts = url.split('/').slice(1);
    parts = parts.filter(function (item) { return item != ""; });
    var urlV2 = url.substr(0, url.lastIndexOf('/'));
    var urlV3 = '/' + [parts[0], parts[1]].join('/');
    if (parts[parts.length - 1] != 'index' && hasPart(parts[2])) {
        urlV3 = '/' + [parts[0], parts[1], parts[2]].join('/');
    }
    jQuery('nav.topnav menu li a[href*="/' + parts[0] + '"]').parent().addClass("on");
    var elt = (jQuery('.subBrandNav li a[href="' + url + '/index' + '"]').length != 0 ?
        jQuery('.subBrandNav li a[href="' + url + '/index' + '"]').first() :
        jQuery('.subBrandNav li a[href="' + url + '"]').length != 0 ?
            jQuery('.subBrandNav li a[href="' + url + '"]').first() :
            jQuery('.subBrandNav li a[href*="' + urlV2 + '"]').length != 0 ?
                jQuery('.subBrandNav li a[href*="' + urlV2 + '"]').first() :
                jQuery('.subBrandNav li a[href^="' + urlV3 + '"]').length != 0 ?
                    jQuery('.subBrandNav li a[href^="' + urlV3 + '"]').first() :
                    null);

    if (elt) elt.parent().addClass("on");
}
function hasPart(part) {
    return jQuery('.subBrandNav li a[href*="' + part + '"]').length == 0 ? false : true
}
/* End OF Set active membership li */


$j(document).ready(function () {
    includeHTML();
    // add a lock to the secured links
    $j('.mainwrap').find('a').each(function () {
        if ($j(this).find('img').length == 0) {
            var securePath = "/secure/";
            aHref = $j(this).attr('href');  //get the value of an attribute 'href'
            // append <span class='secure' when path contains /secure/ 
            // and next node is not <span class='secure'
            if (typeof aHref != "undefined") {
                var isSecure = aHref.indexOf(securePath) > -1;
                if (isSecure) {
                    var cssClass = "secured";
                    if (aHref.indexOf('/') == 0 || aHref.indexOf('.apa.org') > 0 || aHref.indexOf('.apadivisions.org') > 0 || aHref.indexOf('.apaedat.org') > 0 || aHref.indexOf('.apaservices.org') > 0 || aHref.indexOf('.supportpsychologypac.org') > 0) {
                        // add span tag if not already there
                        var spanSecureTag = '<span class="' + cssClass + '">&nbsp;</span>';

                        if ($j(this).next().attr('class') != 'secured') {
                            $j(spanSecureTag).insertAfter($j(this));
                        }
                    }
                }
            }
        }
    });

    //for feature-rich widegets
    var sliders = $j('.slider');
    var carousels = $j('.carousel');
    for (var z = 0; z < sliders.length; z++) {
        slideIntervalId[z] = window.setInterval("autoSlideShow('" + sliders[z].id + "')", slideTimerInterval);
    }
    for (var y = 0; y < carousels.length; y++) {
        carouselIntervalId[y] = window.setInterval("autoSlideShow('" + carousels[y].id + "')", slideTimerInterval);
    }
    addLoadEvent(resetCarouselHeight);
    addLoadEvent(resetHeroHeight);
    addLoadEvent(initSwiper);
    resetHorizontalGallery();

    //fix top margin issue with Android devices (Opera & Android browsers excluding FF & Chrome)
    if (is_android && !isFF && !isChrome) {
        $j('body').css('margin-top', '-16px');
        $j('body .footer').css('margin-top', '16px');
    }
    //set footer margin
    if ($j(".share-container").length == 0 || (Modernizr.mq('(min-width: 768px)') && $j(".rwdLarge").length == 0)) {
        $j('footer').css('margin-bottom', '0px');
    }
    //back-to-top
    $j(window).scroll(function () {
        if ($j(this).scrollTop() < 800) $j(".back-to-top").css('visibility', 'hidden');
        else $j(".back-to-top").css('visibility', 'visible');
    });
    $j('#back-to-top').click(function () {
        $j('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });
});

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto. MIT License.*/
(function (w) {
    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1)) { return; }
    var doc = w.document;
    if (!doc.querySelector) { return; }
    var meta = doc.querySelector("meta[name=viewport]"),
        initialContent = meta && meta.getAttribute("content"),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;
    if (!meta) { return; }
    function restoreZoom() {
        meta.setAttribute("content", enabledZoom);
        enabled = true;
    }
    function disableZoom() {
        meta.setAttribute("content", disabledZoom);
        enabled = false;
    }
    function checkTilt(e) {
        aig = e.accelerationIncludingGravity;
        x = Math.abs(aig.x);
        y = Math.abs(aig.y);
        z = Math.abs(aig.z);
        // If portrait orientation and in one of the danger zones
        if (!w.orientation && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
            if (enabled) { disableZoom(); }
        }
        else if (!enabled) { restoreZoom(); }
    }
    w.addEventListener("orientationchange", restoreZoom, false);
    w.addEventListener("devicemotion", checkTilt, false);
})(this);

$j(window).resize(function () {
    if (!is_android && !isSilk && !is_ios) {
        $j('#rwdOverlayMask').fadeOut();
        hideCitationPopup();
        if (Modernizr.mq('(min-width: 996px)')) {
            if ($j(".topnav").css("display") == "none") $j(".topnav").show();
            if ($j(".search").css("display") == "none") $j(".search").show();
            if ($j(".subnav").css("display") == "none") $j(".subnav").show();
            $j(".ltcol .navTitle .expand").hide();
            $j(".ltcol .navTitle .closed").hide();
            $j(".ltcol .navTitle").removeClass("active");
        }
        else {
            resetMenu('');
        }
        if (document.getElementById("refineOverlayWindow")) {
            $j('#refineOverlayWindow').fadeOut();
            $j('#srchOverlayMask').fadeOut();
        }
    }
    //set footer margin
    if ($j(".share-container").length == 0 || (Modernizr.mq('(min-width: 768px)') && $j(".rwdLarge").length == 0)) {
        $j('footer').css('margin-bottom', '0px');
    }
    else {
        $j('footer').css('margin-bottom', '45px');
    }
    // iframed forms
    if (document.getElementById("appFrame")) resetIframeHeight();
    //carousels
    if ($j(".carouselWrap").length > 0) resetCarouselHeight();
    //horizontal galleries
    if ($j(".horizontalGallery").length > 0) resetHorizontalGallery();
    //collapsibleContent
    if (Modernizr.mq('(min-width: 481px)') && $j(".collapsibleContent").length > 0) resetCollapsibleContent();
    //hero
    if ($j('.hero').length > 0 || $j('.titleImage .hero-image')) resetHeroHeight();
});