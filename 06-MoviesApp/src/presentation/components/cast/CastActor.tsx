import { Image, StyleSheet, Text, View } from "react-native"
import { Cast } from "../../../core/entities/cast.entity"

interface Props {
    actor: Cast
}

export const CastActor = ({ actor }: Props) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.actorImage}
                source={{ uri: actor.avatar }}
            />
            <View style={styles.actorInfo}>
                <Text style={styles.actorName}>{actor.name}</Text>
                <Text style={styles.characterName}>{actor.character}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        width: 100,
    },
    actorInfo: {
        marginLeft: 10,
        marginTop: 4
    },
    actorImage: {
        width: 100,
        height: 150,
        borderRadius: 10
    },
    actorName: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    characterName: {
        fontSize: 12,
        opacity: 0.7
    }
})