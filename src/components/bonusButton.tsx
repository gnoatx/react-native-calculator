import { Dimensions, Text, StyleSheet, TouchableOpacity } from "react-native"

type Props = {
  onPress: () => void,
  children: number | string,
}

const windowWidth = Dimensions.get('window').width * 0.95

export function BonusButton({ onPress, children }: Props) {
  
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  
      width: (windowWidth / 4) - 5,
      height: (windowWidth / 4) - 5,
  
      borderRadius: 99,
    },
    text: {
      color: '#ffffffaa',
      fontSize: 24,
    }
  })