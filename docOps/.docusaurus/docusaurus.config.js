export default {
  "title": "Chrysalis",
  "tagline": "Official IOTA Chrysalis Software",
  "url": "https://chrysalis.docs.iota.org/",
  "baseUrl": "/",
  "onBrokenLinks": "warn",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "/img/logo/favicon.ico",
  "organizationName": "iotaledger",
  "projectName": "Chrysalis",
  "stylesheets": [
    "https://fonts.googleapis.com/css?family=Material+Icons"
  ],
  "themeConfig": {
    "colorMode": {
      "defaultMode": "dark",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "navbar": {
      "title": "Chrysalis",
      "logo": {
        "alt": "IOTA",
        "src": "img/logo/Logo_Swirl_Dark.png"
      },
      "items": [
        {
          "type": "doc",
          "docId": "welcome",
          "position": "left",
          "label": "Documentation",
          "activeSidebarClassName": "navbar__link--active"
        },
        {
          "href": "https://github.com/iotaledger/chrysalis-docs",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Documentation",
          "items": [
            {
              "label": "Welcome",
              "to": "/welcome"
            },
            {
              "to": "introduction/what_is_chrysalis",
              "label": "What is Chrysalis?"
            },
            {
              "to": "introduction/path_to_chrysalis",
              "label": "Path to Chrysalis"
            },
            {
              "to": "firefly/",
              "label": "Firefly"
            },
            {
              "to": "node_software/",
              "label": "Node Software"
            },
            {
              "to": "libraries/",
              "label": "Libraries"
            },
            {
              "to": "guides/",
              "label": "Guides"
            },
            {
              "to": "mainnet/",
              "label": "Mainnet"
            },
            {
              "to": "testnet/",
              "label": "Testnet"
            },
            {
              "to": "one-click-private-tangle",
              "label": "Private Tangle"
            },
            {
              "to": "rfc",
              "label": "Protocol RFCs"
            },
            {
              "to": "resources",
              "label": "Resources"
            },
            {
              "to": "faq",
              "label": "FAQ"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Discord",
              "href": "https://discord.iota.org/"
            }
          ]
        },
        {
          "title": "Contribute",
          "items": [
            {
              "label": "GitHub",
              "href": "https://github.com/iotaledger/chrysalis-docs"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2021 IOTA Foundation, Built with Docusaurus."
    },
    "prism": {
      "additionalLanguages": [
        "rust"
      ],
      "theme": {
        "plain": {
          "color": "#393A34",
          "backgroundColor": "#f6f8fa"
        },
        "styles": [
          {
            "types": [
              "comment",
              "prolog",
              "doctype",
              "cdata"
            ],
            "style": {
              "color": "#999988",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "opacity": 0.7
            }
          },
          {
            "types": [
              "string",
              "attr-value"
            ],
            "style": {
              "color": "#e3116c"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "#393A34"
            }
          },
          {
            "types": [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted"
            ],
            "style": {
              "color": "#36acaa"
            }
          },
          {
            "types": [
              "atrule",
              "keyword",
              "attr-name",
              "selector"
            ],
            "style": {
              "color": "#00a4db"
            }
          },
          {
            "types": [
              "function",
              "deleted",
              "tag"
            ],
            "style": {
              "color": "#d73a49"
            }
          },
          {
            "types": [
              "function-variable"
            ],
            "style": {
              "color": "#6f42c1"
            }
          },
          {
            "types": [
              "tag",
              "selector",
              "keyword"
            ],
            "style": {
              "color": "#00009f"
            }
          }
        ]
      },
      "darkTheme": {
        "plain": {
          "color": "#F8F8F2",
          "backgroundColor": "#282A36"
        },
        "styles": [
          {
            "types": [
              "prolog",
              "constant",
              "builtin"
            ],
            "style": {
              "color": "rgb(189, 147, 249)"
            }
          },
          {
            "types": [
              "inserted",
              "function"
            ],
            "style": {
              "color": "rgb(80, 250, 123)"
            }
          },
          {
            "types": [
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 85)"
            }
          },
          {
            "types": [
              "changed"
            ],
            "style": {
              "color": "rgb(255, 184, 108)"
            }
          },
          {
            "types": [
              "punctuation",
              "symbol"
            ],
            "style": {
              "color": "rgb(248, 248, 242)"
            }
          },
          {
            "types": [
              "string",
              "char",
              "tag",
              "selector"
            ],
            "style": {
              "color": "rgb(255, 121, 198)"
            }
          },
          {
            "types": [
              "keyword",
              "variable"
            ],
            "style": {
              "color": "rgb(189, 147, 249)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(98, 114, 164)"
            }
          },
          {
            "types": [
              "attr-name"
            ],
            "style": {
              "color": "rgb(241, 250, 140)"
            }
          }
        ]
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "hideableSidebar": false
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/charlesthompson/chrysalis-docs/docOps/sidebars.js",
          "routeBasePath": "/",
          "editUrl": "https://github.com/iotaledger/chrysalis-docs/tree/main/docs"
        },
        "theme": {
          "customCss": "/Users/charlesthompson/chrysalis-docs/docOps/src/css/iota.css"
        }
      }
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};