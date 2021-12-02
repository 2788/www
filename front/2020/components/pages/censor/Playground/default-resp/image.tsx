import { ImageResult } from 'apis/censor/image'
import img1 from '../images/playground-1.png'
import img2 from '../images/playground-2.png'
import img3 from '../images/playground-3.png'
import img4 from '../images/playground-4.png'

export const defaultResponse: { [k in string]: ImageResult } = {}

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
    },
    behavior: {
      suggestion: 'pass',
      details: [{ suggestion: 'pass', label: 'normal', score: 0.99 }]
    }
  }
}

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
    },
    behavior: {
      suggestion: 'block',
      details: [
        { suggestion: 'block', label: 'behavior', score: 0.8 }
      ]
    }
  }
}

defaultResponse[img3] = {
  suggestion: 'block',
  scenes: {
    ads: {
      suggestion: 'block',
      details: [
        {
          suggestion: 'block',
          label: 'ad',
          score: 0.9991
        }
      ]
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
          score: 0.9265724
        }
      ]
    },
    terror: {
      suggestion: 'pass',
      details: [
        {
          suggestion: 'pass',
          label: 'normal',
          score: 0.73546
        }
      ]
    },
    behavior: {
      suggestion: 'pass',
      details: [{ suggestion: 'pass', label: 'normal', score: 0.99 }]
    }
  }
}

defaultResponse[img4] = {
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
          score: 0.9056719
        }
      ]
    },
    terror: {
      suggestion: 'pass',
      details: [{
        suggestion: 'pass',
        label: 'normal',
        score: 0.84688
      }]
    },
    behavior: {
      suggestion: 'block',
      details: [
        { suggestion: 'block', label: 'behavior', score: 0.85 }
      ]
    }
  }
}
