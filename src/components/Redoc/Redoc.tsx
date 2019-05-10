import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ThemeProvider } from '../../styled-components';
import { OptionsProvider } from '../OptionsProvider';

import {AppStore, RedocNormalizedOptions} from '../../services';
import { ApiInfo } from '../ApiInfo/';
import { ApiLogo } from '../ApiLogo/ApiLogo';
import { ContentItems } from '../ContentItems/ContentItems';
import { SideMenu } from '../SideMenu/SideMenu';
import { StickyResponsiveSidebar } from '../StickySidebar/StickyResponsiveSidebar';
import { ApiContentWrap, BackgroundStub, RedocWrap } from './styled.elements';

import { SearchBox } from '../SearchBox/SearchBox';
import {StoreProvider} from "../StoreBuilder";
import {Loading} from "..";


export interface RedocProps {
  store: AppStore;
  dev?: boolean;

}

export class Redoc extends React.Component<RedocProps> {

  constructor(props){
    super(props);

    this.state = {
      loading : true
    };

  }


  static propTypes = {
    store: PropTypes.instanceOf(AppStore).isRequired,

  };

  componentDidMount() {
    console.log(this.state);
    this.setState({ loading : true });

    this.props.store.onDidMount();
    console.log(this.state);
    console.log("doc renderizada onDidMount");

  }

  componentWillUnmount() {
    this.props.store.dispose();
    console.log("doc renderizada dispose");
  }

  render() {


    const {
      store: { spec, menu, options={}  , search, marker },
    } = this.props;

    const store = this.props.store;
    const normalizedOpts = new RedocNormalizedOptions(options);


    let content = !(this.state) ?
      <Loading color={normalizedOpts.theme.colors.primary.main} />:
      <ThemeProvider theme={normalizedOpts.theme}>
        <StoreProvider value={this.props.store}>
          <OptionsProvider value={normalizedOpts}>
            <RedocWrap className="redoc-wrap">
              <StickyResponsiveSidebar menu={menu} className="menu-content">
                <ApiLogo info={spec.info} />
                {(!normalizedOpts.disableSearch && (
                  <SearchBox
                    search={search!}
                    marker={marker}
                    getItemById={menu.getItemById}
                    onActivate={menu.activateAndScroll}
                  />
                )) ||
                null}
                <SideMenu menu={menu} />
              </StickyResponsiveSidebar>
              <ApiContentWrap className="api-content">
                <ApiInfo store ={store} />
                <ContentItems items={menu.items as any} />
              </ApiContentWrap>
              <BackgroundStub />
            </RedocWrap>
          </OptionsProvider>
        </StoreProvider>
      </ThemeProvider>

    return (
      <div>{content}</div>
    );


  }
}
