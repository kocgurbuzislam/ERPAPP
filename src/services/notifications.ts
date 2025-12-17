import { NotificationType } from "../components/NotificationCard";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timeAgo: string;
};

export async function fetchNotifications(): Promise<Notification[]> {
  await delay(400);

  return [
    {
      id: "1",
      type: "INVOICE",
      title: "Yeni fatura olusturuldu",
      description: "Fatura #INV-2023-0105 musteriden onay bekliyor. Toplam: 1.500 TL.",
      timeAgo: "10 dakika once",
    },
    {
      id: "2",
      type: "STOCK_LOW",
      title: "Dusuk stok uyarisi",
      description: "Urun 'Laptop X1' stok seviyesi kritik: 5 adet kaldi.",
      timeAgo: "30 dakika once",
    },
    {
      id: "3",
      type: "APPROVAL_REQUIRED",
      title: "Onay bekleyen harcama",
      description: "Calisan T. Kara'nin 250 TL seyahat harcama talebi onay bekliyor.",
      timeAgo: "1 saat once",
    },
    {
      id: "4",
      type: "PAYMENT_LATE",
      title: "Gecikmis fatura odemesi",
      description: "Fatura #INV-2023-0099 icin vade 3 gun once doldu. Musteri: A Sirketi.",
      timeAgo: "2 saat once",
    },
    {
      id: "5",
      type: "STOCK_UPDATE",
      title: "Stok guncellemesi",
      description: "Urun 'Telefon Kilif Z' icin 100 adet yeni stok girisi yapildi.",
      timeAgo: "5 dakika once",
    },
  ];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
