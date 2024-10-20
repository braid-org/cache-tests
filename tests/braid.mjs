export default {
  name: 'Braid Tests',
  id: 'braid-tests',
  description: 'Braid Tests',
  tests: [
    {
      name: '[legacy] Does HTTP cache allow `Version` header to pass through?',
      id: 'braid-version-header-passthrough',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache allow `Parents` header to pass through?',
      id: 'braid-parents-header-passthrough',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Parents', '"test-2"'],
          ],
          expected_response_headers: [
            ['Parents', '"test-2"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache store `Version` header?',
      id: 'braid-store-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache store `Parents` header?',
      id: 'braid-store-parents',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Parents', '"test-2"'],
          ],
          expected_response_headers: [
            ['Parents', '"test-2"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Parents', '"test-2"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache reuse a response with a `Version`, from a request with a `Version`, when requesting the same `Version`?',
      id: 'braid-reuse-same-version',
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
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
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
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache avoid reusing a response with a `Version`, from a request with a `Version`, when requesting a different `Version`?',
      id: 'braid-avoid-different-version',
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
            ['Version', '"test-1"'],
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
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache avoid reusing a response with a `Version`, from a request with a `Version`, when requesting without a `Version`?',
      id: 'braid-avoid-no-version',
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
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache reuse a response with a `Version`, from a request without a `Version`, when requesting without a `Version` again?',
      id: 'braid-reuse-no-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache reuse a response with a `Version`, from a request without a `Version`, when requesting the same `Version`?',
      id: 'braid-reuse-matching-version',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache avoid reusing a response with a `Version`, from a request without a `Version`, when requesting a different `Version`?',
      id: 'braid-cache-miss-different',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
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
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: '[legacy w/Vary] Does HTTP cache reuse a response with a `Version` and `Vary: Version`, from a request with a `Version`, when requesting the same `Version`?',
      id: 'braid-reuse-same-version-with-vary',
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
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
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
        }
      ]
    },
    {
      name: '[legacy w/Vary] Does HTTP cache avoid reusing a response with a `Version` and `Vary: Version`, from a request with a `Version`, when requesting a different `Version`?',
      id: 'braid-avoid-different-version-with-vary',
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
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
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
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: '[legacy w/Vary] Does HTTP cache avoid reusing a response with a `Version` and `Vary: Version`, from a request with a `Version`, when requesting without a `Version`?',
      id: 'braid-avoid-no-version-with-vary',
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
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'not_cached',
        }
      ]
    },
    {
      name: '[legacy w/Vary] Does HTTP cache reuse a response with a `Version` and `Vary: Version`, from a request without a `Version`, when requesting without a `Version` again?',
      id: 'braid-reuse-no-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        }
      ]
    },
    {
      name: '[legacy w/Vary] Does HTTP cache reuse a response with a `Version` and `Vary: Version`, from a request without a `Version`, when requesting the same `Version`?',
      id: 'braid-reuse-matching-version-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
    {
      name: '[legacy w/Vary] Does HTTP cache avoid reusing a response with a `Version` and `Vary: Version`, from a request without a `Version`, when requesting a different `Version`?',
      id: 'braid-cache-miss-different-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
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
          expected_type: 'not_cached',
        }
      ]
    },    
    {
      name: '[legacy] Does HTTP cache reuse a response to a PUT with a `Version` when PUT\'ing the same `Version` again?',
      id: 'braid-put-version-cached',
      depends_on: [],
      requests: [
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
    {
      name: '[legacy] Does HTTP cache reuse a PUT request with a `Version` when GET\'ing the same `Version` again?',
      id: 'braid-put-then-get',
      depends_on: [],
      requests: [
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
        }
      ]
    },
    {
      name: '[upgrade 1]: Does HTTP cache reuse a response with one `Version`, if it caches a response with a second `Version`, before a request for the original `Version`?',
      id: 'braid-cache-multiple-hit-first',
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
            ['Version', '"test-1"'],
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
            ['Version', '"test-2"'],
          ],
          expected_type: 'not_cached',
          expected_response_headers: [
            ['Version', '"test-2"'],
          ],
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ],
        }
      ]
    },
    {
      name: '[upgrade 1]: Does HTTP cache reuse a PUT request with one `Version`, if it caches a PUT request with a second `Version`, before a request for the original `Version`?',
      id: 'braid-put-multiple-hit-first',
      depends_on: [],
      requests: [
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-2"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-2"'],
          ],
          expected_type: 'not_cached',
          expected_response_headers: [
            ['Version', '"test-2"'],
          ],
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ],
        }
      ]
    },
    {
      name: '[upgrade 1 w/Vary]: Does HTTP cache reuse a response with one `Version` (and `Vary: Version`), if it caches a response with a second `Version` (also with `Vary`), before a request for the original `Version`?',
      id: 'braid-cache-multiple-hit-first-with-vary',
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
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
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
            ['Vary', 'Version'],
            ['Version', '"test-2"'],
          ],
          expected_type: 'not_cached',
          expected_response_headers: [
            ['Version', '"test-2"'],
          ],
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ],
        }
      ]
    },
    {
      name: '[upgrade 1 w/Vary]: Does HTTP cache reuse a PUT request with one `Version` (and `Vary: Version` in the response), if it caches a PUT request with a second `Version` (also with `Vary: Version` in the resonse), before a request for the original `Version`?',
      id: 'braid-put-multiple-hit-first-with-vary',
      depends_on: [],
      requests: [
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-1"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version'],
            ['Version', '"test-1"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ]
        },
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-2"']
          ],
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Vary', 'Version'],
            ['Version', '"test-2"'],
          ],
          expected_type: 'not_cached',
          expected_response_headers: [
            ['Version', '"test-2"'],
          ],
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ],
        }
      ]
    },
    {
      name: '[upgrade 2]: After HTTP cache handles a request for an old `Version`, it should respond from cache with latest `Version` when requesting without a `Version`.',
      id: 'braid-old-then-current-hit',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-0"']
          ],
          expected_response_headers: [
            ['Version', '"test-0"'],
          ]
        },
        {
          request_method: 'GET',
          expected_response_headers: [
            ['Version', '"test-1"'],
          ],
          expected_type: 'cached',
        },
      ]
    },
    {
      name: '[upgrade 2]: After HTTP cache handles a request for an old `Version`, it should respond from cache when requesting a different `Version`.',
      id: 'braid-old-then-another-hit',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-0"']
          ],
          expected_response_headers: [
            ['Version', '"test-0"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-1"']
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
          ],
          expected_type: 'cached',
        },
      ]
    },
    {
      name: '[upgrade 2]: After HTTP cache handles a request for an old `Version`, it should respond from cache when requesting with `Subscribe: true`.',
      id: 'braid-old-then-subscribe-hit',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-0"']
          ],
          expected_response_headers: [
            ['Version', '"test-0"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Subscribe', 'true']
          ],
          expected_response_headers: [
            ['Subscribe', 'true'],
          ],
          expected_type: 'cached',
        },
      ]
    },
    {
      name: '[upgrade 2]: After HTTP cache handles a PUT with a `Version`, it should respond from cache when requesting that `Version` again.',
      id: 'braid-put-then-get-hit',
      depends_on: [],
      requests: [
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-2"'],
          ],
          expected_response_headers: [
            ['Version', '"test-2"'],
          ]
        },
        {
          request_method: 'GET',
          request_headers: [
            ['Version', '"test-2"'],
          ],
          expected_response_headers: [
            ['Version', '"test-2"'],
          ],
          expected_type: 'cached',
        },
      ]
    },
  ]
}
