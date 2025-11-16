import { View, Text,StyleSheet } from "react-native";

export default function NotificationsScreen() {

    return(
        <View style={styles.container}>
            <Text>Bildirimler</Text>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent:"center",
    alignItems:"center"
  },
})