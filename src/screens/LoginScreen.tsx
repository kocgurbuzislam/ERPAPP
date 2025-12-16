import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Alert,
    Linking
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Demo login logic
        if (email && password) {
            navigation.replace('Main');
        } else {
            Alert.alert('Eksik Bilgi', 'Lütfen email ve şifrenizi giriniz.');
        }
    };

    const handleRegister = () => {
        Linking.openURL('https://www.google.com').catch(err =>
            console.error("Link açılamadı:", err)
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Hoş Geldiniz</Text>
                        <Text style={styles.subtitle}>ERP Sisteminize Giriş Yapın</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ornek@sirket.com"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Şifre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="******"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Hesabınız yok mu? </Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={styles.footerLink}>Kayıt Olun</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Light Gray Background
    },
    keyboardView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#111827', // Dark Text
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280', // Gray Text
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151', // Darker Gray Label
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF', // White Input
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#111827',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB', // Light Border
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#3B6FE8', // Primary Blue
        fontSize: 14,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#3B6FE8', // Primary Blue
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#3B6FE8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF', // White Text
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        color: '#6B7280', // Gray Text
        fontSize: 14,
    },
    footerLink: {
        color: '#3B6FE8', // Primary Blue
        fontSize: 14,
        fontWeight: '600',
    },
});
