
import { Platform } from 'react-native';
import { createWebRedirectionUrl } from './createWebRedirectionUrl';

const webRedirectUrl = 'http://mundoinvest.com.br/mobile/redirect';
const schemeIos = 'mundoinvest';
const schemeAndroid = 'mundoinvestapp';

describe('createWebRedirectionUrl', () => {
  it('should create the correct redirection URL for iOS', () => {
    Platform.OS = 'ios';
    const path = 'some/path';
    const expectedUrl = `${webRedirectUrl}?path=${schemeIos}://${path}`;
    const url = createWebRedirectionUrl(path);
    expect(url).toBe(expectedUrl);
  });

  it('should create the correct redirection URL for Android', () => {
    Platform.OS = 'android';
    const path = 'some/path';
    const expectedUrl = `${webRedirectUrl}?path=${schemeAndroid}://${path}`;
    const url = createWebRedirectionUrl(path);
    expect(url).toBe(expectedUrl);
  });
});
