import { Injectable } from '@angular/core';

// Base logger — used in development (registered via useFactory in app.config.ts)
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }
}

// Silent variant — returned by the factory in production builds.
// Extends LoggerService so it satisfies the same injection token.
// @Injectable() without providedIn — only instantiated by the factory, never auto-provided.
@Injectable()
export class SilentLoggerService extends LoggerService {
  override log(_: string): void {}  // no-op
  override warn(_: string): void {} // no-op
}
