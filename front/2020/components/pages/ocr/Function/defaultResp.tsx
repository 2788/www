import { OcrDemo } from 'apis/ocr/common'
import { IdCardResponse, CarBdResponse, BsResponse, NewCarResponse, CzResponse, InvoiceResponse } from 'apis/ocr/function'

const idCardRes = {
  errorcode: 0,
  errormsg: 'OK',
  warnmsg: [53091003],
  ocr_result: {
    side: 'F',
    idno: '430527199309204211',
    name: '张三',
    nation: '汉',
    gender: '男',
    address: '上海市浦东新区张江高科',
    birthdate: '19930920'
  },
  image_result: {
    idcard_bbox: [[10, 784], [10, 10], [1263, 10], [1263, 784]]
  },
  session_id: '1601294188.9444726'
} as IdCardResponse
const carBdRes = {
  errorcode: 0,
  errormsg: 'success',
  items: {
    保险公司: '中华联合保险',
    保单号码: '0113370900110332000295',
    被保险人: '',
    车主姓名: '',
    车主证件号码: '',
    'VIN码/车架号': 'LJU8824S2DS024773',
    车牌号码: '鲁',
    发动机号: 'D4X309524',
    使用性质: '家庭自用车',
    厂牌型号: '',
    投保确认时间: '2013-05-18',
    投保日期: '自2013年05月19日零时',
    限售: null,
    城市: null,
    投保险种: [
      '机动车损失保险',
      '第三者责任保险',
      '不计免赔率险'
    ],
    机动车损失险保额: '',
    第三者责任险保额: '',
    合计保费: '950.0 950.0',
    初次登记日期: '2013年05月18日',
    第一受益人: ''
  },
  session_id: 'a4b325a4-0181-11eb-8d87-0242ac110009'
} as CarBdResponse

const bsRes = {
  errorcode: 0,
  errormsg: 'OK',
  session_id: 'a4a7fb48-0181-11eb-8f11-0242ac110004',
  items: {
    has_head: true,
    has_tail: true,
    is_copy: true,
    credit_code: {
      value: '91310000580583950X',
      pos: {
        x: 423,
        y: 313,
        width: 105,
        height: 14
      }
    },
    name: {
      value: '上海七牛信息技术有限公司',
      pos: {
        x: 190,
        y: 351,
        width: 169,
        height: 18
      }
    },
    type: {
      value: '有限责任公司（自然人投资或控股）',
      pos: {
        x: 186,
        y: 371,
        width: 212,
        height: 18
      }
    },
    address: {
      value: '中国（上海）自由贸易试验区博霞路66号1- 5层',
      pos: {
        x: 186,
        y: 394,
        width: 264,
        height: 18
      }
    },
    legal_representative: {
      value: '许式伟',
      pos: {
        x: 186,
        y: 417,
        width: 42,
        height: 18
      }
    },
    found_date: {
      value: '2011年8月3日',
      pos: {
        x: 186,
        y: 463,
        width: 101,
        height: 18
      }
    },
    operation_term: {
      value: '2011年8月3日至2031年8月2日',
      pos: {
        x: 186,
        y: 490,
        width: 236,
        height: 14
      }
    },
    registered_capital: {
      value: '人民币5000.0000万元整',
      pos: {
        x: 186,
        y: 440,
        width: 157,
        height: 18
      }
    },
    business_scope: {
      value: '信息技术及计算机科技领域内的技术开发、技术转让、技术咨询.技术服务，计算机网络工程、网页设计制作，计算机系统集成计算机维修服务，计算机软件及辅助设备的销售，电信业务，院据处理服务，云平台服务，云软件服务，云基建设施服务，大皆据服务，人工智能公共服务平台，人工智能基感资源与技术平【依法须经批准的项目，经相关部门批准后方可开展经营活动',
      pos: {
        x: 186,
        y: 514,
        width: 288,
        height: 14
      }
    }
  }
} as BsResponse

