/**
 * @file DOM 操作相关 utils
 */

/**
 * 判断指定祖先节点是否包含指定的子孙节点（同 Node.prototype.contains）
 * 使用这个而不是 Node.prototype.contains 是因为后者对 IE9 支持不好
 */
export function contains(ancestor: Node, descendant: Node | null) {
  let node: Node | null = descendant
  while (node) {
    if (ancestor === node) return true
    node = node.parentNode
  }
  return false
}
