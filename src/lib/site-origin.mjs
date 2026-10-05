export function parseSiteOrigin(raw, { release = false } = {}) {
  if (!raw) {
    if (release)
      throw new Error(
        "Set NEXT_PUBLIC_SITE_URL to the confirmed HTTPS public origin before release.",
      );
    return null;
  }
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute origin.");
  }
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must contain only an HTTP(S) origin, without credentials, paths, queries or fragments.",
    );
  }
  if (
    release &&
    (url.protocol !== "https:" ||
      /^(localhost|127\.|0\.|\[::1\])/.test(url.hostname) ||
      /\.(invalid|example|test|localhost|local)$/.test(url.hostname))
  ) {
    throw new Error(
      "Release requires a confirmed public HTTPS origin, not a local or reserved test domain.",
    );
  }
  return url.origin;
}
