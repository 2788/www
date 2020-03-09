$.fn.extend({doraProgressBar: function(opciones) {
  var doraProgressBar = this
  var doraProgressBarID = $(doraProgressBar).attr('id')
  var styleUnique = Date.now()
  var StringStyle = ''

  function tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n
  }

  var oDate = new Date()
  var oldTime = oDate.getTime()
  var newDate = new Date('2019/9/16 00:00:00')
  var newTime = newDate.getTime()
  var second = Math.floor((newTime - oldTime) / 1000)
  var day = Math.floor(second / 86400)
  var porcentajeTime = Number((1 - (tow(day) / 31)) * 100).toFixed(1)

  var defaults = {
    porcentaje: porcentajeTime,
    time: tow(day),
    tiempo: 1000,
    color: '',
    estilo: 'yoda',
    tamanio: '30%',
    alto: '6px'
  }

  var opciones = $.extend({}, defaults, opciones)
  if (opciones.color != '') {StringStyle = '<style>.color' + styleUnique + '{border-radius: 2px; display: block; width: 0%; box-shadow: 0px 0px 10px 1px ' + opciones.color + ', 0 0 1px ' + opciones.color + ', 0 0 1px ' + opciones.color + ', 0 0 1px ' + opciones.color + ', 0 0 1px ' + opciones.color + ', 0 0 1px ' + opciones.color + ', 0 0 1px ' + opciones.color + ';background-color: #FFF;}</style>'; opciones.estilo = 'color' + styleUnique;}

  $(doraProgressBar).before(StringStyle)
  $(doraProgressBar).append('<span class="barControl" style="width: ' + opciones.tamanio + ';"><div class="barContro_space"><span class="' + opciones.estilo + '" style="height: ' + opciones.alto + ';" id="bar' + doraProgressBarID + '"><div class="Transcoding-Progress-str"><div class="point-mark"></div><div class="clear"></div><div class="bottom">' + opciones.time + '天</div></div></span></div></span>')

  $('#bar' + doraProgressBarID).animate({width: opciones.porcentaje + '%'}, opciones.tiempo)

  this.mover = function(ntamanio) {
    $('#bar' + $(this).attr('id')).animate({width: ntamanio + '%'}, opciones.tiempo)
  }

  return this
}})
