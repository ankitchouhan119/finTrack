#!/bin/sh
set -e

echo "🚀 Generating runtime config..."

cat <<EOF > /app/build/runtime-config.js
window._env_ = {
  REACT_APP_API_URL: "${REACT_APP_API_URL}",
  REACT_APP_API_KEY: "${REACT_APP_API_KEY}",
  REACT_APP_AUTH_DOMAIN: "${REACT_APP_AUTH_DOMAIN}",
  REACT_APP_PROJECT_ID: "${REACT_APP_PROJECT_ID}",
  REACT_APP_STORAGE_BUCKET: "${REACT_APP_STORAGE_BUCKET}",
  REACT_APP_MESSAGING_SENDER_ID: "${REACT_APP_MESSAGING_SENDER_ID}",
  REACT_APP_APP_ID: "${REACT_APP_APP_ID}",
  REACT_APP_MEASUREMENT_ID: "${REACT_APP_MEASUREMENT_ID}"
};
EOF

echo "✅ Runtime config injected!"
exec "$@"