const newCarRes = {
  errorcode: 0,
  errormsg: 'success',
  items: {
    print_code: {
      chinese_key: '机打代码',
      words: ''
    },
    print_no: {
      chinese_key: '机打号码',
      words: '00722838'
    },
    machine_no: {
      chinese_key: '机器编号',
      words: ''
    },
    invoice_date: {
      chinese_key: '开票日期',
      words: '2012 - 05 - 21'
    },
    invoice_code: {
      chinese_key: '发票代码',
      words: '121001121071'
    },
    invoice_no: {

      chinese_key: '发票号码',
      words: '00722838'
    },
    tax_code: {
      chinese_key: '税控码',
      words: ''
    },
    buyer_name: {
      chinese_key: '购方名称',
      words: ''
    },
    buyer_id: {
      chinese_key: '购买方身份证号或组织机构代码',
      words: '/组织机构代码'
    },
    buyer_tax_no: {
      chinese_key: '购方纳税人识别号',
      words: ''
    },
    vehicle_type: {
      chinese_key: '车辆类型',
      words: '多用途乘用车'
    },
    brand: {
      chinese_key: '厂牌型号',
      words: ''
    },
    production_addr: {
      chinese_key: '产地',
      words: '辽宁省'
    },
    cert_no: {
      chinese_key: '合格证号',
      words: ''
    },
    import_no: {
      chinese_key: '进口证明书号',
      words: ''
    },
    test_no: {
      chinese_key: '商检单号',
      words: ''
    },
    engine_no: {
      chinese_key: '发动机号码',
      words: '136B96'
    },
    vin: {
      chinese_key: '车辆识别代码',
      words: 'LFV3B28R1C3023336'
    },
    amount_big: {
      chinese_key: '价税合计大写',
      words: ''
    },
    amount_small: {
      chinese_key: '价税合计小写',
      words: '￥410.00'
    },
    seller_name: {
      chinese_key: '销方名称',
      words: '沈阳业乔新业汽车销售服务有限公司'
    },
    seller_tax_no: {
      chinese_key: '销方纳税人识别号',
      words: '210114573484030'
    },
    seller_address: {
      chinese_key: '销方地址',
      words: '沈阳市于洪区沈大路23号'
    },
    seller_phone: {
      chinese_key: '销方电话',
      words: ''
    },
    seller_bank_account: {
      chinese_key: '销方账号',
      words: ''
    },
    seller_bank: {
      chinese_key: '销方开户行',
      words: '建行沈阳于洪支行'
    },
    tax_amount: {
      chinese_key: '增值税税额',
      words: '￥59.58'
    },
    tax_rate: {
      chinese_key: '增值税税率',
      words: '17 %'
    },
    pretax_amount: {
      chinese_key: '不含价税小写',
      words: '￥350.42'
    },
    tax_gov_name: {
      chinese_key: '主管税务机关',
      words: '沈阳市于洪区国家税务局'
    },
    tax_gov_no: {
      chinese_key: '主管税务机关代码',
      words: '121011400'
    },
    sheet_type: {
      chinese_key: '联次',
      words: ''
    }
  },
  session_id: 'a4ab7ed0 - 0181 - 11eb - afae - 0242ac110008'
} as NewCarResponse

const czRes = {
  errorcode: 0,
  items: {
    页码: '第1页,第2',
    行驶证编号: 'FDFCBF7920FA0B3F1083901',
    机动车登记证书编号: '',
    '机动车所有人/身份证明名称/号码': [],
    登记机关: ['理所'],
    登记日期: [],
    机动车登记编号: ['沪BNS233'],
    '5.车辆类型': '小型普通客车',
    '6.车辆品牌': '6.车辆品牌凯迪拉支牌',
    '7.车辆型号': 'LSGNB83LXJA006795',
    '8.车身颜色': '',
    '9.车辆识别代号/车架号': '172355122',
    '10.国产/进口': '国产',
    '11.发动机号': '2857',
    '12.发动机型号': '1998',
    '13.燃料种类': '汽油',
    '15.制造厂名称': '上上汽通田汽车有限公司',
    '16.转向形式': '',
    '30.使用性质': '30.使用性质非营运',
    '31.车辆获得方式': '',
    '32.车辆出厂日期': '2017-08-25',
    '34.发证日期': '2017-09-26'
  },
  session_id: 'a4ae82ce-0181-11eb-8283-0242ac110008',
  errormsg: 'success'
} as CzResponse

const singleInvoiceRes: InvoiceResponse = {
  result: 1,
  message: 'success',
  response: {
    data: {
      identify_results: [
        {
          details: {
            code: '031002100411',
            number: '25096213',
            date: '2021年09月03日',
            pretax_amount: '6.56',
            tax: '0.20',
            check_code: '11631437361999467829',
            total: '6.76',
            seller: '上海滴滴畅行科技有限公司',
            seller_tax_id: '91310114MA1GW61J6U',
            buyer: '上海七牛信息技术有限公司',
            buyer_tax_id: '',
            company_seal: '1',
            form_type: '',
            kind: '交通',
            ciphertext: '039-9-*7/75+*+1934->+<580231,<869670609940<*1<731-+1>5950,><9-9-*7/75+*+1934>+-+-3/3+-,*8<5934--00123<2193*632*364<',
            machine_code: '499098504973',
            receiptor: '张雪丽',
            reviewer: '蔡静',
            issuer: '杜洪亮',
            province: '上海市',
            city: '',
            service_name: '运输服务',
            remark: '',
            item_names: '*运输服务*客运服务费,*运输服务*客运服务费',
            seller_addr_tel: '上海市静安区万荣路777弄12号202-7室022-59002850',
            seller_bank_account: '招商银行股份有限公司上海东方支行121932981110606',
            code_confirm: '031002100411',
            electronic_mark: '1',
            total_cn: '陆圆柒角陆分',
            vehicle_mark: '0'
          },
          extra: {
            barcode: [],
            check_code_candidates: [],
            check_code_last_six: [],
            number_order_error: [],
            qrcode: [
              '01,10,031002100411,25096213,6.56,20210903,11631437361999467829,F168,'
            ]
          },
          orientation: 0,
          type: '10102'
        }
      ]
    }
  }
}

