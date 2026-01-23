import { View, Pressable, BackHandler } from "react-native"
import { Text } from "react-native-paper"
import styles from "@utils/styles"
import ExcerciseHeader from "@components/ExcerciseHeader/ExcerciseHeader"
import WhiteLine from "@components/WhiteLine/WhiteLine"

const ExcerciseList = ({ excercises, title, goToIntent }) => {

    return (
        <View>
            {excercises.map((item) => (
                <Pressable key={item.id} onPress={() => goToIntent(item)}>
                    <View style={styles.spacing}>
      
                        <Text style={styles.exercisesWriting}>
                            {item.title}
                        </Text>
                    </View>
                     <WhiteLine />
                </Pressable>
                            
            ))}
        </View>
    )
}

export default ExcerciseList
