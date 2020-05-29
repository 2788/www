# 产品页导航栏相关组件

### 概念

导航栏模块定义了三个概念：

* `Navigatable`：可导航区域，可以认为是整个产品页的内容区域
* `Navigator`：导航栏
* `Block`：可导航区块，如产品规格、功能与优势、使用场景、客户案例等

### 如何编写可导航区块

其中，页面上的可导航区块与导航栏中的 tab 项一一对应；其内容各不相同，因此由外部实现；实现一个可导航区块的做法如下（这里以客户案例为例）：

```tsx
import { Block } from 'components/Product/Navigator'

function Cases() {
  return (
    <Block
      name="cases" // 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值
      title="客户案例" // 内容标题，即对应 tab 项中的文本内容
    >
      {/* 客户案例的具体内容 */}
    </Block>
  )
}
```

### 如何使用

你需要使用可导航区域（`Navigatable`）包裹导航栏（`Navigator`）及所有的可导航区块，这样导航栏可以自动地获取到当前可导航区域中所有的可导航区块，并对应地生成 tab 项


```tsx
import { Navigatable, Navigator, Block, Button as NavButton } from 'components/Product/Navigator'

function Main() {

  // `Product/Layout` 里已经添加了使用 `Navigatable` 包裹内容的逻辑
  // 因此在具体的产品页实现里无需再写一遍 `<Navigatable></Navigatable>`

  return (
    <Navigatable>

      {/* 导航栏 */}
      <Navigator priceLink="/TODO">
        <NavButton type="primary" href="/products/kodo">免费试用</NavButton>
        <NavButton withBorder onClick={handleConsult}>售前咨询</NavButton>
      </Navigator>

      {/* 不同的可导航区块 */}
      <Feature />
      <Usage />
      <Cases />
      <Steps />
      <Docs />

    </Navigatable>
  )
}
```
