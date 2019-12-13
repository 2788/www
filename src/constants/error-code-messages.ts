/*
* @file api error code messgaes
* @author jiayizhen <jiayizhen@qiniu.com>
*/

export const helpWords = '请创建工单获取帮助'

export default {
  '0': '未知错误',
  '400': '请求参数错误',
  '401': '未登录，请重新登录',
  '403': '没有权限',
  '404': '资源不存在',
  '429': '请求次数过多，请稍后重试',
  '500': '请求失败',
  '598': '获取数据出错',
  '599': '非法请求',

  '5000': '网络连接失败，请稍后重试',
  '5100': '账户或密码错误',
  '5101': '登录失败，请稍后重试',
  '5102': '尝试次数过多，请稍后再试',
  '5103': '登录信息有误，请重试',
  '5105': '请先进行权限验证',
  '5200': '用户余额获取失败',
  '4435': '优惠码信息获取出错',
  '7000': '抵用券充值成功，但用户操作日志记录失败',
  '7001': '获取工单列表失败',
  '7002': '请先激活邮箱及绑定手机',
  '7003': '邮箱已存在',
  '7004': '服务不可用',
  '7005': '服务器错误',
  '7100': '两步验证码无效',
  '7101': '两步验证恢复码不存在',
  '7102': '请输入 TOTP 验证码',
  '7103': '请输入手机验证码',
  '7201': '手机验证短信发送次数过多',
  '7202': '手机验证短信发送失败',
  '7203': '验证码已过期',
  '7204': '验证码错误',
  '7205': '验证码尝试次数过多',
  '7206': '重试密码次数过多，请稍后重试',
  '7207': '密码错误',
  '7208': '用于验证的手机号码错误',
  '7209': '请填写图片验证码',
  '7210': '图片验证码错误',
  '7300': '当前密码不正确',
  '7301': '新密码与旧密码相同',
  '7302': '获取子账户信息失败',
  '7303': '新手机号码与旧手机号码相同',
  '7304': '手机号码未绑定',
  '7305': '旧手机号码错误',
  '7306': '手机号已达最大绑定次数',
  '7307': '账号已绑定手机',
  '7310': '每月只可更换邮箱一次',
  '7311': '黑名单邮箱',
  '7312': '邮箱已被占用',
  '7313': '邮箱已激活',
  '7320': '邀请邮件发送次数超过限制',
  '7321': '无可用邀请规则',
  '7331': '该账号已绑定其他第三方账号',
  '7333': '第三方账号绑定失败',
  '7335': '第三方账号登录失败',
  '7336': '第三方账号认证失败',
  '7337': '该第三方账号已被其他账号绑定',
  '7340': '此账户不存在',
  '7341': '重置密码邮件发送次数过多',
  '7342': '无效 token',
  '7343': '重置密码邮件已失效',
  '7344': '重置密码邮件已使用',
  '7350': '身份认证已存在',
  '7351': '身份证已被使用',
  '7352': '营业执照号码已被使用',
  '7353': '组织机构代码已被使用',
  '7354': '身份认证信息不可编辑',
  '7355': '您的支付宝未实名认证，请先到支付宝实名认证',
  '7356': '支付宝实名认证成功',
  '7357': '支付宝实名认证已被使用',
  '7358': '身份认证信息已存在',
  '7359': '身份认证信息不存在',
  '7360': '社会信用代码已被使用',
  '7361': '当前用户类型不可升级',
  '7400': '发送邮件太过频繁',
  '7500': '获取子账号失败',
  '7700': '用户余额获取失败',
  '7701': '无效的验证码',
  '7702': '抵用券充值成功，但通知用户失败',
  '7710': '未实名认证用户不能使用抵用券',
  '7711': '抵用券激活失败',
  '7712': '获取已激活抵用券失败',
  '7713': '获取过期抵用券失败',
  '7714': '抵用券已激活过',
  '7715': '抵用券过期',
  '7716': '抵用券不存在',
  '7717': '已使用过此类型抵用券',
  '7720': '获取账单列表失败',
  '7721': '获取账单详情失败',
  '7722': '获取合账账单失败',
  '7730': '无效的储值卡',
  '7731': '无效的优惠码',
  '7732': '储值卡已过期',
  '7733': '储值卡充值失败',
  '7734': '储值卡状态更新失败',
  '7735': '获取优惠码信息失败',
  '7736': '优惠码已过期',
  '7740': '获取发票列表失败',
  '7741': '获取发票信息失败',
  '7742': '创建发票信息失败',
  '7743': '获取可开发票的流水失败',
  '7744': '获取发票设置信息失败',
  '7745': '更新发票设置信息失败',
  '7746': '更新发票信息失败',
  '7750': '获取现金余额失败',
  '7751': '获取抵用券余额失败',
  '7752': '获取预期消费失败',
  '7753': '获取用户免费额度使用情况失败',
  '7754': '获取用户流水失败',
  '7755': '获取用户当前花费失败',
  '7756': '获取用户消费概览失败',
  '7760': '获取用户价格表失败',
  '7761': '获取用户优惠项失败'
}
