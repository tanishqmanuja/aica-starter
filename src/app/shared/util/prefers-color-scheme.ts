import { Observable } from 'rxjs';

// Author: https://tane.dev/2021/01/create-your-own-dark-mode-detection-observable-using-rxjs-and-media-queries/
export function isDarkMode(signal?: AbortSignal): Observable<boolean> {
  return new Observable<boolean>((subscriber) => {
    if (!window.matchMedia) {
      subscriber.error(new Error('No windows Media Match available'));
    }

    function emitValue(event: Event) {
      subscriber.next((event as MediaQueryListEvent).matches);
    }

    const mediaListQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (signal) {
      signal.onabort = () => {
        mediaListQuery.removeEventListener('change', emitValue);
        !subscriber.closed && subscriber.complete();
      };
    }

    mediaListQuery.addEventListener('change', emitValue);
    subscriber.next(mediaListQuery.matches);

    return () => {
      mediaListQuery.removeEventListener('change', emitValue);
      !subscriber.closed && subscriber.complete();
    };
  });
}
