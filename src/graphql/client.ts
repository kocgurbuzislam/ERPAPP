import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import { MOCK_DATA } from './mocks';

// Mock Link: Her isteği yakalar ve mock veri döner
// Gerçek backend geldiğinde burası HttpLink ile değiştirilecek.
const mockLink = new ApolloLink((operation) => {
    return new Observable((observer) => {
        const { operationName } = operation;

        console.log(`[GraphQL Mock] Request: ${operationName}`);

        setTimeout(() => {
            try {
                if (operationName === 'GetUserProfile') {
                    observer.next({ data: { me: MOCK_DATA.me } });
                } else if (operationName === 'GetNotifications') {
                    observer.next({ data: { notifications: MOCK_DATA.notifications } });
                } else {
                    console.warn(`[GraphQL Mock] No handler for: ${operationName}`);
                    // Fallback veya boş obje
                    observer.next({ data: {} });
                }
                observer.complete();
            } catch (e) {
                observer.error(e);
            }
        }, 800); // 800ms natural network delay simulation
    });
});

export const client = new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
});
