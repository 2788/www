function commonProgress(options) {
  this.w = (options && options.width) ? parseFloat(options.width) : parseFloat(this.options.width)
  this.h = (options && options.height) ? parseFloat(options.height) : parseFloat(this.options.height)
  this.bgColor = (options && options.bgColor) ? options.bgColor: this.options.bgColor
  this.proColor = (options && options.proColor) ? options.proColor: this.options.proColor
  this.fontColor = (options && options.fontColor) ? options.fontColor: this.options.fontColor
  this.showPresent = (options && options.showPresent != undefined) ? options.showPresent: this.options.showPresent
  this.completeCallback = (options && options.completeCallback) ? options.completeCallback: this.options.completeCallback
  this.changeCallback = (options && options.changeCallback) ? options.changeCallback: this.options.changeCallback
  this.text = (options && options.text) ? options.text: this.options.text
  this.val = (options && options.val) ? options.val: this.options.val
  this.strTemp = this.text.substring(0, this.text.indexOf('#*')) + '{{pro}}' + this.text.substring(this.text.indexOf('*#') + 2)
  this.init()
}

commonProgress.prototype.options = {
  width: 200,
  height: 30,
  bgColor: '#FFF',
  proColor: '#009988',
  fontColor: '#FFF',
  val: 10,
  text: '',
  showPresent: true,
  completeCallback: function() {},
  changeCallback: function() {}
}

commonProgress.prototype.init = function() {
  this.proBox = document.createElement('div')
  this.proBg = document.createElement('div')
  this.proPre = document.createElement('div')
  this.proFont = document.createElement('div')

  commonProgressAddClass(this.proBox, 'proBox')
  commonProgressAddClass(this.proBg, 'proBg')
  commonProgressAddClass(this.proPre, 'proPre')
  commonProgressAddClass(this.proFont, 'proFont')

  this.proBox.setAttribute('style', 'width: ' + this.w + '%; margin: auto; height: ' + this.h + 'rem; position: relative; overflow: hidden;')
  this.proBg.setAttribute('style', 'background-color: ' + this.bgColor + '; position: absolute; z-index: 1; width: 100%; height: 100%; top: 0; left: 0;')
  this.proPre.setAttribute('style', 'transition: all 150ms; -moz-transition: all 150ms; -webkit-transition: all 150ms; -o-transition: all 150ms; width: ' + this.val + '%; height: 100%; position: absolute; z-index: 2; top: 0; left: 0;')

  if (this.showPresent) {
    var text = this.parseText()
    this.proFont.innerHTML = text
    this.proFont.setAttribute('title', text)
    this.proBox.appendChild(this.proFont)
  }

  this.proBox.appendChild(this.proBg)
  this.proBox.appendChild(this.proPre)
}


commonProgress.prototype.refresh = function() {
  this.proPre.style.width = this.val + '%'
  this.proFont.innerHTML = this.parseText()
}


commonProgress.prototype.parseText = function() {
  this.text = this.strTemp.replace('{{pro}}', this.val)
  return this.text
}


commonProgress.prototype.update = function(val) {
  this.val = val
  this.refresh()

  this.changeCallback.call(this, val)
  if (val == 100) {
    this.completeCallback.call(this, val)
  }
}

commonProgress.prototype.getBody = function() {
  return this.proBox
}

commonProgress.prototype.getVal = function() {
  return this.val
}

function commonProgressHasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

function commonProgressAddClass(obj, cls) {
  if (!this.commonProgressHasClass(obj, cls)) obj.className += ' ' + cls
}

function commonProgressRemoveClass(obj, cls) {
  if (commonProgressHasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    obj.className = obj.className.replace(reg, ' ')
  }
}

function commonProgressToggleClass(obj, cls) {
  if (commonProgressHasClass(obj, cls)) {
    commonProgressRemoveClass(obj, cls)
  } else {
    commonProgressAddClass(obj, cls)
  }
}
