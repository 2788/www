class ResourcesController < ApplicationController

  # https://www.qiniu.com/resources/plup
  def plup
    @top_archives = Archive.top_archives
  end

end
