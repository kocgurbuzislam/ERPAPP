import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationCard } from "../components/NotificationCard";
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from "../graphql/queries";

export default function NotificationsScreen({ navigation }: any) {
  const { data, loading, error, refetch } = useQuery(GET_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);

  const notifications = (data as any)?.notifications || [];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const handleNotificationPress = (item: any) => {
    navigation.navigate('DocumentPreview', { documentId: item.id });
  };

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => handleNotificationPress(item)} activeOpacity={0.7}>
        <NotificationCard
          type={item.type}
          title={item.title}
          description={item.description}
          timeAgo={item.timeAgo || 'Az once'}
        />
      </TouchableOpacity>
    );
  }, []);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#3B6FE8" />
          <Text style={styles.loadingText}>Bildirimler yukleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.sectionTitle}>BUGUN</Text>
        </View>

        {error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>Hata: {error.message}</Text>
            <Text onPress={() => refetch()} style={{ color: '#3B6FE8', marginTop: 10 }}>Tekrar Dene</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Gosterilecek bildirim yok.</Text>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9AA5B1",
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 10,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: "#4B5563",
  },
  errorText: {
    marginBottom: 10,
    color: "#D64545",
    fontSize: 13,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    paddingVertical: 20,
  },
});
