import { register } from './serviceWorkerRegistration';

describe('service worker registration', () => {
  it('registers the app service worker when supported', () => {
    const registerMock = jest.fn();
    Object.defineProperty(window.navigator, 'serviceWorker', {
      value: { register: registerMock },
      configurable: true,
    });

    register();

    expect(registerMock).toHaveBeenCalledWith('/service-worker.js', { scope: '/' });
  });
});
