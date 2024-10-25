export default [
{
  id: 'braid-tests',
  name: 'Legacy (Versioning-Unaware) Caches',
  description: 'Legacy caches can confuse/clobber versions',
  tests: [
    {
      name: 'Does `Version` header pass through cache unscathed?',
      id: 'braid-version-header-passthrough',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does `Parents` header pass through cache unscathed?',
      id: 'braid-parents-header-passthrough',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Parents', '"2"'],
          ],
          expected_response_headers: [
            ['Parents', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Does `Version` header get cached with response?',
      id: 'braid-store-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does `Parents` header get cached with response?',
      id: 'braid-store-parents',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Parents', '"2"'],
          ],
          expected_response_headers: [
            ['Parents', '"2"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Parents', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Does response with a `Version` get cached and reused?',
      id: 'braid-reuse-same-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does response with a `Parents` get cached and reused?',
      id: 'braid-reuse-same-parents',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Parents', '"1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Parents', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does cache avoid reusing a response with the wrong `Version`?',
      id: 'braid-avoid-different-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"']
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does cache avoid reusing a response with the wrong `Parents`?',
      id: 'braid-avoid-different-parents',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Parents', '"2"']
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does cache avoid reusing a response with the right `Version` but wrong `Parents`?',
      id: 'braid-not-reuse-version-and-diff-parents',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"0"'],
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does cache avoid reusing an unversioned response to a versioned request?',
      id: 'braid-avoid-no-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
          ],
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does cache avoid reusing a `309: Version Unknown Here` response?',
      id: 'braid-avoid-309',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_status: [309, 'Version Unknown Here'],
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    // {
    //   name: 'Does HTTP cache reuse a versioned response to unversioned requests?',
    //   id: 'braid-reuse-no-version',
    //   depends_on: [],
    //   requests: [
    //     {
    //       request_method: 'GET',
    //       response_headers: [
    //         ['Cache-Control', 'max-age=100000'],
    //         ['Date', 0],
    //         ['Version', '"1"'],
    //       ],
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     },
    //     {
    //       request_method: 'GET',
    //       expected_type: 'cached',
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     }
    //   ]
    // },

    // {
    //   name: 'Does HTTP cache reuse a response with a `Version`, from a request without a `Version`, when requesting the same `Version`?',
    //   id: 'braid-reuse-matching-version',
    //   kind: 'optimal',
    //   depends_on: [],
    //   requests: [
    //     {
    //       request_method: 'GET',
    //       response_headers: [
    //         ['Cache-Control', 'max-age=100000'],
    //         ['Date', 0],
    //         ['Version', '"1"'],
    //       ],
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     },
    //     {
    //       request_method: 'GET',
    //       request_headers: [
    //         ['Version', '"1"']
    //       ],
    //       expected_type: 'cached',
    //     }
    //   ]
    // },
    // {
    //   name: 'Does HTTP cache avoid reusing a response with a `Version`, from a request without a `Version`, when requesting a different `Version`?',
    //   id: 'braid-cache-miss-different',
    //   depends_on: [],
    //   requests: [
    //     {
    //       request_method: 'GET',
    //       response_headers: [
    //         ['Cache-Control', 'max-age=100000'],
    //         ['Date', 0],
    //         ['Version', '"1"'],
    //       ],
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     },
    //     {
    //       request_method: 'GET',
    //       request_headers: [
    //         ['Version', '"2"']
    //       ],
    //       expected_type: 'not_cached',
    //     }
    //   ]
    // },
    // {
    //   name: 'Does HTTP cache reuse a response to a PUT with a `Version` when PUT\'ing the same `Version` again?',
    //   id: 'braid-put-version-cached',
    //   depends_on: [],
    //   requests: [
    //     {
    //       request_method: 'PUT',
    //       request_headers: [
    //         ['Version', '"1"']
    //       ],
    //       response_headers: [
    //         ['Cache-Control', 'max-age=100000'],
    //         ['Date', 0],
    //         ['Version', '"1"'],
    //       ],
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     },
    //     {
    //       request_method: 'PUT',
    //       request_headers: [
    //         ['Version', '"1"']
    //       ],
    //       expected_type: 'cached',
    //     }
    //   ]
    // },
    // {
    //   name: 'Does HTTP cache reuse a PUT request with a `Version` when GET\'ing the same `Version` again?',
    //   id: 'braid-put-then-get',
    //   depends_on: [],
    //   requests: [
    //     {
    //       request_method: 'PUT',
    //       request_headers: [
    //         ['Version', '"1"']
    //       ],
    //       response_headers: [
    //         ['Cache-Control', 'max-age=100000'],
    //         ['Date', 0],
    //         ['Version', '"1"'],
    //       ],
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     },
    //     {
    //       request_method: 'GET',
    //       request_headers: [
    //         ['Version', '"1"']
    //       ],
    //       expected_type: 'cached',
    //     }
    //   ]
    // }
  ]
},
{
  id: 'braid-tests-legacy-with-vary',
  name: 'Caches when presented with `Vary: Version, Parents`',
  description: 'If server responds with `Vary: Version, Parents`, legacy caches are able to distinguish versions correctly',
  tests: [
    {
      name: 'Does HTTP cache allow `Version` header to pass through?',
      id: 'braid-version-header-passthrough-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Version', '"1"'],
            ['Vary', 'Version,Parents'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache allow `Parents` header to pass through?',
      id: 'braid-parents-header-passthrough-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Parents', '"2"'],
            ['Vary', 'Version,Parents'],
          ],
          expected_response_headers: [
            ['Parents', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache store `Version` header?',
      id: 'braid-store-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
            ['Vary', 'Version,Parents'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache store `Parents` header?',
      id: 'braid-store-parents-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Parents', '"2"'],
            ['Vary', 'Version,Parents'],
          ],
          expected_response_headers: [
            ['Parents', '"2"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Parents', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with a `Version`?',
      id: 'braid-reuse-same-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache avoid reusing a response with the wrong `Version`?',
      id: 'braid-avoid-different-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"']
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does HTTP cache avoid reusing response for old Version when requesting current `Version`?',
      id: 'braid-avoid-no-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a versioned response to unversioned requests?',
      id: 'braid-reuse-no-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with `Parents`?',
      id: 'braid-reuse-same-parents-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Parents', '"1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Parents', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with both `Version` and `Parents`?',
      id: 'braid-reuse-version-and-parents',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with both `Version` and `Parents`?',
      id: 'braid-reuse-version-and-parents-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache avoid reusing a response with the same `Version` but different `Parents`?',
      id: 'braid-not-reuse-version-and-diff-parents-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"0"'],
          ],
          expected_type: 'not_cached',
        }
      ]
    },

    // {
    //   name: 'Does HTTP cache avoid reusing a response with a `Version`, from a request without a `Version`, when requesting a different `Version`?',
    //   id: 'braid-cache-miss-different-with-vary',
    //   depends_on: [],
    //   requests: [
    //     {
    //       request_method: 'GET',
    //       response_headers: [
    //         ['Cache-Control', 'max-age=100000'],
    //         ['Date', 0],
    //         ['Vary', 'Version, Parents'],
    //         ['Version', '"1"'],
    //       ],
    //       expected_response_headers: [
    //         ['Version', '"1"'],
    //       ]
    //     },
    //     {
    //       request_method: 'GET',
    //       request_headers: [
    //         ['Version', '"2"']
    //       ],
    //       expected_type: 'not_cached',
    //     }
    //   ]
    // }
  ]
},
// {
//   id: 'braid-tests-upgrade-1',
//   name: 'Upgrade 1',
//   description: 'Upgrade 1',
//   tests: [
//     {
//       name: 'Does HTTP cache reuse a response with one `Version`, if it caches a response with a second `Version`, before a request for the original `Version`?',
//       id: 'braid-cache-multiple-hit-first',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Version', '"1"'],
//           ],
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ]
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"2"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Version', '"2"'],
//           ],
//           expected_type: 'not_cached',
//           expected_response_headers: [
//             ['Version', '"2"'],
//           ],
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           expected_type: 'cached',
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ],
//         }
//       ]
//     },
//     {
//       name: 'Does HTTP cache reuse a PUT request with one `Version`, if it caches a PUT request with a second `Version`, before a request for the original `Version`?',
//       id: 'braid-put-multiple-hit-first',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'PUT',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Version', '"1"'],
//           ],
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ]
//         },
//         {
//           request_method: 'PUT',
//           request_headers: [
//             ['Version', '"2"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Version', '"2"'],
//           ],
//           expected_type: 'not_cached',
//           expected_response_headers: [
//             ['Version', '"2"'],
//           ],
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           expected_type: 'cached',
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ],
//         }
//       ]
//     },
//     {
//       name: '[w/Vary]: Does HTTP cache reuse a response with one `Version` (and `Vary: Version`), if it caches a response with a second `Version` (also with `Vary`), before a request for the original `Version`?',
//       id: 'braid-cache-multiple-hit-first-with-vary',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Vary', 'Version'],
//             ['Version', '"1"'],
//           ],
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ]
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"2"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Vary', 'Version'],
//             ['Version', '"2"'],
//           ],
//           expected_type: 'not_cached',
//           expected_response_headers: [
//             ['Version', '"2"'],
//           ],
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           expected_type: 'cached',
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ],
//         }
//       ]
//     },
//     {
//       name: '[w/Vary]: Does HTTP cache reuse a PUT request with one `Version` (and `Vary: Version` in the response), if it caches a PUT request with a second `Version` (also with `Vary: Version` in the resonse), before a request for the original `Version`?',
//       id: 'braid-put-multiple-hit-first-with-vary',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'PUT',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Vary', 'Version'],
//             ['Version', '"1"'],
//           ],
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ]
//         },
//         {
//           request_method: 'PUT',
//           request_headers: [
//             ['Version', '"2"']
//           ],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Vary', 'Version'],
//             ['Version', '"2"'],
//           ],
//           expected_type: 'not_cached',
//           expected_response_headers: [
//             ['Version', '"2"'],
//           ],
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           expected_type: 'cached',
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ],
//         }
//       ]
//     },
//   ]
// }, {
//   id: 'braid-tests-upgrade-2',
//   name: 'Upgrade 2',
//   description: 'Upgrade 2',
//   tests: [
//     {
//       name: 'After HTTP cache handles a request for an old `Version`, it should respond from cache with latest `Version` when requesting without a `Version`.',
//       id: 'braid-old-then-current-hit',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"0"']
//           ],
//           expected_response_headers: [
//             ['Version', '"0"'],
//           ]
//         },
//         {
//           request_method: 'GET',
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ],
//           expected_type: 'cached',
//         },
//       ]
//     },
//     {
//       name: 'After HTTP cache handles a request for an old `Version`, it should respond from cache when requesting a different `Version`.',
//       id: 'braid-old-then-another-hit',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"0"']
//           ],
//           expected_response_headers: [
//             ['Version', '"0"'],
//           ]
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"1"']
//           ],
//           expected_response_headers: [
//             ['Version', '"1"'],
//           ],
//           expected_type: 'cached',
//         },
//       ]
//     },
//     {
//       name: 'After HTTP cache handles a request for an old `Version`, it should respond from cache when requesting with `Subscribe: true`.',
//       id: 'braid-old-then-subscribe-hit',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"0"']
//           ],
//           expected_response_headers: [
//             ['Version', '"0"'],
//           ]
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Subscribe', 'true']
//           ],
//           expected_response_headers: [
//             ['Subscribe', 'true'],
//           ],
//           expected_type: 'cached',
//         },
//       ]
//     },
//     {
//       name: 'After HTTP cache handles a PUT with a `Version`, it should respond from cache when requesting that `Version` again.',
//       id: 'braid-put-then-get-hit',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'PUT',
//           request_headers: [
//             ['Version', '"2"'],
//           ],
//           expected_response_headers: [
//             ['Version', '"2"'],
//           ]
//         },
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Version', '"2"'],
//           ],
//           expected_response_headers: [
//             ['Version', '"2"'],
//           ],
//           expected_type: 'cached',
//         },
//       ]
//     },
//   ]
// }, 
{
  id: 'braid-tests-optional',
  name: 'Optional',
  description: 'Optional',
  tests: [
    {
      name: 'Does HTTP cache reuse a response with a `Version`, from a request without a `Version`, when requesting the same `Version`?',
      id: 'braid-reuse-matching-version-with-vary',
      kind: 'optimal',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version, Parents'],
            ['Version', '"1"'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
    {
      name: 'Does HTTP cache store two versions simultaneously, in parallel?',
      id: 'braid-reuse-multiple-versions',
      kind: 'optimal',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"test-1"']
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-2"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"test-2"']
          ],
          expected_response_headers: [
            ['Version', '"test-2"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-2"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-2"'],
          ]
        }
      ]
    },
    {
      name: 'Does HTTP cache know which version is current while storing multiple versions?',
      id: 'braid-know-current-among-multiple',
      kind: 'optimal',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"test-1"']
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-2"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"test-2"']
          ],
          expected_response_headers: [
            ['Version', '"test-2"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
      ]
    },
    {
      name: 'Does HTTP cache store the same version multiple times for different `Parents`?',
      id: 'braid-cache-version-multiple-times-for-different-parents',
      kind: 'optimal',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"0"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"2"'],
            ['Parents', '"0"']
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"0"']
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ]
        },
      ]
    },
  ]
},
{
  id: 'braid-tests-subscribe',
  name: 'Subscribe/Multiresponse Tests',
  description: 'These tests involve braid subscription requests, which respond with `209 Multiresponse`.',
  tests: [
    {
      name: 'Does HTTP cache avoid reusing a subscription multiresponse for non-subscribed GET?',
      id: 'braid-avoid-cache-subscribed-multiresponse',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Subscribe', 'true']
          ],
          response_status: [209, 'Multiresponse'],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
          ],
        },
        {
          request_method: 'GET',
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does HTTP cache avoid reusing a subscription multiresponse for non-subscribed GET, when no `Cache-Control`?',
      id: 'braid-avoid-cache-subscribed-multiresponse-no-cache',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Subscribe', 'true']
          ],
          response_status: [209, 'Multiresponse'],
          response_headers: [
          ],
        },
        {
          request_method: 'GET',
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does HTTP cache avoid reusing a subscription multiresponse for non-subscribed GET, when adding `Subscribe` to `Vary`?',
      id: 'braid-avoid-cache-subscribed-multiresponse-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Subscribe', 'true']
          ],
          response_status: [209, 'Multiresponse'],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary','Version,Parents,Subscribe']
          ],
        },
        {
          request_method: 'GET',
          expected_type: 'not_cached',
        }
      ]
    },
  ]
}
]
