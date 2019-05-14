class DownloadController < ApplicationController
  def index
  end

  def snow_white_paper
    @product = "snow"
    @path = request.original_fullpath
    render "index"
  end

  def plsv_white_paper
    @product = "plsv"
    @path = request.original_fullpath
    render "index"
  end

  def kodo_white_paper
    @product = "kodo"
    @path = request.original_fullpath
    render "index"
  end

  def atlab_white_paper
    @product = "atlab"
    @path = request.original_fullpath
    render "index"
  end

  def rtn_white_paper
    @product = "rtn"
    @path = request.original_fullpath
    render "index"
  end

  def kodoe_white_paper
    @product = "kodoe"
    @path = request.original_fullpath
    render "index"
  end

  def pili_white_paper
    @product = "pili"
    @path = request.original_fullpath
    render "index"
  end

  def qavs_white_paper
    @product = "qavs"
    @path = request.original_fullpath
    render "index"
  end

end