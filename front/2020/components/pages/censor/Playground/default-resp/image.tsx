import { ImageCensorRes, ImageOpenCensorRes } from 'apis/censor/image'
import img1 from '../images/playground-1.png'
import img2 from '../images/playground-2.png'
import img3 from '../images/playground-3.png'
import img4 from '../images/playground-4.png'

export const defaultResponse: { [k in string]: ImageCensorRes } = {}
export const defaultOpenResponse: { [k in string]: ImageOpenCensorRes } = {}

defaultOpenResponse[img1] = {
  code: 1100,
  message: '成功',
  entryId: '603e0213000000005512f165ca4895bc',
  score: 0,
  riskLevel: 'PASS',
  status: 0,
  detail: {
    riskType: 0,
    model: 'M1000',
    description: '正常',
    descriptionV2: ''
  }
}

defaultOpenResponse[img2] = {
  code: 1100,
  message: '成功',
  entryId: '603e0213000000005512f165ca4895bc',
  score: 0,
  riskLevel: 'PASS',
  status: 0,
  detail: {
    riskType: 0,
    model: 'M1000',
    description: '正常',
    descriptionV2: ''
  }
}

defaultOpenResponse[img3] = {
  code: 1100,
  message: '成功',
  entryId: '603e0213000000005512f165ca4895bc',
  score: 0,
  riskLevel: 'PASS',
  status: 0,
  detail: {
    riskType: 0,
    model: 'M1000',
    description: '正常',
    descriptionV2: ''
  }
}

defaultOpenResponse[img4] = {
  code: 1100,
  message: '成功',
  entryId: '603e0213000000005512f165ca4895bc',
  score: 800,
  riskLevel: 'REJECT',
  status: 0,
  detail: {
    riskType: 510,
    model: 'M103001080',
    description: '违禁：违禁品：烟草',
    descriptionV2: '违禁：违禁品：烟草'
  }
}

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
    }
  }
} as ImageCensorRes

defaultResponse[img4] = {
  suggestion: 'pass',
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
    }
  }
} as ImageCensorRes
