import { Dimensions, Text, StyleSheet, TouchableOpacity } from "react-native"

type Props = {
  onPress: () => void,
  style: StyleSheet.NamedStyles<{ button: { backgroundColor: string; }; text: { fontFamily: string; }; }>,
  children: number | string | React.ReactNode,
}

const windowWidth = Dimensions.get('window').width * 0.95

export function Button({ onPress, style, children }: Props) {
  
  return (
    <TouchableOpacity onPress={onPress} style={[innerStyles.container, style.button]}>
      <Text style={[innerStyles.text, style.text]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const innerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#191f1b',

    width: (windowWidth / 4) - 5,
    height: (windowWidth / 4) - 5,

    borderRadius: 99,
  },
  text: {
    color: '#ffffffaa',
    fontSize: 36,
  }
})