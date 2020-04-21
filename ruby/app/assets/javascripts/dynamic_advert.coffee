$(document).ready ->
  $indexAdvertContainer = $('.welcome-page-index .features.features-advert-index')

  prependAdvert = (list) ->
    if $indexAdvertContainer.length > 0
      list.map (advert) ->
        if !advert?
          return null

        subscriptStr = ''
        if advert.subscript_name
          subscriptStr = """
            <span
              class="advert-tip"
              style="background-color: #{ advert.subscript_color || "#FF5928" }">
              #{ advert.subscript_text || "NEW" }
            </span>
          """

        jumpLink = advert.url || ''
        advertStr = """
          <div class="advert-body">
            <h4 class="advert-heading">
              #{ advert.title || "" }#{ subscriptStr }
            </h4>
            <p class="hidden-xs">
              #{ advert.subtitle || "" }
            </p>
          </div>
        """

        if jumpLink
          advertStr = """
            <a
              class="dynamic-advert-link"
              href=#{ jumpLink || "" }
              target="_blank">
              #{ advertStr }
            </a>
          """

        return $indexAdvertContainer.find('table tbody tr').append("""
          <td title=#{ advert.subtitle || "" }>
            #{ advertStr }
          </td>
        """)

  if $indexAdvertContainer.length > 0
    uuid = generateUUID()
    timestamp = new Date().getTime()
    $.ajax
      method: 'GET',
      url: '/advert/dynamic?u=' + uuid + '&t=' + timestamp,
      success: (res) ->
        if res && res.is_success && res.data && res.data.length > 0
          prependAdvert res.data
