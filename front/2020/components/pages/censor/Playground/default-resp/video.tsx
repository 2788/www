import { VideoJobResult } from 'apis/censor/video'

export const videos = [
  'https://dn-mars-assets.qbox.me/Fi1UC6waXtXYCpnTGHa8XxIziGNk',
  'https://dn-mars-assets.qbox.me/Fos2uiHzcuvF6HZF3RarMp9J1ewZ',
  'https://dn-mars-assets.qbox.me/FgV6wvTgRv8ZgUZBecKojdIlfs58',
  'https://dn-mars-assets.qbox.me/lrBYuiLwg0zFRUP97w59FmmN6H01'
]
export const defaultResponse: { [k in string]: VideoJobResult } = {}

defaultResponse[videos[0]] = {
  suggestion: 'review',
  scenes:
  {
    ads:
    {
      cuts: [
        { offset: 0, suggestion: 'pass' },
        { offset: 5005, suggestion: 'pass' },
        { offset: 10010, suggestion: 'pass' }
      ],
      suggestion: 'pass'
    },
    politician:
    {
      cuts: [
        { offset: 0, suggestion: 'pass' },
        { offset: 5005, suggestion: 'pass' },
        { offset: 10010, suggestion: 'pass' }
      ],
      suggestion: 'pass'
    },
    pulp:
    {
      cuts: [
        {
          details: [{ label: 'normal', score: 0.95569, suggestion: 'pass' }],
          offset: 0,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.90453, suggestion: 'pass' }],
          offset: 5005,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'sexy', score: 0.50264335, suggestion: 'review' }],
          offset: 10010,
          suggestion: 'review'
        }
      ],
      suggestion: 'review'
    },
    terror:
    {
      cuts: [{
        details: [{ label: 'normal', score: 0.94821, suggestion: 'pass' }],
        offset: 0,
        suggestion: 'pass'
      },
      {
        details: [{ label: 'normal', score: 0.99809, suggestion: 'pass' }],
        offset: 5005,
        suggestion: 'pass'
      },
      {
        details: [{ label: 'normal', score: 0.96745, suggestion: 'pass' }],
        offset: 10010,
        suggestion: 'pass'
      }
      ],
      suggestion: 'pass'
    }
  }
} as VideoJobResult

defaultResponse[videos[1]] = {
  suggestion: 'block',
  scenes: {
    ads: {
      cuts: [
        { offset: 0, suggestion: 'pass' },
        { offset: 5000, suggestion: 'pass' },
        { offset: 10000, suggestion: 'pass' }
      ],
      suggestion: 'pass'
    },
    politician: {
      cuts: [
        { offset: 0, suggestion: 'pass' },
        { offset: 5000, suggestion: 'pass' },
        { offset: 10000, suggestion: 'pass' }
      ],
      suggestion: 'pass'
    },
    pulp: {
      cuts: [
        {
          details: [
            { label: 'normal', score: 0.96582, suggestion: 'pass' }
          ],
          offset: 0,
          suggestion: 'pass'
        },
        {
          details: [
            { label: 'normal', score: 0.96425, suggestion: 'pass' }
          ],
          offset: 5000,
          suggestion: 'pass'
        },
        {
          details: [
            { label: 'normal', score: 0.96301, suggestion: 'pass' }
          ],
          offset: 10000,
          suggestion: 'pass'
        }
      ],
      suggestion: 'pass'
    },
    terror: {
      cuts: [
        {
          details: [
            { label: 'army', score: 0.70625, suggestion: 'pass' },
            {
              detections: [
                {
                  pts: [[8, 143], [815, 143], [815, 687], [8, 687]],
                  score: 0.9995523
                }
              ],
              label: 'guns',
              score: 0.9995523,
              suggestion: 'block'
            }
          ],
          offset: 0,
          suggestion: 'block'
        },
        {
          details: [
            { label: 'army', score: 0.7112434, suggestion: 'pass' },
            {
              detections: [
                {
                  pts: [[18, 142], [807, 142], [807, 683], [18, 683]],
                  score: 0.9994885
                }
              ],
              label: 'guns',
              score: 0.9994885,
              suggestion: 'block'
            }
          ],
          offset: 5000,
          suggestion: 'block'
        },
        {
          details: [
            { label: 'army', score: 0.81021, suggestion: 'pass' },
            {
              detections: [
                {
                  pts: [[7, 143], [814, 143], [814, 689], [7, 689]],
                  score: 0.9972589
                }
              ],
              label: 'guns',
              score: 0.9972589,
              suggestion: 'block'
            }
          ],
          offset: 10000,
          suggestion: 'block'
        }
      ],
      suggestion: 'block'
    }
  }
} as VideoJobResult

