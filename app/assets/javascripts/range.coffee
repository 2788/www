$.fn.RangeSlider = (cfg) ->
  @sliderCfg =
    callback: if cfg and cfg.callback then cfg.callback else null

  $input = $(this)
  callback = @sliderCfg.callback

  $input.each (index, item) ->
    val = $(item).attr('value')
    max = $(item).attr('max')
    $(item).css 'background-size', val / max * 100 + '% 100%'
    return

  $input.bind 'input', (e) ->
    $(this).attr 'value', @value
    $(this).css 'background-size', @value / @max * 100 + '% 100%' ;
    if $.isFunction(callback)
      callback this
    return
  return