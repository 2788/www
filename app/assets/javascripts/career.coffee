# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
    # career fluid slider
    $('.fluid-slider').slick
        dots: false
        autoplay: true
        autoplaySpeed: 2000
        arrows: false
        slidesToShow: 3
        slidesToScroll: 2
    #

    # career wordbutton slider
    $('.fluid-wordbutton-slider').slick
        arrows:true
        slidesToShow: 1
        slidesToScroll: 1
    #

    # career media slider
    $('.fluid-media-slider').slick
        dots: true
        arrows: false
        slidesToShow: 2
        slidesToScroll:1
    $('.fluid-media-slider .slick-dots').addClass('turnpage')

