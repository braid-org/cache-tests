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
      name: 'Does cache avoid reusing a response with the right `Parents` but wrong `Version`?',
      id: 'braid-not-reuse-parents-and-diff-version',
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
            ['Version', '"3"'],
            ['Parents', '"1"'],
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
      name: 'Does cache avoid reusing an incorrect version to an unversioned request?',
      id: 'braid-avoid-bad-version-to-unversioned',
      depends_on: [],
      requests: [
        // First GET (and cache?) a version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
        },
        // Then GET (and cache?) a newer version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
        },
        // Then GET (and cache?) an old version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"'],
            ['Parents', '"0"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
            ['Parents', '"0"']
          ],
        },
        // Finally GET with no explicit version; asking for the current version.
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
          expected_response_headers: [
            ['Version', '"3"'],
            ['Parents', '"2"'],
          ]
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
  name: 'Legacy Caches + `Vary: version, parents` header',
  description: 'If server responds with `Vary: version, parents`, legacy caches are able to distinguish versions correctly',
  tests: [
    {
      name: 'Does `Version` header pass through cache unscathed?',
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
      name: 'Does `Parents` header pass through cache unscathed?',
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
      name: 'Does `Version` header get cached with response?',
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
      name: 'Does `Parents` header get cached with response?',
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
      name: 'Does response with a `Version` get cached and reused?',
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
            ['Version', '"1"'],
            ['Vary', 'Version,Parents'],
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
            ['Parents', '"1"'],
            ['Vary', 'Version,Parents'],
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
            ['Version', '"1"'],
            ['Vary', 'Version,Parents'],
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
      id: 'braid-avoid-different-parents-with-vary',
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
            ['Vary', 'Version,Parents'],
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
            ['Version', '"2"'],
            ['Parents', '"1"'],
            ['Vary', 'Version,Parents'],
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
      name: 'Does cache avoid reusing a response with the right `Parents` but wrong `Version`?',
      id: 'braid-not-reuse-parents-and-diff-version-with-vary',
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
            ['Vary', 'Version,Parents'],
          ],
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"3"'],
            ['Parents', '"1"'],
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does cache avoid reusing an unversioned response to a versioned request?',
      id: 'braid-avoid-no-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
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
            ['Vary', 'Version,Parents'],
          ],
          expected_response_headers: [
            ['Version', '"1"'],
          ],
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: 'Does cache avoid reusing an incorrect version to an unversioned request?',
      id: 'braid-avoid-bad-version-to-unversioned-with-vary',
      depends_on: [],
      requests: [
        // First GET (and cache?) a version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
        },
        // Then GET (and cache?) a newer version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
        },
        // Then GET (and cache?) an old version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"'],
            ['Parents', '"0"']
          ],
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
            ['Parents', '"0"']
          ],
        },
        // Finally GET with no explicit version; asking for the current version.
        {
          request_method: 'GET',
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
          expected_response_headers: [
            ['Version', '"3"'],
            ['Parents', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Does cache avoid reusing a `309: Version Unknown Here` response?',
      id: 'braid-avoid-309-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"']
          ],
          response_status: [309, 'Version Unknown Here'],
          response_headers: [
            ['Vary', 'Version,Parents'],
          ],
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
  description: 'Can a cache store multiple versions? And can it cache based on a response `Version`?  (These presume `Vary: version, parents`.)',
  tests: [
    {
      name: 'Can cache store two versions of the same resource simultaneously?',
      id: 'braid-reuse-multiple-versions',
      kind: 'optimal',
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
            ['Vary', 'version,parents'],
            ['Version', '"1"']
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
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'version,parents'],
            ['Version', '"2"']
          ],
          expected_response_headers: [
            ['Version', '"2"'],
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
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Can cache store multiple responses for multiple `Parents`?',
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
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"0"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"2"'],
            ['Parents', '"0"']
          ]
        }
      ]
    },
    {
      name: 'Is cache able to reuse a `Version` if the request didn\'t specify it?',
      id: 'braid-reuse-matching-version-with-vary',
      kind: 'optimal',
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
          request_headers: [
            ['Version', '"1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
    {
      name: 'Can cache infer which `Version` is current?',
      id: 'braid-know-current-among-multiple',
      depends_on: [],
      kind: 'optimal',
      requests: [
        // First GET (and cache?) a version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"2"'],
            ['Parents', '"1"']
          ],
        },
        // Then GET (and cache?) a newer version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"3"'],
            ['Parents', '"2"']
          ],
        },
        // Then GET (and cache?) an old version
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1"'],
            ['Parents', '"0"']
          ],
          response_headers: [
            ['Vary', 'Version,Parents'],
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"1"'],
            ['Parents', '"0"']
          ],
        },

        // Finally GET with no explicit version; asking for the current version.
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"3"'],
            ['Parents', '"2"'],
          ]
        }
      ]
    },
    {
      name: 'Can cache recognize the ordering of strings in a `Version` does not matter?',
      id: 'braid-reuse-unordered-version-with-vary',
      kind: 'optimal',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"1", "2"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version,Parents'],
            ['Version', '"1", "2"'],
          ],
          expected_response_headers: [
            ['Version', '"1", "2"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"2", "1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
  ]
},
// {
//   id: 'braid-tests-subscribe',
//   name: 'Subscribe/Multiresponse Tests',
//   description: 'These tests involve braid subscription requests, which respond with `209 Multiresponse`.',
//   tests: [
//     {
//       name: 'Does HTTP cache avoid reusing a subscription multiresponse for non-subscribed GET?',
//       id: 'braid-avoid-cache-subscribed-multiresponse',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Subscribe', 'true']
//           ],
//           response_status: [209, 'Multiresponse'],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//           ],
//         },
//         {
//           request_method: 'GET',
//           expected_type: 'not_cached',
//         }
//       ]
//     },
//     {
//       name: 'Does HTTP cache avoid reusing a subscription multiresponse for non-subscribed GET, when no `Cache-Control`?',
//       id: 'braid-avoid-cache-subscribed-multiresponse-no-cache',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Subscribe', 'true']
//           ],
//           response_status: [209, 'Multiresponse'],
//           response_headers: [
//           ],
//         },
//         {
//           request_method: 'GET',
//           expected_type: 'not_cached',
//         }
//       ]
//     },
//     {
//       name: 'Does HTTP cache avoid reusing a subscription multiresponse for non-subscribed GET, when adding `Subscribe` to `Vary`?',
//       id: 'braid-avoid-cache-subscribed-multiresponse-with-vary',
//       depends_on: [],
//       requests: [
//         {
//           request_method: 'GET',
//           request_headers: [
//             ['Subscribe', 'true']
//           ],
//           response_status: [209, 'Multiresponse'],
//           response_headers: [
//             ['Cache-Control', 'max-age=100000'],
//             ['Date', 0],
//             ['Vary','Version,Parents,Subscribe']
//           ],
//         },
//         {
//           request_method: 'GET',
//           expected_type: 'not_cached',
//         }
//       ]
//     },
//   ]
// }
]
