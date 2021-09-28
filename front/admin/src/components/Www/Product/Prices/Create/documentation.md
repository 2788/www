# 价格页配置说明

1. 【配置文件】仅支持 MD 文件
2. 【关于表格】考虑到已有价格页中表格的丰富展现形式（合并，字体，链接），MD 表格不能满足所有需求，建议各位用  HTML 格式编写表格，再将 HTML 源代码嵌入MD文件的相应位置内。这里，我们提供一个在线HTML表格编辑器的三方插件：https://www.tablesgenerator.com/html_tables 编辑完之后直接选择 copy 并粘贴进 MD 即可
3. 【其他规范】为了适配官网的展示效果，我们给价格页的内容做了一些规范，请在编写 MD 文件时严格按照规范，否则可能会导致官网展示不合规
   规范如下：
    1. 计费方式/价格详情 此类大标题 请使用 **一级标题**
    2. 一级标题下的内容分类标题，请用**二级标题**
    3. **三级标题**将默认识别为多 sheet，其他情况请不要使用！

## 多 sheet 展示

使用“三级标题”作为每个 sheet 的标题，我们将根据这个识别是否为多 sheet，并在展示时做处理，举个例子：

```markdown
### 华东-浙江2（这里一定要是三级标题）

<table>
<thead>
  <tr>
    <th>类型</th>
    <th>计费项</th>
    <th>计量</th>
    <th>标准存储</th>
    <th>低频访问存储</th>
    <th>归档存储</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="5">存储费用</td>
    <td rowspan="5">存储空间费用</td>
    <td>0 - 10 GB</td>
    <td>免费</td>
    <td rowspan="5">0.06 元/GB/月</td>
    <td rowspan="5">0.028 元/GB/月</td>
  </tr>
  <tr>
    <td>10 GB - 1 TB</td>
    <td>0.098 元/GB/月</td>
  </tr>
  <tr>
    <td>1 TB - 200 TB</td>
    <td>0.095 元/GB/月</td>
  </tr>
  <tr>
    <td>200 TB - 5 PB</td>
    <td>0.092 元/GB/月</td>
  </tr>
  <tr>
    <td>5 PB 以上</td>
    <td>0.089 元/GB/月</td>
  </tr>
</tbody>
</table>

### 华南（这里一定要是三级标题）

<table>
<thead>
  <tr>
    <th>类型</th>
    <th>计费项</th>
    <th>计量</th>
    <th>标准存储</th>
    <th>低频访问存储</th>
    <th>归档存储</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="5">存储费用</td>
    <td rowspan="5">存储空间费用</td>
    <td>0 - 10 GB</td>
    <td>免费</td>
    <td rowspan="5">0.06 元/GB/月</td>
    <td rowspan="5">0.028 元/GB/月</td>
  </tr>
  <tr>
    <td>10 GB - 1 TB</td>
    <td>0.098 元/GB/月</td>
  </tr>
  <tr>
    <td>1 TB - 200 TB</td>
    <td>0.095 元/GB/月</td>
  </tr>
  <tr>
    <td>200 TB - 5 PB</td>
    <td>0.092 元/GB/月</td>
  </tr>
  <tr>
    <td>5 PB 以上</td>
    <td>0.089 元/GB/月</td>
  </tr>
</tbody>
</table>
```

展示效果如下：
![img](https://static-file.qiniu.io/static/doc/www-admin/%E4%BB%B7%E6%A0%BC%E9%85%8D%E7%BD%AE%E5%A4%9Asheet.png)