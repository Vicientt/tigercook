/**
 * Playwright global setup — runs once before all E2E tests.
 * Creates the shared test user in the Firebase Auth emulator so that
 * authenticated tests can sign in without going through the sign-up UI.
 */
async function globalSetup() {
  const EMULATOR_AUTH = "http://127.0.0.1:9099";
  const TEST_EMAIL = "e2etest@tigercook.test";
  const TEST_PASS = "TestPass123";
  const PROJECT_ID = "tigercook-7f584";

  try {
    const res = await fetch(
      `${EMULATOR_AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: TEST_EMAIL,
          password: TEST_PASS,
          returnSecureToken: false,
        }),
      },
    );

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      // EMAIL_EXISTS means the user already exists — that is fine for re-runs
      if (body?.error?.message !== "EMAIL_EXISTS") {
        console.warn("[global-setup] Could not create test user:", body);
      }
    }
  } catch (err) {
    // Emulator not running yet; tests that require auth will fail with a clear message
    console.warn("[global-setup] Firebase Auth emulator unreachable:", err.message);
  }
}

export default globalSetup;
