// cdn 公共静态资源

export enum Logo {
  White = 'https://qiniu.com/assets/logo-white-18da5fcb02f4aa87dacbf4451a7356b6179baebc96ae77cf24f607c98d12d100.png',
  Blue = 'https://www.qiniu.com/assets/logo-zh-dbef5f389fb045c60f710d4d4e6225e9015c1684b1a1f7b81e000b952581dcd4.png'
}

export const tagIcons = {
  hot: 'https://qiniu.com/assets/icon-hot-60f1386656f91155b2ac4a981c27d57819ae41e90ea2cad09339688a458dcdad.png',
  new: 'https://www.qiniu.com/assets/icon-new-2dbd5c4283e72ca916eb7f9202bc56a9edca2d3da357f1a5a64d0f15179fb9ef.png'
} as const

export const menuIcons = {
  kodo: 'https://www.qiniu.com/assets/menuicon-duixiangcunchu@2x-81aafe89655ebedcddea5da677273be8ba4a5d28bdb0c55e306828f654e1e6f7.png',
  kodoPrivate: 'https://www.qiniu.com/assets/menuicon-duixiangcunchusiyouhua@2x-987a1e8933a55b9a4302cdc42039bb8911bfae2a40781f4ca82f7984a1063f20.png',
  cdn: 'https://www.qiniu.com/assets/menuicon-rongheyouzhijiedian@2x-58da12206918963242b9fd27e9999b9aa8f8a0fa5e700c83fba2bc9e54a36bfd.png',
  qvm: 'https://www.qiniu.com/assets/menuicon-yunzhuji@2x-b9770d9df0293b9dd45b742eb0f78957a0a25d3e4e9ed83ae1bc0cbdfecd611a.png',
  sms: 'https://www.qiniu.com/assets/menuicon-yunduanxin@2x-eaf20f04df96e1679a880758d31e7acbb4a533371853f6f18cccd53e7a995b5f.png',
  edgeComputing: 'https://www.qiniu.com/assets/menuicon-bianyuanjisuan@2x-dcf9f5bd7a2643c2685d1b0abbdbac32a9576c769985f46575647c6363ee5543.png',
  ssl: 'https://www.qiniu.com/assets/menuicon-ssl@2x-4061db3182a16d6a26bde55b41336eca9ae7ac821524073c6ccc363aab0eadba.png',
  atlab: 'https://www.qiniu.com/assets/menuicon-jiqixuexi@2x-36a27b10763467dd0f3d759a3303515dd6a5a929d2c72872c2ca99538ee5885f.png',
  pandora: 'https://www.qiniu.com/assets/menuicon-dashuju@2x-af6e9fff15935f7c6954eb9af0b1ca0ef1275937fa34d435cf04a6402e1e5ae5.png',
  censor: 'https://www.qiniu.com/assets/menuicon-neirongshenhe-8f88e58049765cd1398ce486f6af0fad4b227f740783c0bc568b2970fc2c62ce.png',
  insight: 'https://www.qiniu.com/assets/menuicon-zhinengrizhi-9eeda9046f1f4ae6d2f5c46e2c253822a1cf92ff071b10c8ee8a1a74ad10a31c.png',
  express: 'https://www.qiniu.com/assets/menuicon-zhinengrizhi-9eeda9046f1f4ae6d2f5c46e2c253822a1cf92ff071b10c8ee8a1a74ad10a31c.png',
  dora: 'https://www.qiniu.com/assets/menuicon-shujuchuli@2x-57367d658d02945a970aa9344652878f9eb434fb54fc9a1c7d512845e7f0b80c.png',
  pili: 'https://www.qiniu.com/assets/menuicon-shipinzhibo@2x-8f6b4d8e205d172a3034fc8463d9c9b65252412c43de365dd4238a35a8c9db87.png',
  rtn: 'https://www.qiniu.com/assets/menuicon-shishiyinshipinyun@2x-e0f04f9d78479bc6f0a2291e0a2c53b922565eedb313cc7cd7573eb321c342c1.png',
  plsv: 'https://www.qiniu.com/assets/menuicon-duanshipin@2x-4db1a3ce26e096d4966c0766539371010270b4868a1b03b05a6d58d08677f7f3.png',
  newmedia: 'https://www.qiniu.com/assets/menuicon-guangdianchuanmei@2x-3ba8e9f619f21873a15681fe64de58008db504ec8d17f45fbfa9669918ae0324.png',
  svesdk: 'https://www.qiniu.com/assets/menuicon-duanshipin@2x-4db1a3ce26e096d4966c0766539371010270b4868a1b03b05a6d58d08677f7f3.png',
  ess: 'https://www.qiniu.com/assets/menuicon-bianyuancunchu-5987bc9333faf3c0a350bd18a54ba481eba8280f58d0c044d8550d2cf9a87cfc.png',
  player: 'https://www.qiniu.com/assets/menuicon-bofangqijiejuefangan@2x-0b0f19fce76a861c5703cf0b42ec5d3966b37a51a44cb57e9ff6ded11f965691.png',
  ecs: 'https://www.qiniu.com/assets/menuicon-bianyuancunchu-5987bc9333faf3c0a350bd18a54ba481eba8280f58d0c044d8550d2cf9a87cfc.png',
  vcs: 'https://www.qiniu.com/assets/menuicon-shipinlengdongcunchu-c7d4522620b9c6c7f225dcd41903de70816987822c29fa6caa25b9c5ea52afb9.png',
  intelligence: 'https://www.qiniu.com/assets/menuicon-zhinengyingjian@2x-a84b424a28a6050012d20a730949f9f22c078c413cada556e5ebb16e1abd1730.png',
  qavs: 'https://www.qiniu.com/assets/menuicon-zhinengshipinyun-6c9cdde08f13bfeae82e05eec7fca955b750d06d956519191837cbb0c6a261d3.png',
  internet: 'https://www.qiniu.com/assets/menuicon-hulianwang@2x-146312cfba6c03f489002b4455c3cd44b905be82aeabb7416a321ef64ec94abc.png',
  qualityctrl: 'https://www.qiniu.com/assets/menuicon-yingyongzhiliangjiankong@2x-e4383b421671b9e07288a78606d26c9cb86e75ca0d540a5806ee7a00d755bfdb.png',
  livequiz: 'https://www.qiniu.com/assets/menuicon-zhibojingda-427e8b90a15bf53b3f03c8861c24079871c950e5192021cdab7066d5c1f95ee1.png',
  kodoe: 'https://www.qiniu.com/assets/menuicon-siyouyunhangyejiejuefangan-d0d5b6b88ca8fe8199ffffb425b3db419f8ca3eae8dbcc39318586cb90fe926c.png',
  partner: 'https://www.qiniu.com/assets/icon-yunzhujihehuoren-5e4173112a52b818e779157c8cb184abdc153f6fb35e6f446fedfeeb3a705ed2.png',
  arch: 'https://www.qiniu.com/assets/icon-jiagoushi-45d9361a0524651dde3e09c40b0c8a62a1f89e4aebc53464b8094c5ca7e86e8c.png',
  ecug: 'https://www.qiniu.com/assets/icon-ecug-8aaa21f9b2c39c657ba3d668822460b274575f2d27024aab903236caa06ab95c.png',
  goglobal: 'https://www.qiniu.com/assets/icon-chuhai-522e232a6b646f57f6d63c1f673edc2508603bfa8f0f215cb6ceeaadea9f6e12.png',
} as const
