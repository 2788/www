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

    # career wordbutton slider
    $('.fluid-wordbutton-slider').slick
        arrows:true
        slidesToShow: 1
        slidesToScroll: 1

    # career media slider
    $('.fluid-media-slider').slick
        dots: true
        arrows: false
        slidesToShow: 2
        slidesToScroll:1

    $('.fluid-media-slider .slick-dots').addClass('turnpage')

    # video modal show and hidden
    $('#interview, #eventParty-short, #eventParty-long').on 'show.bs.modal', (e) ->
        vid = this.getElementsByTagName("video")[0]
        vid.play()
        return

    $('#interview, #eventParty-short, #eventParty-long').on 'hidden.bs.modal', (e) ->
        vid = this.getElementsByTagName("video")[0]
        vid.currentTime = 0
        vid.pause()
        return

    # varying modal content positionModal
    $('#positionModal').on 'show.bs.modal', (event) ->
        # Button that triggered the modal
        button = $(event.relatedTarget)
        # varying content
        recipient = button.data('whatever')

        # modal
        modal = $(this)
        modal.find('.modal-body .section').addClass('d-none')
        modal.find('.modal-body .' + recipient).removeClass('d-none')
