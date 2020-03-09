###

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)
SMINT V3.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

###
#= require jquery

(->

  $.fn.smint = (json) ->
    settings = $.extend({
      'scrollSpeed': 500
      'mySelector': 'div'
    })
    # adding a class to users div
    $(this).addClass 'smint'
    #Set the variables needed
    optionLocs = new Array
    lastScrollTop = 0
    menuHeight = $('.smint').height()
    smint = $('.smint')
    smintLi = $('.smint li')
    smintA = $('.smint a')
    smintH = smintLi or smintA;
    myOffset = smint.height()
    offsets = smint.offset()
    if offsets
      stickyTop = offsets.top
    fxd = json.fxdClass or 'fxd'
    if settings.scrollSpeed
      scrollSpeed = settings.scrollSpeed
    if settings.mySelector
      mySelector = settings.mySelector
    smintH.each (index) ->
      id = $(this).find('a').attr('href').split('#')[1]
      if !$(this).hasClass('extLink')
        $(this).attr 'id', id
      #Fill the menu
      optionLocs.push Array($(mySelector + '.' + id).position().top - menuHeight, $(mySelector + '.' + id).outerHeight() + $(mySelector + '.' + id).position().top, id)
      #
      # get initial top offset for the menu

      # check position and make sticky if needed

      stickyMenu = (direction) ->
        # current distance top
        scrollTop = $(window).scrollTop() + myOffset
        # if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
        if scrollTop > stickyTop + myOffset
          smint.addClass fxd
          # add padding to the body to make up for the loss in heigt when the men goes to a fixed position.
          # When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
          # $('body').css 'padding-top', menuHeight
        else
          smint.css('position', 'relative').removeClass fxd
          #remove the padding we added.
          # $('body').css 'padding-top', '0'
        # Check if the position is inside then change the menu
        # Courtesy of Ryan Clarke (@clarkieryan)
        if optionLocs[index][0] <= scrollTop and scrollTop <= optionLocs[index][1]
          if direction == 'up'
            $('#' + id).addClass 'active'
            $('#' + optionLocs[index + 1][2]).removeClass 'active'
          else if index > 0
            $('#' + id).addClass 'active'
            $('#' + optionLocs[index - 1][2]).removeClass 'active'
          else if direction == undefined
            $('#' + id).addClass 'active'
          $.each optionLocs, (i) ->
            if id != optionLocs[i][2]
              $('#' + optionLocs[i][2]).removeClass 'active'
            return
        return

      # run functions
      stickyMenu()
      # run function every time you scroll
      $(window).scroll ->
        #Get the direction of scroll
        st = $(this).scrollTop() + myOffset
        # Check if at bottom of page, if so, add class to last <a> as sometimes the last div
        # isnt long enough to scroll to the top of the page and trigger the active state.
        if $(window).scrollTop() + $(window).height() == $(document).height()
          smintH.removeClass 'active'
          $('.smint li:not(\'.extLink\'):last').addClass 'active'
        else
          smintH.last().removeClass 'active'
        # is down or up,stickyMenu()
        if st > lastScrollTop
          direction = 'down'
        else if st < lastScrollTop
          direction = 'up'
        lastScrollTop = st
        stickyMenu direction

        return
      #/////////////////////////////////////
      $(this).on 'click', (e) ->
        `var myOffset`
        # gets the height of the users div. This is used for off-setting the scroll so the menu doesnt overlap any content in the div they jst scrolled to
        myOffset = smint.height()
        # stops hrefs making the page jump when clicked
        e.preventDefault()
        # get the hash of the button you just clicked
        hash = $(this).find('a').attr('href').split('#')[1]
        goTo = $(mySelector + '.' + hash).offset().top - myOffset
        # Scroll the page to the desired position!
        $('html, body').stop().animate { scrollTop: goTo }, scrollSpeed
        # if the link has the '.extLink' class it will be ignored
        # Courtesy of mcpacosy ‏(@mcpacosy)
        if $(this).hasClass('extLink')
          return false
        return
      #This lets yo use links in body text to scroll. Just add the class 'intLink' to your button and it will scroll
      $('.intLink').on 'click', (e) ->
        `var myOffset`
        `var goTo`
        myOffset = smint.height()
        e.preventDefault()
        hash = $(this).find('a').attr('href').split('#')[1]
        if smint.hasClass(fxd)
          goTo = $(mySelector + '.' + hash).position().top - myOffset
        else
          goTo = $(mySelector + '.' + hash).position().top - (myOffset * 2)
        $('html, body').stop().animate { scrollTop: goTo }, scrollSpeed
        if $(this).hasClass('extLink')
          return false
        return
      return

  $.fn.smint.defaults =
    'scrollSpeed': 500
    'mySelector': 'div'
  return
) jQuery