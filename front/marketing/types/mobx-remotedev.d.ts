declare module "mobx-remotedev" {
  interface StoreClass {
    (): void
  }

  interface RemoteDev {
    (store: any, config?: any): StoreClass
  }

  const remoteDev: RemoteDev;

  export = remoteDev
}
