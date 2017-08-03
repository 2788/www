###!
# jQuery cxSelect
# @name jquery.cxselect.js
# @version 1.4.1
# @date 2016-11-02
# @author ciaoca
# @email ciaoca@gmail.com
# @site https://github.com/ciaoca/cxSelect
# @license Released under the MIT license
###

((factory) ->
  if typeof define == 'function' and define.amd
    define [ 'jquery' ], factory
  else
    factory window.jQuery or window.Zepto or window.$
  return
) ($) ->

  cxSelect = ->
    self = this
    dom = undefined
    settings = undefined
    callback = undefined
    # 分配参数
    i = 0
    l = arguments.length
    while i < l
      if cxSelect.isJquery(arguments[i]) or cxSelect.isZepto(arguments[i])
        dom = arguments[i]
      else if cxSelect.isElement(arguments[i])
        dom = $(arguments[i])
      else if typeof arguments[i] == 'function'
        callback = arguments[i]
      else if typeof arguments[i] == 'object'
        settings = arguments[i]
      i++
    api = new (cxSelect.init)(dom, settings)
    if typeof callback == 'function'
      callback api
    api

  cxSelect.isElement = (o) ->
    if o and (typeof HTMLElement == 'function' or typeof HTMLElement == 'object') and o instanceof HTMLElement
      true
    else
      if o and o.nodeType and o.nodeType == 1 then true else false

  cxSelect.isJquery = (o) ->
    if o and o.length and (typeof jQuery == 'function' or typeof jQuery == 'object') and o instanceof jQuery then true else false

  cxSelect.isZepto = (o) ->
    if o and o.length and (typeof Zepto == 'function' or typeof Zepto == 'object') and Zepto.zepto.isZ(o) then true else false

  cxSelect.getIndex = (n, required) ->
    if required then n else n - 1

  cxSelect.getData = (data, space) ->
    if typeof space == 'string' and space.length
      space = space.split('.')
      i = 0
      l = space.length
      while i < l
        data = data[space[i]]
        i++
    data

  cxSelect.init = (dom, settings) ->
    self = this
    if !cxSelect.isJquery(dom) and !cxSelect.isZepto(dom)
      return
    theSelect = dom: box: dom
    self.attach = cxSelect.attach.bind(theSelect)
    self.detach = cxSelect.detach.bind(theSelect)
    self.setOptions = cxSelect.setOptions.bind(theSelect)
    self.clear = cxSelect.clear.bind(theSelect)

    theSelect.changeEvent = ->
      cxSelect.selectChange.call theSelect, @className
      return

    theSelect.settings = $.extend({}, $.cxSelect.defaults, settings,
      url: theSelect.dom.box.data('url')
      emptyStyle: theSelect.dom.box.data('emptyStyle')
      required: theSelect.dom.box.data('required')
      firstTitle: theSelect.dom.box.data('firstTitle')
      firstValue: theSelect.dom.box.data('firstValue')
      jsonSpace: theSelect.dom.box.data('jsonSpace')
      jsonName: theSelect.dom.box.data('jsonName')
      jsonValue: theSelect.dom.box.data('jsonValue')
      jsonSub: theSelect.dom.box.data('jsonSub'))
    _dataSelects = theSelect.dom.box.data('selects')
    if typeof _dataSelects == 'string' and _dataSelects.length
      theSelect.settings.selects = _dataSelects.split(',')
    self.setOptions()
    self.attach()
    # 使用独立接口获取数据
    if !theSelect.settings.url and !theSelect.settings.data
      cxSelect.start.apply theSelect
      # 设置自定义数据
    else if $.isArray(theSelect.settings.data)
      cxSelect.start.call theSelect, theSelect.settings.data
      # 设置 URL，通过 Ajax 获取数据
    else if typeof theSelect.settings.url == 'string' and theSelect.settings.url.length
      $.getJSON theSelect.settings.url, (json) ->
        cxSelect.start.call theSelect, json
        return
    return

  # 设置参数

  cxSelect.setOptions = (opts) ->
    self = this
    if opts
      $.extend self.settings, opts
    # 初次或重设选择器组
    if !$.isArray(self.selectArray) or !self.selectArray.length or opts and opts.selects
      self.selectArray = []
      if $.isArray(self.settings.selects) and self.settings.selects.length
        _tempSelect = undefined
        i = 0
        l = self.settings.selects.length
        while i < l
          _tempSelect = self.dom.box.find('select.' + self.settings.selects[i])
          if !_tempSelect or !_tempSelect.length
            break
          self.selectArray.push _tempSelect
          i++
    if opts
      if !$.isArray(opts.data) and typeof opts.url == 'string' and opts.url.length
        $.getJSON self.settings.url, (json) ->
          cxSelect.start.call self, json
          return
      else
        cxSelect.start.call self, opts.data
    return

  # 绑定

  cxSelect.attach = ->
    self = this
    if !self.attachStatus
      self.dom.box.on 'change', 'select', self.changeEvent
    if typeof self.attachStatus == 'boolean'
      cxSelect.start.call self
    self.attachStatus = true
    return

  # 移除绑定

  cxSelect.detach = ->
    self = this
    self.dom.box.off 'change', 'select', self.changeEvent
    self.attachStatus = false
    return

  # 清空选项

  cxSelect.clear = (index) ->
    self = this
    _style =
      display: ''
      visibility: ''
    index = if isNaN(index) then 0 else index
    # 清空后面的 select
    i = index
    l = self.selectArray.length
    while i < l
      self.selectArray[i].empty().prop 'disabled', true
      if self.settings.emptyStyle == 'none'
        _style.display = 'none'
      else if self.settings.emptyStyle == 'hidden'
        _style.visibility = 'hidden'
      self.selectArray[i].css _style
      i++
    return

  cxSelect.start = (data) ->
    self = this
    if $.isArray(data)
      self.settings.data = cxSelect.getData(data, self.settings.jsonSpace)
    if !self.selectArray.length
      return
    # 保存默认值
    i = 0
    l = self.selectArray.length
    while i < l
      if typeof self.selectArray[i].attr('data-value') != 'string' and self.selectArray[i][0].options.length
        self.selectArray[i].attr 'data-value', self.selectArray[i].val()
      i++
    if self.settings.data or typeof self.selectArray[0].data('url') == 'string' and self.selectArray[0].data('url').length
      cxSelect.getOptionData.call self, 0
    else
      self.selectArray[0].prop('disabled', false).css
        'display': ''
        'visibility': ''
    return

  # 获取选项数据

  cxSelect.getOptionData = (index) ->
    `var i`
    self = this
    if typeof index != 'number' or isNaN(index) or index < 0 or index >= self.selectArray.length
      return
    _indexPrev = index - 1
    _select = self.selectArray[index]
    _selectData = undefined
    _valueIndex = undefined
    _dataUrl = _select.data('url')
    _jsonSpace = if typeof _select.data('jsonSpace') == 'undefined' then self.settings.jsonSpace else _select.data('jsonSpace')
    _query = {}
    _queryName = undefined
    _selectName = undefined
    _selectValue = undefined
    cxSelect.clear.call self, index
    # 使用独立接口
    if typeof _dataUrl == 'string' and _dataUrl.length
      if index > 0
        i = 0
        j = 1
        while i < index
          _queryName = self.selectArray[j].data('queryName')
          _selectName = self.selectArray[i].attr('name')
          _selectValue = self.selectArray[i].val()
          if typeof _queryName == 'string' and _queryName.length
            _query[_queryName] = _selectValue
          else if typeof _selectName == 'string' and _selectName.length
            _query[_selectName] = _selectValue
          i++
          j++
      $.getJSON _dataUrl, _query, (json) ->
        _selectData = cxSelect.getData(json, _jsonSpace)
        cxSelect.buildOption.call self, index, _selectData
        return
      # 使用整合数据
    else if self.settings.data and typeof self.settings.data == 'object'
      _selectData = self.settings.data
      i = 0
      while i < index
        _valueIndex = cxSelect.getIndex(self.selectArray[i][0].selectedIndex, if typeof self.selectArray[i].data('required') == 'boolean' then self.selectArray[i].data('required') else self.settings.required)
        if typeof _selectData[_valueIndex] == 'object' and $.isArray(_selectData[_valueIndex][self.settings.jsonSub]) and _selectData[_valueIndex][self.settings.jsonSub].length
          _selectData = _selectData[_valueIndex][self.settings.jsonSub]
        else
          _selectData = null
          break
        i++
      cxSelect.buildOption.call self, index, _selectData
    return

  # 构建选项列表

  cxSelect.buildOption = (index, data) ->
    `var i`
    `var l`
    self = this
    _select = self.selectArray[index]
    _required = if typeof _select.data('required') == 'boolean' then _select.data('required') else self.settings.required
    _firstTitle = if typeof _select.data('firstTitle') == 'undefined' then self.settings.firstTitle else _select.data('firstTitle')
    _firstValue = if typeof _select.data('firstValue') == 'undefined' then self.settings.firstValue else _select.data('firstValue')
    _jsonName = if typeof _select.data('jsonName') == 'undefined' then self.settings.jsonName else _select.data('jsonName')
    _jsonValue = if typeof _select.data('jsonValue') == 'undefined' then self.settings.jsonValue else _select.data('jsonValue')
    if !$.isArray(data)
      return
    _html = if !_required then '<option value="' + String(_firstValue) + '">' + String(_firstTitle) + '</option>' else ''
    # 区分标题、值的数据
    if typeof _jsonName == 'string' and _jsonName.length
      # 无值字段时使用标题作为值
      if typeof _jsonValue != 'string' or !_jsonValue.length
        _jsonValue = _jsonName
      i = 0
      l = data.length
      while i < l
        _html += '<option value="' + String(data[i][_jsonValue]) + '">' + String(data[i][_jsonName]) + '</option>'
        i++
      # 数组即为值的数据
    else
      i = 0
      l = data.length
      while i < l
        _html += '<option value="' + String(data[i]) + '">' + String(data[i]) + '</option>'
        i++
    _select.html(_html).prop('disabled', false).css
      'display': ''
      'visibility': ''
    # 初次加载设置默认值
    if typeof _select.attr('data-value') == 'string'
      _select.val(String(_select.attr('data-value'))).removeAttr 'data-value'
      if _select[0].selectedIndex < 0
        _select[0].options[0].selected = true
    if _required or _select[0].selectedIndex > 0
      _select.trigger 'change'
    return

  # 改变选择时的处理

  cxSelect.selectChange = (name) ->
    self = this
    if typeof name != 'string' or !name.length
      return
    index = undefined
    name = name.replace(/\s+/g, ',')
    name = ',' + name + ','
    # 获取当前 select 位置
    i = 0
    l = self.selectArray.length
    while i < l
      if name.indexOf(',' + self.settings.selects[i] + ',') > -1
        index = i
        break
      i++
    if typeof index == 'number' and index > -1
      index += 1
      cxSelect.getOptionData.call self, index
    return

  $.cxSelect = ->
    cxSelect.apply this, arguments

  # 默认值
  $.cxSelect.defaults =
    selects: []
    url: null
    data: null
    emptyStyle: null
    required: false
    firstTitle: '请选择'
    firstValue: ''
    jsonSpace: ''
    jsonName: 'n'
    jsonValue: ''
    jsonSub: 's'

  $.fn.cxSelect = (settings, callback) ->
    @each (i) ->
      $.cxSelect this, settings, callback
      return
    this

  return
