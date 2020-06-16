# 用户反馈组件

### 如何调起用户反馈弹窗

```tsx
import { useModal } from 'components/Feedback'

function Foo() {
  const { showModal, startConsulting } = useModal()

  // 在需要的地方调用 `showModal()` / `startConsulting` 即可，如：
  return (
    <>
      <button onClick={showModal}>反馈</button>
      <button onClick={startConsulting}>咨询</button>
    </>
  )
}
```
