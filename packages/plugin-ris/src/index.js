import { plugins } from '@citation-js/core'
import config from './config'
import { parse, parseNew, parseOld, parseMixed, format } from './ris'

const oldProps = ['A1', 'AV', 'BT', 'CP', 'ED', 'EP', 'ID', 'J1', 'JA', 'JF', 'JO', 'L2', 'L3', 'N2', 'T1', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'Y1']
const newProps = ['A4', 'AD', 'AN', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'CA', 'CN', 'DA', 'DB', 'DO', 'DP', 'ET', 'LA', 'LB', 'NV', 'OP', 'PY', 'RI', 'RN', 'SE', 'ST', 'SV', 'TA', 'TT']

plugins.add('@ris', {
  input: {
    '@ris/file': {
      parse,
      parseType: {
        dataType: 'String',
        predicate: /^TY {2}- /m
      }
    },
    '@ris/record': {
      parse: parseMixed,
      parseType: {
        dataType: 'SimpleObject',
        propertyConstraint: {
          props: ['TY']
        }
      }
    },
    '@ris/new+record': {
      parse: parseNew,
      parseType: {
        extends: '@ris/record',
        propertyConstraint: [
          { props: newProps, match: 'some' },
          { props: oldProps, match: 'none' }
        ]
      }
    },
    '@ris/old+record': {
      parse: parseOld,
      parseType: {
        extends: '@ris/record',
        propertyConstraint: [
          { props: oldProps, match: 'some' },
          { props: newProps, match: 'none' }
        ]
      }
    }
  },
  config,
  output: { ris: format }
})
