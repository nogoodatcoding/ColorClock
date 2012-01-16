$(document).ready(init);

var lastHex = 0xffffff;
var over60 = 256/60;
var over24 = 256/24;

var startingFontSizeNum = 13;
var currentFontSizeNum = startingFontSizeNum;

function fontResizerInit() {

  var queryString = window.location.search;
  var startSize;
  if(queryString && (startSize = (/[&?]startSize=(\d*)/i).exec(queryString)))
  {
  currentFontSizeNum = startingFontSizeNum = parseInt(startSize[1], 10) || startingFontSizeNum;
    $('#display').css('font-size', startingFontSizeNum + "em");
  }
  

  $(".resetFont").click(function(){
    $('#display').css('font-size', startingFontSizeNum + "em");
  });
  
  // Increase Font Size
  $(".increaseFont").click(function(){
    currentFontSizeNum += 0.25;
    $('#display').css('font-size', currentFontSizeNum + "em");
    return false;
  });
  // Decrease Font Size
  $(".decreaseFont").click(function(){
    currentFontSizeNum -= 0.25;
    $('#display').css('font-size', currentFontSizeNum + "em");
    return false;
  });
}

function togglerInit() {
    $('#toggletime').click(function(){
        $('#hexval:visible').hide('slide', {direction: 'down'}, 'slow', function(){
            $('#timeval').show('slide', {direction: 'up'}, 'slow');
        });
        
        $(this).addClass('on');
        $('#togglehex').removeClass('on');
    });
    
    $('#togglehex').click(function(){
        $('#timeval:visible').hide('slide', {direction: 'up'}, 'slow', function(){
            $('#hexval').show('slide', {direction: 'down'}, 'slow');
        });
        
        $(this).addClass('on');
        $('#toggletime').removeClass('on');
    });
}

function init() {
    update();
    fontResizerInit();
    togglerInit();
    $('#display').show();
    $('#timeval').slideDown();
    $('#hexval').slideDown();
    $('#hexval').hide();
}

function update() {
    var d = new Date();

    var hoursX = addLeadingZero(timeToHex(d.getHours(), over24));
    var minX = addLeadingZero(timeToHex(d.getMinutes(), over60));
    var secX = addLeadingZero(timeToHex(d.getSeconds(), over60));
    
    var hex = hoursX + minX + secX;
    $('#timeval').text(addLeadingZero("" + d.getHours()) + ":" + addLeadingZero("" + d.getMinutes()) + ":" + addLeadingZero("" + d.getSeconds()));
    $('#hexval').text(hex);
    if(Math.abs(lastHex - parseInt('0x'+hex)) > 0x0A) {
        lastHex = parseInt('0x' + hex);
        $('body').animate({ backgroundColor: "#" +hex }, 'slow');
    }
    setTimeout(update, 1000);
}

function addLeadingZero(n) {
    if(n.length < 2)
        return '0' + n;
    return n;
}

function timeToHex(number, factor) {
    number *= factor;
    if (number < 0)
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return Math.floor(number).toString(16).toUpperCase();
}