import { ImageCensorRes } from 'apis/censor/image'
import img1 from '../images/playground-1.png'
import img2 from '../images/playground-2.png'
import img3 from '../images/playground-3.png'

export const defaultResponse: { [k in string]: ImageCensorRes } = {}

defaultResponse[img1] = {
  suggestion: 'review',
  scenes: {
    ads: {
      suggestion: 'pass'
    },
    politician: {
      suggestion: 'pass'
    },
    pulp: {
      suggestion: 'review',
      details: [
        {
          suggestion: 'review',
          label: 'sexy',
          score: 0.74762
        }
      ]
    },
    terror: {
      suggestion: 'pass',
      details: [{
        suggestion: 'pass',
        label: 'normal',
        score: 0.8947
      }]
    }
  }
} as ImageCensorRes

defaultResponse[img2] = {
  suggestion: 'block',
  scenes: {
    ads: {
      suggestion: 'pass'
    },
    politician: {
      suggestion: 'pass'
    },
    pulp: {
      suggestion: 'pass',
      details: [
        {
          suggestion: 'pass',
          label: 'normal',
          score: 0.96497
        }
      ]
    },
    terror: {
      suggestion: 'block',
      details: [
        {
          suggestion: 'pass',
          label: 'army',
          score: 0.7951
        },
        {
          suggestion: 'block',
          label: 'guns',
          score: 0.9840099,
          detections: [
            {
              pts: [
                [158, 104],
                [576, 104],
                [576, 261],
                [158, 261]
              ],
              score: 0.9840099
            },
            {
              pts: [
                [559, 471],
                [877, 471],
                [877, 638],
                [559, 638]
              ],
              score: 0.98297876
            }
          ]
        }
      ]
    }
  }
} as ImageCensorRes

defaultResponse[img3] = {
  suggestion: 'block',
  scenes: {
    ads: {
      suggestion: 'pass'
    },
    politician: {
      suggestion: 'pass'
    },
    pulp: {
      suggestion: 'pass',
      details: [
        {
          suggestion: 'pass',
          label: 'normal',
          score: 0.9787
        }
      ]
    },
    terror: {
      suggestion: 'block',
      details: [
        {
          suggestion: 'pass',
          label: 'normal',
          score: 0.37405
        },
        {
          suggestion: 'block',
          label: 'guns',
          score: 0.9980993,
          detections: [
            {
              pts: [
                [3, 97],
                [936, 97],
                [936, 673],
                [3, 673]
              ],
              score: 0.9980993
            }
          ]
        }
      ]
    }
  }
} as ImageCensorRes
