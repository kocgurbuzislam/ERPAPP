import { createNavigationContainerRef } from '@react-navigation/native';

// Root navigation helpers allow navigating outside of React components
// (e.g. from notification handlers).
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  DocumentPreview: { documentId: string };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(
  name: keyof RootStackParamList,
  params?: RootStackParamList[keyof RootStackParamList],
) {
  if (!navigationRef.isReady()) {
    return;
  }

  // The tuple overloads in the navigation types don't play well with this helper,
  // so we cast here to keep usage simple across the app.
  // @ts-expect-error
  navigationRef.navigate(name, params);
}
