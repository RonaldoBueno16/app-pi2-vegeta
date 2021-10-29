import * as Font from 'expo-font';

const useFonts = async () => {
    await Font.loadAsync({
        'Rajdhani-Bold': require("/assets/fonts/Rajdhani/Rajdhani-Bold.tff")
    })
}

export default useFonts;