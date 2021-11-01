import * as Font from 'expo-font';

const useFonts = async () => {
    await Font.loadAsync({
        'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
        'Rajdhani-Bold': require('../fonts/Rajdhani-Bold.ttf'),
        'Rajdhani-Light': require('../fonts/Rajdhani-Light.ttf'),
        'Rajdhani-Medium': require('../fonts/Rajdhani-Medium.ttf'),
        'Rajdhani-Regular': require('../fonts/Rajdhani-Regular.ttf'),
        'Rajdhani-SemiBold': require('../fonts/Rajdhani-SemiBold.ttf'),
    })
}

export default useFonts;