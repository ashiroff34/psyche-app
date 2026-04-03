/**
 * Simple module-level lock that prevents multiple notification components
 * from showing simultaneously. All client components share the same module
 * instance within a single browser session.
 */

let _locked = false;
let _lockHolder = "";

/** Try to acquire the notification slot. Returns true if acquired, false if already occupied. */
export function acquireNotificationLock(holder: string): boolean {
  if (_locked) return false;
  _locked = true;
  _lockHolder = holder;
  return true;
}

/** Release the notification slot so the next component can show. */
export function releaseNotificationLock(holder: string): void {
  if (_lockHolder === holder) {
    _locked = false;
    _lockHolder = "";
  }
}

/** Whether any notification is currently showing. */
export function isNotificationLocked(): boolean {
  return _locked;
}
