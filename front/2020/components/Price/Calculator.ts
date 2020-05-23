// 规则按区域划分
export type CalcRule = {
  // 地区名字(给人看的)
  desc: string
  // 地区代码(随便组织，代码逻辑用)
  region: string
  items: Array<CalcRuleItem | CalcRuleGroup>
}

// 某类计费项可能属于某个抽象的概念(type, group), 这类可以避免每项都设置单位适配器，可以用 CalcRuleGroup 包一下
export type CalcRuleGroup = {
  type: 'group',
  name: string
  // 分组的目的可能只是分类，所以这也是可选的
  unitAdaptor?: UnitAdaptor
  items: CalcRuleItem[]
}

// 计费项
export type CalcRuleItem = {
  type?: 'item',
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
  // 单位适配器，方便写规则做成可选的，不填默认使用 Calculator 的适配器
  unitAdaptor?: UnitAdaptor
}

export type CalcInput = {
  region: string
  desc: string
  items: InputItem[]
}

export type InputItem = {
  // 对应 rule item 的 name
  name: string
  // 显示在购物车中的文案
  desc: string
  count: number
  unit: Unit
}

function isCalcGroup(item: CalcRuleItem | CalcRuleGroup): item is CalcRuleGroup {
  return item.type === 'group'
}

function matchRuleItem(ruleItem: CalcRuleItem, inputItem: InputItem, unitAdaptor: UnitAdaptor) {
  const gbCount = unitAdaptor.toBase(inputItem.count, inputItem.unit)
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
  // 使用时间. 考虑到可能不只是月故不用 month
  private duration = 1
  private inputs: CalcInput[] = []

  constructor(
    private rules: CalcRule[],
    // 默认的适配器，如果规则不配置则用这个
    private unitAdaptor: UnitAdaptor = new CapacityUnitAdaptor()
  ) { }

  public setRules(rules: CalcRule[]) {
    this.rules = rules
    this.trigger()
  }

  public getInputs() {
    return this.inputs
  }

  public addInput(input: CalcInput) {
    this.inputs.push(input)
    this.trigger()
  }

  public setInput = (nextInput: CalcInput | CalcInput[]) => {
    if (Array.isArray(nextInput)) {
      this.inputs = nextInput
    } else {
      const current = this.inputs.findIndex(input => input.region === nextInput.region)

      if (current === -1) {
        this.inputs.push(nextInput)
      } else {
        this.inputs[current] = nextInput
      }
    }

    this.trigger()
  }

  public evaluate() {
    const total = this.inputs.reduce((_total, input) => {
      // 命中哪个区域的计算逻辑
      const matchedRule = this.rules.find(rule => rule.region === input.region)

      if (!matchedRule) {
        throw Error('没有找到对应的计费规则，请检查规则表')
      }

      const totalForRegion = input.items.reduce((_totalForRegion, inputItem) => {
        let matchedRuleItem: CalcRuleItem | undefined

        for (const item of matchedRule.items) {
          // group 里面没找到继续下一个 group 或者 item
          if (isCalcGroup(item)) {
            const matchedRuleItemInGroup = item.items.find(ruleItem => (
              // 如果 item 不指定 adaptor 则使用 group 的
              matchRuleItem(ruleItem, inputItem, ruleItem.unitAdaptor || item.unitAdaptor || this.unitAdaptor)
            ))
            if (matchedRuleItemInGroup) {
              matchedRuleItem = matchedRuleItemInGroup
              break
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (matchRuleItem(item, inputItem, item.unitAdaptor || this.unitAdaptor)) {
              matchedRuleItem = item
              break
            }
          }
        }

        if (!matchedRuleItem) {
          throw Error('没有找到对应的计费规则，请检查规则表')
        }

        const threshold = matchedRuleItem.threshold || 0
        const count = Math.max(
          (matchedRuleItem.unitAdaptor || this.unitAdaptor).toBase(inputItem.count, inputItem.unit) - threshold,
          0
        )

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

  public getDuration() {
    return this.duration
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

export type UnitAdaptorType = 'capacity' | 'count'
export type Unit = CapacityUnit | CountUnit

export abstract class UnitAdaptor {
  // 转换成基础单位
  abstract toBase(num: number, unit: Unit): number
}

export type CapacityUnit = 'GB' | 'TB' | 'PB'
// 容量单位适配器 GB/TB/PB
export class CapacityUnitAdaptor extends UnitAdaptor {
  public toBase(num: number, unit: CapacityUnit) {
    if (unit === 'PB') {
      return num * 1024 * 1024
    }

    if (unit === 'TB') {
      return num * 1024
    }

    return num
  }
}

export type CountUnit = '万次'
// 计数单位适配器
export class CountUnitAdaptor {
  public toBase(num: number, unit: CountUnit) {
    if (unit === '万次') {
      return num
    }

    return num
  }
}
