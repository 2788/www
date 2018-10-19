class EventsController < ApplicationController
  def index
    # @niushows = Event.where( category: 'NiuShow', is_top: true).limit(3)
    # @teches = Event.where( category: 'TechOnline', is_top: true).limit(3)
    # @ecugs = Event.where( category: 'ECUG', is_top: true).limit(3)
    redirect_to niudays_url
  end

  def tech_online
    @events = Event.where( category: 'TechOnline')
    @hero = "hero-tech"
    render "list"
  end

  def ecug
    @events = Event.where( category: 'ECUG')
    @hero = "hero-ecug"
    render "list"
  end

  def niushow
    @events = Event.where( category: 'NiuShow')
    @hero = "hero-niushow"
    render "list"
  end

  def arch
  end

  def ecugcon
    @events = Event.where( category: 'ECUG')
    render "ecugcon"
  end

  def free
  end

  def event1024
  end

  # 根据时间计算热度
  # 2018 年 1024 活动
  # https://jira.qiniu.io/browse/BO-5294
  def calc_heat
    # 活动开始时间 2018 年 10 月 24 日 00:00:00
    start_time = Time.local(2018, 10, 24)
    # 热度判定结束时间 2018 年 10 月 28 日 00:00:00
    end_time = Time.local(2018, 10, 28)
    # 当前时间
    current_time = Time.now
    # 活动未开始
    if current_time.to_i < start_time.to_i
      render json: {
        isValid: false,
        value: 0
      }
      return
    end
    # 活动已结束
    if current_time.to_i > end_time.to_i
      render json: {
        isValid: true,
        value: 1
      }
      return
    end

    pass_day = current_time.yday - start_time.yday
    heat_res = heat_function(pass_day)

    if heat_res < 0
      render json: {
        isValid: false,
        value: 0
      }
    end

    # 热度总量为 27
    # 转换为 float 型
    heat_all = 27.to_f
    render json: {
      isValid: true,
      value: (heat_res / heat_all).round(2)
    }
    return
  end

  # 计算热度的函数
  # pass_day: 活动已经开始的天数
  def heat_function(pass_day)
    # 结果转换为 float 型
    return (-(pass_day - 5) ** 2 + 28).to_f
  end
end
