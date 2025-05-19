#!/bin/sh
set -e
# Compile TypeScript test sources
tsc -p tsconfig.test.json
# Adjust module paths for compiled service
sed -i 's#require("@angular/core")#require("../../../test_stubs/angular-core")#' dist-test/src/app/core/name-map.service.js
sed -i 's#require("rxjs")#require("../../../test_stubs/rxjs")#' dist-test/src/app/core/name-map.service.js
# Run tests
node dist-test/tests/name-map.service.spec.js
node dist-test/tests/codename-generator.spec.js
