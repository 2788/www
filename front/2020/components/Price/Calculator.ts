// 规则按区域划分
export type CalcRule = {
  // 地区名字(给人看的)
  desc: string
  // 地区代码(随便组织，代码逻辑用)
  region: string
  items: CalcRuleItem[]
}

// 计费项
export type CalcRuleItem = {
  // name 不是唯一，同一个数组存在多个相同的计费项，但是价格不同
  name: string
  // 备注用，没其他用途
  desc?: string
  // 单价
  price: number
  // 阈值，超出的部分才计价
  threshold?: number
  min: number
  max: number
}

export type CalcInput = {
  region: string
  desc: string
  items: InputItem[]
}

export type InputItem = {
  name: string
  count: number
  unit: Unit
}

function matchRuleItem(ruleItem: CalcRuleItem, inputItem: InputItem, unitAdaptor: UnitAdaptor) {
  const gbCount = unitAdaptor.toGB(inputItem.count, inputItem.unit)
  // 不同的计费项的计费规则可能是一样的，需要判断计费项是不是一样
  if (inputItem.name === ruleItem.name && gbCount >= ruleItem.min && gbCount < ruleItem.max) {
    return true
  }

  return false
}

export default class Calculator {
  static fromRules(rules: CalcRule[]) {
    return new Calculator(rules)
  }

  private listeners: Array<(total: string) => void> = []
  // 使用时间 天/月
  private duration = 1
  private inputs: CalcInput[] = []
  private unitAdaptor = new UnitAdaptor()

  constructor(private rules: CalcRule[]) { }

  public getInputs() {
    return this.inputs
  }

  public addInput(input: CalcInput) {
    this.inputs.push(input)
    this.trigger()
  }

  public setInput = (nextInput: CalcInput) => {
    const current = this.inputs.findIndex(input => input.region === nextInput.region)
    if (current === -1) {
      this.addInput(nextInput)
    } else {
      this.inputs[current] = nextInput
      this.trigger()
    }
  }

  public evaluate() {
    const total = this.inputs.reduce((_total, input) => {
      // 命中哪个区域的计算逻辑
      const matchedRule = this.rules.find(rule => rule.region === input.region)

      const totalForRegion = input.items.reduce((_totalForRegion, inputItem) => {
        const matchedRuleItem = matchedRule?.items.find(ruleItem => (
          matchRuleItem(ruleItem, inputItem, this.unitAdaptor)
        ))
        const threshold = matchedRuleItem?.threshold || 0
        const count = Math.max(this.unitAdaptor.toGB(inputItem.count, inputItem.unit) - threshold, 0)

        return _totalForRegion + (matchedRuleItem?.price || 0) * count
      }, 0)

      return _total + totalForRegion
    }, 0)

    return (total * this.duration).toFixed(2)
  }

  public setDuration = (duration: number) => {
    this.duration = duration
    this.trigger()
  }

  public trigger() {
    this.listeners.forEach(listener => listener(this.evaluate()))
  }

  public listen(listener: (total: string) => void) {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)

      this.listeners.splice(index, 1)
    }
  }
}

export type Unit = 'GB' | 'TB' | 'PB'
// 单位适配器 GB/TB/PB
export class UnitAdaptor {
  public toGB(num: number, unit: Unit) {
    if (unit === 'PB') {
      return num * 1024 * 1024
    }

    if (unit === 'TB') {
      return num * 1024
    }

    return num
  }

  public toTB() {
    // TODO
  }

  public toPB() {
    // TODO
  }
}
