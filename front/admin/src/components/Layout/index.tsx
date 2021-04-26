import * as React from 'react'
import { Layout as BaseLayout } from 'react-icecream'
import { observer } from 'mobx-react'
import registerPermission from 'admin-base/common/enhancers/permission'
import signinRequired from 'admin-base/user/permissions/signin-required'
import { Column } from 'libs/layout-element'
import Container from 'components/common/Container'

import SubSidebar from './SubSidebar'
import Navbar from './NavBar'
import * as style from './style.m.less'

@registerPermission(signinRequired)
@observer
export default class Layout extends React.Component<any, {}> {
  render() {
    return (
      <BaseLayout style={{ height: '100%' }}>
        <Container className={style.container}>
          <Container className={style.subContainer}>
            <SubSidebar />
          </Container>
          <Column>
            <Navbar />
            <div className={style.main}>
              {this.props.children}
            </div>
          </Column>
        </Container>
      </BaseLayout>
    )
  }
}
