class DownloadController < ApplicationController
  def index
  end

  def snow_white_paper
    @product = "snow"
    render "index"
  end

  def plsv_white_paper
    @product = "plsv"
    render "index"
  end

  def kodo_white_paper
    @product = "kodo"
    render "index"
  end

  def atlab_white_paper
    @product = "atlab"
    render "index"
  end

  def rtn_white_paper
    @product = "rtn"
    render "index"
  end

  def kodoe_white_paper
    @product = "kodoe"
    render "index"
  end

  def pili_white_paper
    @product = "pili"
    render "index"
  end

  def qavs_white_paper
    @product = "qavs"
    render "index"
  end

end