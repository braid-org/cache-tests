export default

{
  name: 'Braid Tests',
  id: 'braid-tests',
  description: 'Braid Tests',
  tests: [
    {
      name: '[legacy] do version/parents headers breach the proxy?',
      id: 'braid-1',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Version', '"test-1"'],
            ['Parents', '"test-2"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
            ['Parents', '"test-2"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] are version/parents headers cached?',
      id: 'braid-2',
      depends_on: [],
      requests: [
        {
          request_method: 'GET',
          response_headers: [
            ['Cache-Control', 'max-age=100000'],
            ['Date', 0],
            ['Version', '"test-1"'],
            ['Parents', '"test-2"'],
          ],
          expected_response_headers: [
            ['Version', '"test-1"'],
            ['Parents', '"test-2"'],
          ]
        },
        {
          request_method: 'GET',
          expected_type: 'cached',
          expected_response_headers: [
            ['Version', '"test-1"'],
            ['Parents', '"test-2"'],
          ]
        }
      ]
    },
    {
      name: '[legacy] cache one version, then request it, should be HIT!',
      id: 'braid-3',
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
        }
      ]
    },
    {
      name: '[legacy] cache one version, then request another, should be MISS!',
      id: 'braid-4',
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
      name: '[legacy] cache one version, then request current, should be MISS!',
      id: 'braid-5',
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
      name: '[legacy] cache current, then request current, should be HIT!',
      id: 'braid-6',
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
        }
      ]
    },
    {
      name: '[legacy] cache current, then request that version, should be HIT!',
      id: 'braid-7',
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
      name: '[legacy] cache current, then request another, should be MISS!',
      id: 'braid-8',
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
      name: '[legacy] is a PUT with a version cached?',
      id: 'braid-9',
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
      name: '[upgrade 1]: cache one version, then another, then request first, should HIT!',
      id: 'braid-10',
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
        }
      ]
    },

    {
      name: '[upgrade 2]: ask for old, then for current, should HIT!',
      id: 'braid-11',
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
      name: '[upgrade 2]: ask for old, then for another, should HIT!',
      id: 'braid-12',
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
      name: '[upgrade 2]: ask for old, then subscribe, should HIT!',
      id: 'braid-13',
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
      name: '[upgrade 2]: PUT version, then request it, should HIT!',
      id: 'braid-14',
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
    {
      name: '[upgrade 2]: PUT version, then PUT it again, should HIT!',
      id: 'braid-15',
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
          request_method: 'PUT',
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
    {
      name: '[upgrade 2]: PUT version, then request most recent, should HIT!',
      id: 'braid-16',
      depends_on: [],
      requests: [
        {
          request_method: 'PUT',
          request_headers: [
            ['Version', '"test-0"'],
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
  ]
}
