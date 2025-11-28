import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NotificationType } from "../types/notifications";

type NotificationCardProps = {
  title: string;
  description: string;
  timeAgo: string;
  type: NotificationType;
};

export const NotificationCard = React.memo(function NotificationCard({
  title,
  description,
  timeAgo,
  type,
}: NotificationCardProps) {
  const visuals = visualsMap[type] ?? visualsMap.default;

  return (
    <View style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: visuals.iconBg }]}>
        {visuals.icon}
      </View>

      <View style={styles.textWrapper}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
});

const visualsMap: Record<
  NotificationType | "default",
  { iconBg: string; icon: React.ReactElement }
> = {
  invoice: {
    iconBg: "#E7F0FF",
    icon: <Ionicons name="document-text-outline" size={22} color="#3B6FE8" />,
  },
  stockLow: {
    iconBg: "#FFF7D6",
    icon: <MaterialIcons name="warning-amber" size={22} color="#E6B200" />,
  },
  approval: {
    iconBg: "#E5F8EB",
    icon: <Ionicons name="checkmark-circle-outline" size={22} color="#32A85B" />,
  },
  paymentLate: {
    iconBg: "#FDE7E7",
    icon: <Ionicons name="alert-circle-outline" size={22} color="#D64545" />,
  },
  stockUpdate: {
    iconBg: "#E5F8F5",
    icon: <Ionicons name="trending-up-outline" size={22} color="#2FB0A3" />,
  },
  default: {
    iconBg: "#ECEFF2",
    icon: <Ionicons name="information-circle-outline" size={22} color="#6B7280" />,
  },
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    shadowColor: "#bcbbbbff",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2933",
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: "#9AA5B1",
  },
  description: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
});
