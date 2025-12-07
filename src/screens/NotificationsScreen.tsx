import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationCard } from "../components/NotificationCard";
import { Notification, fetchNotifications } from "../services/notifications";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Bildirimler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotifications();
  }, [loadNotifications]);

  const renderItem = useCallback(({ item }: { item: Notification }) => {
    return (
      <NotificationCard
        type={item.type}
        title={item.title}
        description={item.description}
        timeAgo={item.timeAgo}
      />
    );
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.centered}>
          <ActivityIndicator size="small" color="#3B6FE8" />
          <Text style={styles.loadingText}>Bildirimler yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>BUGÜN</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Gösterilecek bildirim yok.</Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
