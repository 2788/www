package account

import "fmt"

type DisabledType int

const (
    _DISABLED_INVALID_MIN_       DisabledType = iota - 2
    DISABLED_TYPE_ENABLED                     // -1:未冻结
    DISABLED_TYPE_AUTO                        // 0:冻结后允许充值自动解冻
    DISABLED_TYPE_MANUAL                      // 1:冻结后需要手动解冻
    DISABLED_TYPE_PARENT                      // 2:被父账号冻结
    DISABLED_TYPE_OVERDUE                     // 3: 被父账号冻结
    DISABLED_TYPE_NONSTD_OVERDUE              // 4: 实时计费远超余额
    _DISABLED_INVALID_MAX_                    // 5: 未认证用户超过免费额度
)

func (t DisabledType) IsValid() bool {
    return t > _DISABLED_INVALID_MIN_ && t < _DISABLED_INVALID_MAX_
}

func (t DisabledType) IsFrozen() bool {
    return t > DISABLED_TYPE_ENABLED
}

func (t DisabledType) Humanize() string {
    switch t {
    case DISABLED_TYPE_ENABLED:
        return "未冻结"
    case DISABLED_TYPE_AUTO:
        return "欠费冻结"
    case DISABLED_TYPE_MANUAL:
        return "非欠费冻结"
    case DISABLED_TYPE_PARENT:
        return "被父账号冻结"
    case DISABLED_TYPE_OVERDUE:
        return "实时计费远超余额"
    case DISABLED_TYPE_NONSTD_OVERDUE:
        return "未认证用户超过免费额度"
    default:
        return fmt.Sprintf("未知类型: %d", t)
    }
}

func (t DisabledType) String() string {
    return fmt.Sprintf("%d", t)
}

