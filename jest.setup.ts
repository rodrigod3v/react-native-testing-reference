// Mock React Native Firebase to avoid NativeEventEmitter issues in Jest
jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: {
    app: jest.fn(),
    SDK_VERSION: '0',
  },
}))

jest.mock('@react-native-firebase/auth', () => {
  const authFunction = () => ({
    signOut: jest.fn().mockResolvedValue(undefined),
    onAuthStateChanged: jest.fn(),
    currentUser: null,
  })

  authFunction.GoogleAuthProvider = {
    credential: jest.fn(),
  }

  return authFunction
})

// Mock Google Sign-In
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn(),
    signOut: jest.fn().mockResolvedValue(undefined),
    getTokens: jest.fn().mockResolvedValue({ idToken: 'test', accessToken: 'test' }),
    isSignedIn: jest.fn().mockResolvedValue(false),
  },
}))

// Basic mocks for Linking to avoid opening URLs during tests
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockResolvedValue(true),
}))

// Safe defaults for react-native-safe-area-context if needed by components
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
}))

// Silence Reanimated warnings in tests
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

// Mock AsyncStorage for Jest environment
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

// React Navigation minimal refs
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    createNavigationContainerRef: jest.fn(() => ({})),
  }
})

// styled-components: preserve real styled, just provide a safe theme
jest.mock('styled-components/native', () => {
  const actual = jest.requireActual('styled-components/native')
  const styledDefault = actual.default || actual
  return {
    __esModule: true,
    ...actual,
    default: styledDefault,
    useTheme: () => ({ colors: { black: '#000', gray460: '#999' } }),
  }
})

// RN Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn().mockResolvedValue(true),
}))
