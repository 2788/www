do (window, document) ->

  track = (eventName, options) ->
    if !sensors?
      return
    if typeof sensors.track != 'function'
      return

    location = window.location
    # 默认附加 $url $url_path 字段
    options['$url'] = location.href
    options['$url_path'] = location.pathname
    sensors.track eventName, options

  # API
  sensorsService =
    track: track
  window.sensorsService = sensorsService

  return