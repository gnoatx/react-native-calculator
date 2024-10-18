import { mult } from './calculate'

export const number = (num: number, eq: string, set: React.Dispatch<React.SetStateAction<string>>, setFont: React.Dispatch<React.SetStateAction<number>>) => {
    
  //Checa se há um zero insignificante, e o remove
  if (eq.endsWith(' 0')) set(prev => prev.slice(0, -1))
  
  if (eq.length >= 6) setFont(44)
  set(prev => prev + num.toString())
}

export const operator = (op: string, eq: string, set: React.Dispatch<React.SetStateAction<string>>, setFont: React.Dispatch<React.SetStateAction<number>>) => {
  if (eq.length === 0) return;
  if (eq.endsWith('(')) return;
  
  //Checa se já há um operador sozinho no final da equação, e o remove
  if (eq.endsWith(' ')) set(prev => prev.slice(0, -3))
    
  if (eq.length >= 5) setFont(44)
  set(prev => prev + ' ' + op + ' ')
}

export const dot = (eq: string, set: React.Dispatch<React.SetStateAction<string>>) => {
  if (eq.endsWith(',')) return;
  if (eq.endsWith(' ')) return set(prev => prev + '0,')
  set(prev => prev + ',')
}

export const parenthesis = (eq: string, set: React.Dispatch<React.SetStateAction<string>>) => {
  if (eq.length === 0) return set('(')

  //Adiciona um '(' se o último caráter é '(' ou um espaço ' ', que indica presença de um operador
  if (eq.endsWith('(') || eq.endsWith(' ')) return set(prev => prev + '(')

  if (eq.endsWith(',')) return; 

  //Checa se o último caráter é um dígito de 0 a 9, um '%' ou um ')'
  if (/[0-9%)]$/.test(eq.at(-1) as string)) {

    //Checa a quantidade de '(' contra a quantidade de ')'
    const countOpenParenthesis = [...eq.matchAll(/\(/g)].length
    const countCloseParenthesis = [...eq.matchAll(/\)/g)].length
    if (countOpenParenthesis > countCloseParenthesis) return set(prev => prev + ')')
  }

  //Adiciona um ' × (' se não há nenhum abre parenteses solitário
  if (/[0-9%)]$/.test(eq.at(-1) as string)) return set(prev => prev + ` ${mult} (`)
}

export const percent = (eq: string, set: React.Dispatch<React.SetStateAction<string>>, setFont: React.Dispatch<React.SetStateAction<number>>) => {
  if (eq.endsWith('%')) return;
  if (eq.endsWith(' ')) return;

  if (eq.length >= 6) setFont(44)
  set(prev => prev + '%')
}

export const equals = (setEq: React.Dispatch<React.SetStateAction<string>>, res: string, setRes: React.Dispatch<React.SetStateAction<string>>, setFont: React.Dispatch<React.SetStateAction<number>>) => {
  if (res === 'NaN' || res === '') return;

  setEq(res)
  if (res.length <= 6) setFont(88);
  setRes('')
}

export const backspace = (eq: string, set: React.Dispatch<React.SetStateAction<string>>) => {
  if (eq.endsWith(' ')) set(prev => prev.slice(0, -3))
  else set(prev => prev.slice(0, -1))
}