export const mult = '×'
export const div = '÷'
export const root = '√'
export const pi = 'π'

export type Operator = '+' | '-' | '×' | '÷' | '^' | '√'

function evaluateBinaryEquation(leftSide: string, operator: Operator, rightSide: string): string {
  const left = parseFloat(leftSide)
  const right = parseFloat(rightSide)
  let value: number

  switch (operator) {
    case '+':
      value = left + right
      break
    case '-':
      value = left - right
      break
    case mult:
      value = left * right
      break
    case div:
      value = left / right
      break
    case '^':
      value = Math.pow(left, right)
      break
    case root:
      value = Math.pow(right, 1 / left)
      break
    default:
      value = NaN
      break
  }
  return value.toString()
}

export function calculate(eq: string): string {

  if (eq.length === 0) return ''
  if (eq.length === 1) return eq

  const equation = eq.replaceAll(',', '.')
  
  // while (equation.includes('(')) {
  //   const openParenthesisIndex = equation.lastIndexOf('(')
  //   const closeParenthesisIndex = equation.indexOf(')', openParenthesisIndex)

  //   if (closeParenthesisIndex === -1) return ''

  //   const parentesesExpression = equation.slice(openParenthesisIndex + 1, closeParenthesisIndex)
  //   const parenthesesResult = calculate(parentesesExpression)
  //   equation.replace(`(${parentesesExpression})`, parenthesesResult)
  // }

  let value = equation.split(' ')

  while (value.length > 1) {
    let operatorIndex = value.findIndex((i) => i === '^' || i === root)
    if (operatorIndex === -1) operatorIndex = value.findIndex((i) => i === mult || i === div)
    if (operatorIndex === -1) operatorIndex = value.findIndex((i) => i === '+' || i === '-')
    if (operatorIndex === -1) break

    const currentLeft = value[operatorIndex - 1]
    const currentRight = value[operatorIndex + 1]

    const currentWork = evaluateBinaryEquation(currentLeft, value[operatorIndex] as Operator, currentRight)
    value.splice(operatorIndex - 1, 3, currentWork)
  }
  return value[0].replaceAll('.', ',') || '0'
}