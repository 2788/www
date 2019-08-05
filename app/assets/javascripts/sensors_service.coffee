do (window, document) ->

  track = (eventName, options) ->
    if !sensors?
      return
    if typeof sensors.track != 'function'
      return

    sensors.track eventName, options

  # API
  sensorsService =
    track: track
  window.sensorsService = sensorsService

  return