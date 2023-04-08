#!/bin/sh
set -x

# no verbose
# Replace the statically built envs with run-time envs
# NOTE: if these values are the same, this will be skipped.
scripts/replace-env.sh "$BUILT_FRITZBOX_HOST" "$FRITZBOX_HOST" 
scripts/replace-env.sh "$BUILT_NEXTAUTH_URL" "$NEXTAUTH_URL"
scripts/replace-env.sh "$BUILT_NEXTAUTH_SECRET" "$NEXTAUTH_SECRET"
scripts/replace-env.sh "$BUILT_FRITZBOX_PORT" "$FRITZBOX_PORT"
scripts/replace-env.sh "$BUILT_FRITZBOX_SSL" "$FRITZBOX_SSL"

node server.js