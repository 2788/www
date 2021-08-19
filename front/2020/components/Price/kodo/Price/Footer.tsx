import React from 'react'

export default function Footer() {
  return (
    <div>
      说明：
      <br />
      1、低频访问存储，Object 最短存储期限为 30 天，早于 30 天删除、修改、覆盖 Object，需要补足未满 30 天的剩余天数的存储费用，超过 30 天不需要补。
      <br />
      2、归档存储，Object 最短存储期限为 60 天，早于 60 天删除、修改、覆盖 Object，需要补足未满 60 天的剩余天数的存储费用，超过 60 天不需要补。
      <br />
      3、最小计量：低频访问型存储、归档型存储，最小计量为 64 KB，小于 64 KB 的 Object 按照 64 KB 计算存储空间，超过 64 KB 大小的 Object 按照实际大小计算存储空间。
      <br />
      4、数据取回：从服务端读取的数据量，在外网传输的数据量会另计入到外网流出流量的计费项中。对于低频访问存储，每次数据访问都会收取此部分费用。
      对于归档存储类型，进行数据解冻操作，解冻完成后，数据取回费用按照实际解冻的数据量收取。处于解冻状态的数据访问，则不会再收取数据取回费用。
      <br />
      5、归档存储数据取回后，会产生一个标准存储类型的对象副本，在取回的有效期内，会同时收取这份数据在标准存储和归档存储中的存储费用，有效期到期后标准存储副本会自动删除。
      低频访问存储数据取回不产生对象副本，也不会产生标准存储的存储费用。
    </div>
  )
}
