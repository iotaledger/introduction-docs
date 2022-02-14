
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/',
  component: ComponentCreator('/','948'),
  
  routes: [
{
  path: '/faq',
  component: ComponentCreator('/faq','155'),
  exact: true,
},
{
  path: '/firefly/',
  component: ComponentCreator('/firefly/','4a6'),
  exact: true,
},
{
  path: '/firefly/verify_download',
  component: ComponentCreator('/firefly/verify_download','488'),
  exact: true,
},
{
  path: '/guides/',
  component: ComponentCreator('/guides/','d13'),
  exact: true,
},
{
  path: '/guides/backup_security',
  component: ComponentCreator('/guides/backup_security','adb'),
  exact: true,
},
{
  path: '/guides/dev_guide',
  component: ComponentCreator('/guides/dev_guide','c81'),
  exact: true,
},
{
  path: '/guides/exchange_guide',
  component: ComponentCreator('/guides/exchange_guide','470'),
  exact: true,
},
{
  path: '/guides/hub_guide',
  component: ComponentCreator('/guides/hub_guide','cad'),
  exact: true,
},
{
  path: '/guides/migration-mechanism',
  component: ComponentCreator('/guides/migration-mechanism','78b'),
  exact: true,
},
{
  path: '/guides/snapshot_validation_bootstrapping',
  component: ComponentCreator('/guides/snapshot_validation_bootstrapping','53c'),
  exact: true,
},
{
  path: '/guides/token_guide',
  component: ComponentCreator('/guides/token_guide','9d2'),
  exact: true,
},
{
  path: '/introduction/path_to_chrysalis',
  component: ComponentCreator('/introduction/path_to_chrysalis','2e4'),
  exact: true,
},
{
  path: '/introduction/what_is_chrysalis',
  component: ComponentCreator('/introduction/what_is_chrysalis','053'),
  exact: true,
},
{
  path: '/libraries/',
  component: ComponentCreator('/libraries/','0a0'),
  exact: true,
},
{
  path: '/libraries/client',
  component: ComponentCreator('/libraries/client','0a9'),
  exact: true,
},
{
  path: '/libraries/wallet',
  component: ComponentCreator('/libraries/wallet','746'),
  exact: true,
},
{
  path: '/mainnet',
  component: ComponentCreator('/mainnet','c6f'),
  exact: true,
},
{
  path: '/node_software',
  component: ComponentCreator('/node_software','867'),
  exact: true,
},
{
  path: '/one-click-private-tangle',
  component: ComponentCreator('/one-click-private-tangle','b0c'),
  exact: true,
},
{
  path: '/resources',
  component: ComponentCreator('/resources','fc0'),
  exact: true,
},
{
  path: '/rfc',
  component: ComponentCreator('/rfc','025'),
  exact: true,
},
{
  path: '/testnet',
  component: ComponentCreator('/testnet','169'),
  exact: true,
},
{
  path: '/tutorials/README',
  component: ComponentCreator('/tutorials/README','79f'),
  exact: true,
},
{
  path: '/welcome',
  component: ComponentCreator('/welcome','f66'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
