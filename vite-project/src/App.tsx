//@ts-nocheck
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
      // console.log(`$ $f7router`,$f7router)
      return (
        <Page>
          <Navbar title="My App" />
          <p>
            {`To reproduce this router related issue:`}<br/>
            {`1. Click "map" icon and go to Page "A" by clicking A smart select popver`}<br/>
            {`2. Click back from A`}<br/>
            {`3. Click "gear_alt" icon to Page B and click again to Page C, click back in C and Click back in B`}<br/>
            {`4. See console, router unexpected request url "/fruits-select/"`}<br/>
          </p>
          <Block>
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
              <option value="null">dummy</option>

              <option value="a">a</option>
              <option value="b">b</option>
            </select>
          </Link>
          </Block>
          <Block>
            <Link iconF7="gear_alt" href={'/b'} />
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
        backLink={'Back'}
        backLinkForce={true}
          // backLink="/"
          title="Page B"
          // onBackClick={() => {
          //   $f7router.navigate('/');
          //   // setTimeout(() => {
          //   //   console.log(`$ $f7router.navigate(PATHS.home); in setTimeout`);
          //   //   $f7router.navigate(PATHS.home);
          //   // }, 1000);
          // }}
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
