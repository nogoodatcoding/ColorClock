$(document).ready(init);

var lastHex = 0xffffff;
var over60 = 256/60;
var over24 = 256/24;
var isAM = true;

function fontResizerInit() {
  //credit: http://www.shopdev.co.uk/blog/text-resizing-with-jquery/
  var originalFontSize = $('#timeval').css('font-size');
    $(".resetFont").click(function(){
    $('#timeval,#hexval,#am,#pm,#toggletime,#togglehex').css('font-size', originalFontSize);
  });
  // Increase Font Size
  $(".increaseFont").click(function(){
    var currentFontSize = $('#timeval').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*1.1;
    $('#timeval,#hexval,#am,#pm,#toggletime,#togglehex').css('font-size', newFontSize);
    return false;
  });
  // Decrease Font Size
  $(".decreaseFont").click(function(){
    var currentFontSize = $('#timeval').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*0.9;
    $('#timeval,#hexval,#am,#pm,#toggletime,#togglehex').css('font-size', newFontSize);
    return false;
  });
}

function togglerInit() {
    $('#toggletime').click(function(){
        $('#hexval').hide('slide', {direction: 'right'}, 'slow', function(){
            $('#timeval').show('slide', {direction: 'right'}, 'slow');
        });
        
        $(this).addClass('on');
        $('#togglehex').removeClass('on');
    });
    
    $('#togglehex').click(function(){
        $('#timeval').hide('slide', {direction: 'left'}, 'slow', function(){
            $('#hexval').show('slide', {direction: 'left'}, 'slow');
        });
        
        $(this).addClass('on');
        $('#toggletime').removeClass('on');
    });
}

function init() {
    var d = new Date();
    if (d.getHours() > 12 ) {
        isAM = false;
        $('#am').hide();
        $('#pm').show();
    }
    else {
        isAM = true;
        $('#am').show();
        $('#pm').hide();
    }

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
    checkAMPM(d);

    var hoursX = addLeadingZero(timeToHex(d.getHours(), over24));
    var minX = addLeadingZero(timeToHex(d.getMinutes(), over60));
    var secX = addLeadingZero(timeToHex(d.getSeconds(), over60));
    
    var hex = hoursX + minX + secX;
    $('#timeval').html('<span>&nbsp;' + addLeadingZero("" + d.getHours()) + ":" + addLeadingZero("" + d.getMinutes()) + ":" + addLeadingZero("" + d.getSeconds()) + '</span>');
    $('#hexval').text(hex);
    if(Math.abs(lastHex - parseInt('0x'+hex)) > 0x0A) {
        lastHex = parseInt('0x' + hex);
        $('body').animate({ backgroundColor: "#" +hex }, 'slow');
    }
    setTimeout(update, 1000);
}

function checkAMPM(d) {
    if (d.getHours() >= 12 && isAM) {
        isAM = false;
        $('#am').hide();
        $('#pm').show();
    }
    else if (d.getHours() < 12 && !isAM) {
        console.log("hiding");
        isAM = true;
        $('#pm').hide();
        $('#am').show();
    }
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