import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Button } from './src/components/Button';
import { calculate, mult, div, root, pi } from './src/utils/calculate';
import * as append from './src/utils/buttonHandlers';
import { BonusButton } from './src/components/bonusButton';

SplashScreen.preventAutoHideAsync()

const font = 'ReadexPro'

export default function App() {
  const [isLoaded] = useFonts({
    "Gabarito": require("./assets/fonts/Gabarito-VariableFont_wght.ttf"),
    "GothicA1": require("./assets/fonts/GothicA1-Regular.ttf"),
    "ReadexPro": require("./assets/fonts/ReadexPro-VariableFont_HEXP,wght.ttf"),
    "RethinkSans": require("./assets/fonts/RethinkSans-VariableFont_wght.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  const [equation, setEquation] = useState('')
  const [result, setResult] = useState('')
  const [equationFontSize, setEquationFontSize] = useState(88)
      
  useEffect(() => {
    if (/^-?\d+[,]?\d*$/.test(equation)) return setResult('')
    setResult(calculate(equation))
  }, [equation])

  const equationStyle = StyleSheet.create({
    equation: {
      color: '#dfe1dd',
      fontSize: equationFontSize,
      fontFamily: font,
      textAlign: 'center',
      width: '90%',
    }
  })

  return (
    <View style={styles.container} onLayout={handleOnLayout}> 
      <View style={styles.screen}>
        <Text
          style={equationStyle.equation}
          adjustsFontSizeToFit={true}
          numberOfLines={2}
          >{equation}</Text>
        <Text
          style={styles.result}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          >{result}</Text>
      </View>
      <View style={styles.bonusRow}>
        <BonusButton onPress={() => append.operator(root, equation, setEquation, setEquationFontSize)}>{root}</BonusButton>
        <BonusButton onPress={() => append.number(3.14, equation, setEquation, setEquationFontSize)}>{pi}</BonusButton>
        <BonusButton onPress={() => append.operator('^', equation, setEquation, setEquationFontSize)}>{'^'}</BonusButton>
        <BonusButton onPress={() => append.operator('!', equation, setEquation, setEquationFontSize)}>{'!'}</BonusButton>
      </View>
      <View style={styles.topRow}>
        <Button style={acButton} onPress={() => setEquation('')}>{'AC'}</Button>
        <Button style={operatorButton} onPress={() => append.parenthesis(equation, setEquation)}>{'( )'}</Button>
        <Button style={operatorButton} onPress={() => append.percent(equation, setEquation, setEquationFontSize)}>{'%'}</Button>
        <Button style={operatorButton} onPress={() => append.operator(div, equation, setEquation, setEquationFontSize)}>{div}</Button>
      </View>
      <View style={styles.keyboard}>
        <View style={styles.numpad}>
          <Button style={numberButton} onPress={() => append.number(7, equation, setEquation, setEquationFontSize)}>{7}</Button>
          <Button style={numberButton} onPress={() => append.number(8, equation, setEquation, setEquationFontSize)}>{8}</Button>
          <Button style={numberButton} onPress={() => append.number(9, equation, setEquation, setEquationFontSize)}>{9}</Button>

          <Button style={numberButton} onPress={() => append.number(4, equation, setEquation, setEquationFontSize)}>{4}</Button>
          <Button style={numberButton} onPress={() => append.number(5, equation, setEquation, setEquationFontSize)}>{5}</Button>
          <Button style={numberButton} onPress={() => append.number(6, equation, setEquation, setEquationFontSize)}>{6}</Button>

          <Button style={numberButton} onPress={() => append.number(1, equation, setEquation, setEquationFontSize)}>{1}</Button>
          <Button style={numberButton} onPress={() => append.number(2, equation, setEquation, setEquationFontSize)}>{2}</Button>
          <Button style={numberButton} onPress={() => append.number(3, equation, setEquation, setEquationFontSize)}>{3}</Button>

          <Button style={numberButton} onPress={() => append.number(0, equation, setEquation, setEquationFontSize)}>{0}</Button>
          <Button style={numberButton} onPress={() => append.dot(equation, setEquation)}>{','}</Button>
          <Button style={numberButton} onPress={() => append.backspace(equation, setEquation)}><Ionicons name="backspace" size={36} color="#fffa" /></Button>
        </View>
        <View style={styles.rightRow}>
          <Button style={operatorButton} onPress={() => append.operator(mult, equation, setEquation, setEquationFontSize)}>{mult}</Button>
          <Button style={operatorButton} onPress={() => append.operator('-', equation, setEquation, setEquationFontSize)}>{'-'}</Button>
          <Button style={operatorButton} onPress={() => append.operator('+', equation, setEquation, setEquationFontSize)}>{'+'}</Button>
          <Button style={equalsButton} onPress={() => append.equals(setEquation, result, setResult, setEquationFontSize)}>{'='}</Button>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const numberButton = StyleSheet.create({
  button: {
    backgroundColor: '#191f1b',
  },
  text: {
    fontFamily: font,
  },
})

const operatorButton = StyleSheet.create({
  button: {
    backgroundColor: '#38483d',
  },
  text: {
    fontFamily: font,
  },
})

const equalsButton = StyleSheet.create({
  button: {
    backgroundColor: '#1a4f31',
  },
  text: {
    fontFamily: font,
  },
})

const acButton = StyleSheet.create({
  button: {
    backgroundColor: '#284957',
  },
  text: {
    fontFamily: font,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121512',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  screen: {
    backgroundColor: '#263129',
    height: '33%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  result : {
    color: '#bfc5be',
    fontSize: 48,
    width: '90%',
    position: 'absolute',
    bottom: 20,
    right: 20,
    textAlign: 'right',
    fontFamily: font,
  },
  bonusRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    flex: 1,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '95%',
  },
  keyboard : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    width: '95%',
    paddingBottom: 20,
  },
  numpad: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 5,
  },
  rightRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  }
})