defaultResponse[videos[2]] = {
  suggestion: 'block',
  scenes: {
    ads:
    {
      cuts: [{ offset: 0, suggestion: 'pass' }, { offset: 5000, suggestion: 'pass' }],
      suggestion: 'pass'
    },
    politician:
    {
      cuts: [{ offset: 0, suggestion: 'pass' }, { offset: 5000, suggestion: 'pass' }],
      suggestion: 'pass'
    },
    pulp:
    {
      cuts: [
        {
          details: [{ label: 'normal', score: 0.86543, suggestion: 'pass' }],
          offset: 0,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.89179, suggestion: 'pass' }],
          offset: 5000,
          suggestion: 'pass'
        }
      ],
      suggestion: 'pass'
    },
    terror:
    {
      cuts: [
        {
          details: [
            { label: 'army', score: 0.52153003, suggestion: 'pass' },
            {
              detections: [
                { pts: [[651, 276], [768, 276], [768, 334], [651, 334]], score: 0.9809624 },
                { pts: [[293, 268], [489, 268], [489, 419], [293, 419]], score: 0.95527136 }
              ],
              label: 'guns',
              score: 0.9809624,
              suggestion: 'block'
            }
          ],
          offset: 0,
          suggestion: 'block'
        },
        {
          details: [
            { label: 'army', score: 0.52832997, suggestion: 'pass' },
            {
              detections: [
                { pts: [[650, 275], [769, 275], [769, 343], [650, 343]], score: 0.974316 },
                { pts: [[293, 267], [487, 267], [487, 420], [293, 420]], score: 0.9475502 }
              ],
              label: 'guns',
              score: 0.974316,
              suggestion: 'block'
            }
          ],
          offset: 5000,
          suggestion: 'block'
        }
      ],
      suggestion: 'block'
    }
  }
} as VideoJobResult

defaultResponse[videos[3]] = {
  suggestion: 'review',
  scenes: {
    ads: {
      cuts: [{
        details: [{ label: 'summary_normal', score: 1, suggestion: 'pass' }],
        offset: 0,
        suggestion: 'pass'
      },
      {
        offset: 5005,
        suggestion: 'pass'
      },
      {
        offset: 10010,
        suggestion: 'pass'
      },
      {
        offset: 15015,
        suggestion: 'pass'
      }
      ],
      suggestion: 'pass'
    },
    politician: {
      cuts: [
        { offset: 0, suggestion: 'pass' },
        {
          details: [
            {
              detections: [
                { pts: [[412, 35], [859, 35], [859, 620], [412, 620]], score: 0.75153 }
              ],
              group: 'foreign_statesman',
              label: '唐纳德·特朗普',
              sample: {
                pts: [[123, 159], [362, 159], [362, 462], [123, 462]],
                uri: 'http://peps.ai.qiniuapi.com/img-68b0882c59b6427cb70da2d2bd0ee0a9.jpg'
              },
              score: 0.75153,
              suggestion: 'review'
            }
          ],
          offset: 5005,
          suggestion: 'review'
        },
        { offset: 10010, suggestion: 'pass' },
        { offset: 15015, suggestion: 'pass' }
      ],
      suggestion: 'review'
    },
    pulp: {
      cuts: [
        {
          details: [{ label: 'normal', score: 0.98574, suggestion: 'pass' }],
          offset: 0,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.98197, suggestion: 'pass' }],
          offset: 5005,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.97654, suggestion: 'pass' }],
          offset: 10010,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.9932, suggestion: 'pass' }],
          offset: 15015,
          suggestion: 'pass'
        }
      ],
      suggestion: 'pass'
    },
    terror:
    {
      cuts: [
        {
          details: [{ label: 'normal', score: 0.412955, suggestion: 'pass' }],
          offset: 0,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.99762, suggestion: 'pass' }],
          offset: 5005,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.99994, suggestion: 'pass' }],
          offset: 10010,
          suggestion: 'pass'
        },
        {
          details: [{ label: 'normal', score: 0.72673, suggestion: 'pass' }],
          offset: 15015,
          suggestion: 'pass'
        }
      ],
      suggestion: 'pass'
    }
  }
} as VideoJobResult
