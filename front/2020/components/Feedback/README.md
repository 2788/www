# 用户反馈组件

### 如何调起用户反馈弹窗

```tsx
import { useModal } from 'components/Feedback'

function Foo() {
  const { startConsulting, startIntentConsulting } = useModal()

  // 在需要的地方调用 `startConsulting` / `startIntentConsulting` 即可;
  // 其中 `startConsulting` 用于一般的咨询目的，`startIntentConsulting` 用于带有明确意图的咨询，示例如下：
  return (
    <>
      <button onClick={startConsulting}>咨询</button>
      <button onClick={() => startIntentConsulting('金融行业解决方案')}>咨询“金融行业解决方案”</button>
    </>
  )
}
```
