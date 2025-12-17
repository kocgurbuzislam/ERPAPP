import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DocumentPreviewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { documentId } = (route.params as { documentId: string }) || { documentId: 'Unknown' };

  const mockHtml = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.5; padding: 20px; color: #333; margin: 0; background-color: #fff; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
            .title { font-size: 26px; font-weight: bold; color: #111; margin: 0; }
            .subtitle { font-size: 15px; color: #888; margin-top: 5px; }
            .meta { font-size: 14px; color: #555; text-align: right; }
            .section { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .section-box { width: 48%; }
            .section-title { font-size: 13px; color: #888; margin-bottom: 5px; text-transform: uppercase; }
            .section-content { font-size: 15px; font-weight: 500; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { text-align: left; font-size: 13px; color: #888; padding-bottom: 10px; border-bottom: 1px solid #eee; }
            td { padding: 12px 0; font-size: 15px; border-bottom: 1px solid #f9f9f9; }
            .right { text-align: right; }
            .summary { margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
            .summary-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 15px; }
            .total { font-weight: bold; font-size: 20px; color: #3B6FE8; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
                <h1 class="title">FATURA</h1>
                <div class="subtitle">#INV-2023-${documentId}</div>
            </div>
            <div class="meta">
                Duzenleme T.: 2023-01-05<br>
                Son Odeme T.: 2023-02-05
            </div>
          </div>

          <div class="section">
            <div class="section-box">
                <div class="section-title">Gonderici</div>
                <div class="section-content">
                    ABC Sirketi<br>
                    123 Ana Cadde,<br>
                    Istanbul, Turkiye
                </div>
            </div>
            <div class="section-box">
                <div class="section-title">Alici</div>
                <div class="section-content">
                    Musteri X<br>
                    456 Merkez Bulvari,<br>
                    Ankara, Turkiye
                </div>
            </div>
          </div>

          <table>
            <thead>
                <tr>
                    <th>Aciklama</th>
                    <th class="right">Miktar</th>
                    <th class="right">Birim Fiyat</th>
                    <th class="right">Toplam</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Web Tasarim Hizmeti</td>
                    <td class="right">1</td>
                    <td class="right">TRY 250,00</td>
                    <td class="right">TRY 250,00</td>
                </tr>
                <tr>
                    <td>Hosting (yillik)</td>
                    <td class="right">1</td>
                    <td class="right">TRY 100,00</td>
                    <td class="right">TRY 100,00</td>
                </tr>
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-row">
                <span>Ara Toplam:</span>
                <span>TRY 350,00</span>
            </div>
            <div class="summary-row">
                <span>Vergi (%18):</span>
                <span>TRY 63,00</span>
            </div>
            <div class="summary-row total">
                <span>Genel Toplam:</span>
                <span>TRY 413,00</span>
            </div>
          </div>
        </body>
      </html>
    `;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Belge Onizleme</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <WebView
            originWhitelist={['*']}
            source={{ html: mockHtml }}
            style={styles.webview}
            scrollEnabled={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
