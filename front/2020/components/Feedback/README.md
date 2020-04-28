# 用户反馈组件

TODO: 去看下老官网反馈弹框的逻辑（主要是看不同调起的地方是不是会有不同的逻辑），再实现这里的交互逻辑

### 如何调起用户反馈弹窗

```tsx
import { useModal } from 'components/Feedback'

function Foo() {
  const { showModal } = useModal()

  // 在需要的地方调用 `showModal()` 即可，如：
  return (
    <button onClick={showModal}>
      咨询我们
    </button>
  )
}
```
