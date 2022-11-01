import React from 'react';
import { Device } from './framework7/framework7-lite.esm.bundle.js';
import {
  App,
  Views,
  View,
  Link,
  Framework7Extensions,
  Page,
  Navbar,
  Block,
  List,
  ListItem,
} from 'framework7-react';
import { cordovaApp } from './cordovaApp';

const routes = [
  {
    path: '/',
    component: ({
      $f7router,
    }: {
      $f7router: Framework7Extensions['$f7router'];
    }) => {
      return (
        <Page>
          <Navbar title="My App" />
          <Block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              eleifend, elit vitae scelerisque vulputate, tortor velit tempus
              dui, et luctus tellus justo nec velit. Duis scelerisque in tellus
              et pretium. Ut faucibus fringilla risus, ut dapibus nunc vehicula
              sit amet. Donec posuere nunc non fermentum commodo.
            </p>
          </Block>
          <Link
            smartSelect
            smartSelectParams={{
              openIn: 'popover',
              // cssClass: hideUnusedSelectStyleHackClassName,
            }}
            iconF7="map"
          >
            <select
              name="fruits"
              defaultValue="apple"
              onChange={(e) => {
                console.log(`$ e.target.value`), e.target.value;
                switch (e.target.value) {
                  case 'a': {
                    $f7router.navigate('/a');
                    break;
                  }
                  case 'b': {
                    $f7router.navigate('/b');
                    break;
                  }
                }
              }}
            >
              <option value="a">a</option>
              <option value="b">b</option>
            </select>
          </Link>
          <Block>
            <Link iconF7="gear_alt" href={'/b'} />
          </Block>
          <Block>
            <List>
              {[1, 2, 3].map((n) => (
                <ListItem key={n} title={`Item ${n}`} />
              ))}
            </List>
          </Block>
        </Page>
      );
    },
  },
  {
    path: '/a',
    component: ({
      $f7router,
    }: {
      $f7router: Framework7Extensions['$f7router'];
    }) => (
      <Page name="pageA">
        <Navbar
          backLink="Back"
          title="Page A"
          onBackClick={() => {
            $f7router.navigate('/');
            // setTimeout(() => {
            //   console.log(`$ $f7router.navigate(PATHS.home); in setTimeout`);
            //   $f7router.navigate(PATHS.home);
            // }, 1000);
          }}
        ></Navbar>
      </Page>
    ),
  },
  {
    path: '/b',
    component: ({
      $f7router,
    }: {
      $f7router: Framework7Extensions['$f7router'];
    }) => (
      <Page name="pageB">
        <Navbar
          backLink="Back"
          title="Page B"
          onBackClick={() => {
            $f7router.navigate('/');
            // setTimeout(() => {
            //   console.log(`$ $f7router.navigate(PATHS.home); in setTimeout`);
            //   $f7router.navigate(PATHS.home);
            // }, 1000);
          }}
        ></Navbar>
        <Block>
          <Link href="/c">Page C</Link>
        </Block>
      </Page>
    ),
  },
  {
    path: '/c',
    component: ({
      $f7router,
    }: {
      $f7router: Framework7Extensions['$f7router'];
    }) => (
      <Page name="pagec">
        <Navbar backLink="Back"></Navbar>
      </Page>
    ),
  },
];

export default class extends React.Component {
  constructor() {
    //@ts-ignore
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        id: 'tbs.agentm', // App bundle <ID></ID>
        name: 'TBS Agent', // App name

        theme: 'auto',

        // App root data
        // data: function() {
        //   return {};
        // },

        // App routes
        routes: routes,

        // Input settings
        input: {
          scrollIntoViewOnFocus: Device.cordova && !Device.electron,
          scrollIntoViewCentered: Device.cordova && !Device.electron,
        },
        // Cordova Statusbar settings
        statusbar: {
          iosOverlaysWebView: true,
          androidOverlaysWebView: false,
        },
        touch: {
          fastClicks: true,
        },
      },
    };
  }
  render() {
    return (
      //@ts-ignore
      <App
        params={this.state.f7params}
        style={{ width: '100vw', height: '100%' }}
      >
        <Views tabs className="safe-areas">
          <View id="view-home" url="/" />
        </Views>
      </App>
    );
  }
  componentDidMount() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
    });
  }
}
