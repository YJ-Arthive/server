if [[ ${1} == '' ]]; then
  echo 'Module name not provided'
  exit 1
fi

nest g mo ${1}

mkdir src/${1}/queries
mkdir src/${1}/queries/handlers

mkdir src/${1}/commands
mkdir src/${1}/commands/handlers

mkdir src/${1}/models

mkdir src/${1}/dtos

upper=`echo ${1:0:1} | tr  '[a-z]' '[A-Z]'`${1:1}
mkdir src/${1}/infra
mkdir src/${1}/infra/web
echo "import { Controller } from '@nestjs/common';

@Controller('/api/v1/${1}')
export class ${upper}Controller {}" > src/${1}/infra/web/${1}.controller.ts

echo "import { Module } from '@nestjs/common';
import { ${upper}Controller } from './infra/web/${1}.controller';

const CommandHandlers = [];
const QueryHandlers = [];

@Module({
  imports: [],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [${upper}Controller],
  exports: [],
})
export class ${upper}Module {}" > src/${1}/${1}.module.ts