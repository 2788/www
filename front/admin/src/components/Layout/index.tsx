import * as React from 'react'
import { Layout as BaseLayout } from 'react-icecream'
import { observer } from 'mobx-react'
import registerPermission from 'admin-base/common/enhancers/permission'
import signinRequired from 'admin-base/user/permissions/signin-required'
import { Container, Column } from 'libs/layout-element'
import Main from 'components/Main'

import SubSidebar from './SubSidebar'
import Navbar from './NavBar'

@registerPermission(signinRequired)
@observer
export default class Layout extends React.Component<any, {}> {
  render() {
    return (
      <BaseLayout style={{ height: '100%' }}>
        <Container height="100%" color="#F2F3F7">
          <Container width="220px">
            <SubSidebar />
          </Container>
          <Column>
            <Navbar />
            <Main>
              {this.props.children}
            </Main>
          </Column>
        </Container>
      </BaseLayout>
    )
  }
}
