import { NotificationType } from "../src/types/notifications";

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
      type: "invoice",
      title: "Yeni Fatura Oluşturuldu",
      description: "Fatura #INV-2023-0105 müşteriye gönderildi. Toplam tutar: 1.500 TL.",
      timeAgo: "10 dakika önce",
    },
    {
      id: "2",
      type: "stockLow",
      title: "Düşük Stok Uyarısı",
      description: "Ürün 'Laptop X1' stok seviyesi kritik eşiğin altında. Mevcut stok: 5 adet.",
      timeAgo: "30 dakika önce",
    },
    {
      id: "3",
      type: "approval",
      title: "Onay Bekleyen Harcama Talebi",
      description: "Çalışan T. Kara'dan 250 TL'lik seyahat harcaması onay bekliyor.",
      timeAgo: "1 saat önce",
    },
    {
      id: "4",
      type: "paymentLate",
      title: "Gecikmiş Fatura Ödemesi",
      description: "Fatura #INV-2023-0099 için ödeme vadesi 3 gün önce doldu. Müşteri: A. Şirketi.",
      timeAgo: "2 saat önce",
    },
    {
      id: "5",
      type: "stockUpdate",
      title: "Stok Güncellemesi Başarılı",
      description: "Ürün 'Telefon Kılıfı Z' için 100 adet yeni stok girişi yapıldı.",
      timeAgo: "5 dakika önce",
    },
  ];
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