const multipleInvoiceRes: InvoiceResponse = {
  result: 1,
  message: 'success',
  response: {
    data: {
      identify_results: [
        {
          details: {
            code: '031001600311',
            number: '21154005',
            date: '2016年10月27日',
            pretax_amount: '170.09',
            tax: '28.91',
            check_code: '49811982181998877848',
            total: '199.00',
            seller: '索尼(中国)有限公司上海分公司',
            seller_tax_id: '91310000X07256148A',
            buyer: '个人',
            buyer_tax_id: '',
            company_seal: '1',
            form_type: '',
            kind: '数码电器',
            ciphertext: '5614365<3/696+72*+>/*6<7+99,37165/1904-35/<834>/*>-<66>,6/-503+>1292/3646+53-+>543>,6-91-5<65/1904-35/<834>-53>',
            machine_code: '661613302481',
            receiptor: '周逸清',
            reviewer: '朱雯婕',
            issuer: '任思雨',
            province: '上海市',
            city: '',
            service_name: '',
            remark: '10226443649206302545,93088010701196741101105861882138476',
            item_names: '通话耳机',
            seller_addr_tel: '上海市卢湾区湖滨路222号企业天地一号8楼61216121',
            seller_bank_account: '花旗银行(中国)有限公司上海分行404003-1730642012',
            code_confirm: '031001600311',
            electronic_mark: '1',
            total_cn: '壹佰玖拾玖圆整',
            vehicle_mark: '0'
          },
          extra: {
            check_code_candidates: [],
            check_code_last_six: [],
            number_order_error: []
          },
          orientation: 0,
          region: [
            0,
            346,
            592,
            776
          ],
          type: '10102'
        },
        {
          details: {
            code: '033001700211',
            number: '56894556',
            date: '2018年01月08日',
            pretax_amount: '66.97',
            tax: '0.03',
            check_code: '59838459272440005323',
            total: '67.00',
            seller: '浙江外企德科人力资源服务有限公司',
            seller_tax_id: '91330100552660066F',
            buyer: '支付宝(中国)网络技术有限公司',
            buyer_tax_id: '91310115768225450T',
            company_seal: '1',
            form_type: '',
            kind: '服务',
            ciphertext: '+>9>0417/18>975584//852**+9,4><557*>60++24+2>>><42/33>+,76>3/-9631823<829710+5*5832,*/252/*41>-7702<00-3-->*/++',
            machine_code: '661620034630',
            receiptor: '外企德科',
            reviewer: '周莉国',
            issuer: '宋凯悦',
            province: '浙江省',
            city: '',
            service_name: '',
            remark: '差额征税: 66.46。',
            item_names: '劳务费-代驾',
            seller_addr_tel: '杭州市江干区钱潮路369号智谷人才广场8楼0571-87233885',
            seller_bank_account: '上海浦东发展银行杭州高新支行95130154800003964',
            code_confirm: '033001700211',
            electronic_mark: '1',
            total_cn: '陆拾柒圆整',
            vehicle_mark: '0'
          },
          extra: {
            check_code_candidates: [],
            check_code_last_six: [],
            number_order_error: [],
            qrcode: [
              '01,10,033001700211,56894556,66.97,20180108,59838459272440005323,FB60,'
            ]
          },
          orientation: 0,
          region: [
            0,
            0,
            592,
            425
          ],
          type: '10102'
        }
      ]
    }
  }
}

export default function defaultResponse(name: OcrDemo) {
  switch (name) {
    case OcrDemo.IdCard:
      return idCardRes
    case OcrDemo.CarBd:
      return carBdRes
    case OcrDemo.Bs:
      return bsRes
    case OcrDemo.NewCar:
      return newCarRes
    case OcrDemo.Cz:
      return czRes
    case OcrDemo.singleInvoice:
      return singleInvoiceRes
    case OcrDemo.multipleInvoice:
      return multipleInvoiceRes
    default:
      return idCardRes
  }
}
