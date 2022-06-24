module.exports = {
  mySidebar: [{
      type: 'doc',
      id: 'welcome',
      label: 'Welcome'
    }, {
      type: 'doc',
      id: 'introduction/what_is_stardust',
      label: 'What is Stardust'
    }, {
      type: 'category',
      label: 'Stardust Ledger Anatomy',
      items: [{
        type: 'doc',
        id: 'protocol/intro',
        label: `Introduction`
      },{
        type: 'doc',
        id: 'protocol/simple_transfers',
        label: `Simple Transactions`
      },{
        type: 'doc',
        id: 'protocol/alias',
        label: `Alias Transactions`
      },{
        type: 'doc',
        id: 'protocol/foundry',
        label: `Native Tokens and Foundries`
      },{
        type: 'doc',
        id: 'protocol/nft',
        label: `NFT Transactions`
      }
      ]
    }, {
      type: 'doc',
      id: 'node_software',
      label: 'Node Software'
    }, {
      type: 'category',
      label: 'Libraries',
      items: [{
        type: 'doc',
        id: 'libraries/overview',
        label: 'Overview'
      }, {
        type: 'doc',
        id: 'libraries/client',
        label: 'Client Lib'
      }, {
        type: 'doc',
        id: 'libraries/wallet',
        label: 'Wallet Lib'
      }, ]
    },
    {
      type: 'category',
      label: 'Guides',
      items: [{
          type: 'doc',
          id: 'guides/overview',
          label: 'Overview'
        },
        {
          type: 'doc',
          id: 'guides/developer',
          label: 'Developer'
        },
        {
          type: 'doc',
          id: 'guides/exchange',
          label: 'Exchange'
        },
        {
          type: 'doc',
          id: 'guides/backup_security',
          label: 'Backup and Security'
        },
      ]
    },{
      type: 'doc',
      id: 'firefly/verify_download',
      label: 'Verify Firefly Download'
    },
    {
      type: 'doc',
      id: 'shimmer',
      label: 'Shimmer'
    },
    {
      type: 'doc',
      id: 'betanet',
      label: 'Pre-Shimmer Beta'
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        {
          type: 'doc',
          id: 'tutorials/one_click_private_tangle',
          label: 'Private Tangle'
        },]
    },
    {
      type: 'doc',
      id: 'protocol_tip',
      label: 'Protocol TIPs'
    },
    {
      type: 'doc',
      id: 'resources',
      label: 'Resources'
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ'
    },
  ]
};
