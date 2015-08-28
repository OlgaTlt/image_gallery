//Project Responsive Image Gallery
//Author: Kireeva Olga
//Date 8/26/2015

$(document).ready( function() {

//****GLOBAL VARIABLES

var galleryLength = $("#image_gallery li").length;
var indexLi = 0;
var imageBox = "";
var imagePath = $("#image_gallery li:first-child a").attr('href');
var imageCaption = $("#image_gallery li:first-child img").attr('alt');

//For LightBox including mobile version

var boxImage = document.getElementById("lightbox");
var closeBtn = document.getElementById("close_box");
var lightBoxCaption ="";
var startX = 0;
var endX = 0;
var diffX = 0;

//****END GLOBAL VARIABLES

$("#lightbox").css('display', 'none');

//preload the first image
$("#big_image img").attr('src', imagePath);
$("#big_image > a").attr('href', imagePath).fadeIn('slow');
$("#big_image p").text(imageCaption);


// FUNCTIONS for image gallery

function swapImages(imageBox, imagePath) {
	imageBox.attr('src', imagePath);
}

function navigationLightBox(indexLi) {

	//if indexLi = 0: don't display id "prev"
	// if indexLi = galleryLength-1: don't display id "next"
	
	if (indexLi === 0) { $("#prev").css("visibility", "hidden"); }
		else { $("#prev").css("visibility", "visible"); }
	if (indexLi === galleryLength-1) { $("#next").css("visibility", "hidden");}
		else { $("#next").css("visibility", "visible");}
}

// moving to next/previous images in lightbox

function imageNextPrev(indexLi) {
	var nextImageLink = $("#image_gallery li a").get(indexLi);
	var nextImageCaption = $("#image_gallery li a img").get(indexLi);
	var timer;
	function setTimer(){	
	timer = setTimeout(function() {$('#lightimg_icon').show()}, 300);
	};
	 
	//here we use JavaScript getAttribute on raw DOM element:
	imagePath = nextImageLink.getAttribute('href');
	lightBoxCaption = nextImageCaption.getAttribute('alt');
	imageBox = $("#lightbox > img");	
	
	swapImages(imageBox, imagePath);
	$('#title_lbox').text(lightBoxCaption);
	setTimer();
	imageBox.load(function() {
		clearTimeout(timer);
		$('#lightimg_icon').hide();
		imageBox.fadeIn(200);
	});
	
}

// When user clicks on thumbnail image:

$("#image_gallery a").on("click", function(evt){
	evt.preventDefault();
	var timer;
	function setTimer(){	
	timer = setTimeout(function() {$('#bigimg_icon').show()}, 300);
	};
	
	imageBox = $("#big_image img");
	// saving a number/index of li that was clicked	
	indexLi = $(this).parent().index(); // we also use this index for lightbox	
	imagePath = $(this).attr('href'); // we also use this path for lightbox
	imageCaption = $(this).children('img').attr('alt');

	swapImages(imageBox, imagePath);
	$("#big_image p").text(imageCaption);
	setTimer();
	imageBox.load(function() {
		clearTimeout(timer);
		$('#bigimg_icon').hide();
		imageBox.fadeIn(200);
	});
});  
//end of image_gallery click

// LIGHT BOX 

$("#big_image a").on("click", function(evt){
	evt.preventDefault();
	var caption1 = $("#big_image p").text();
	imageBox = $("#lightbox > img");
	swapImages(imageBox, imagePath); //imagePath is a global variable
	navigationLightBox(indexLi); // indexLi is a global variable
	$("#lightbox > p").text(caption1);
	$('#lightbox').fadeIn('slow');
	imageBox.fadeIn('slow');

}); 
// end of big_image click

// moving to the next image (right arrow)	

 $("#next").on("click", function(evt){
	evt.preventDefault();
	indexLi = indexLi+1;
	imageNextPrev(indexLi);
	navigationLightBox(indexLi);
				
}); 

// moving to the previuos image (left arrow)	

 $("#prev").on("click", function(evt){
	evt.preventDefault();
	//imageBox.fadeOut('fast');
	indexLi = indexLi-1;
	imageNextPrev(indexLi);
	navigationLightBox(indexLi);
				
}); 
	
//code for touch and swipe 
//boxImage is a lightbox

closeBtn.addEventListener("click", closeBox, false);
closeBtn.addEventListener("touchend", closeBox, false);

boxImage.addEventListener("touchstart",touchStart ,false);
boxImage.addEventListener("touchend", touchEnd, false );
boxImage.addEventListener("touchmove", touchMove, false);
boxImage.addEventListener("touchcancel", touchCancel, false);

function touchStart(event) {
event.preventDefault();
	if ( event.target.id != 'close_box'){
	
	startX = event.touches[0].pageX;
	} else {
		return false;
	}
}

function touchMove(event) {
event.preventDefault();
	if ( event.target.id != 'close_box'){
	
	endX = event.touches[0].pageX;
	} else {
		return false;
	}
}	

function touchEnd(event) {
	event.preventDefault();
	if ( event.target.id != 'close_box'){
		diffX = startX - endX;		
	} else {
		return false;
	}
	if (diffX > 0) {
		indexLi = indexLi+1;
		imageNextPrev(indexLi);		
	} 
	else if (diffX < 0) {
		indexLi = indexLi-1;
		imageNextPrev(indexLi);
	} else {
		return false;
	}
	touchCancel(event);
}

function touchCancel(event){
	var startX = 0;
	var endX = 0;
	var diffX = 0;
}

function closeBox(event){
	event.preventDefault();
	//switching image on the page
	imagePath = $("#lightbox > img").attr('src');
	$("#big_image p").text(lightBoxCaption);
	imageBox = $("#big_image img");
	swapImages(imageBox, imagePath);
	
	$('#lightbox').fadeOut("slow");
	imageBox.fadeIn('slow');
		
	}

}); // end of ready