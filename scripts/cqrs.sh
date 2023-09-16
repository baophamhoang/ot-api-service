#!/bin/bash

YELLOW="\033[33m"
GREEN="\033[32m"
NORMAL="\033[0m"

# Convention
INDEX_FILE="index.ts"
MODULE_PATH="/src/modules"
MODULE_APP_FOLDER="application"
MODULE_NAME=

USECASE_PATH=
USECASE_C_EXAMPLE="updateUser"
USECASE_Q_EXAMPLE="getUser"
EXAMPLE=

function generateIndex() {
  ENDPOINT="./$1.endpoint"
  HANDLER="./$1.handler"

  echo "export * from '$ENDPOINT';" >>$INDEX_FILE
  echo "export * from '$HANDLER';" >>$INDEX_FILE
}

function generateCommand() {
  USECASE=$1

  # variables
  ACTION=Post
  REQUEST_TYPE=body
  REQUEST_PARAM="body: ${USECASE^}RequestBody"
  REQUEST_DECLARATION="@Body() $REQUEST_PARAM,"
  REQUEST_IMPORT="import { ${USECASE^}RequestBody } from './$USECASE.request-body';"
  REQUEST_ASSIGNMENT="const body = command.body as ${USECASE^}RequestBody;"

  IFS=' ' read -r -a USECASE_ACTION <<<"$(echo $USECASE | sed 's/\([A-Z]\)/ \1/g')"
  case $USECASE_ACTION in
  "create")
    ACTION=Post
    ;;
  "update")
    ACTION=Put
    ;;
  "delete")
    ACTION=Delete
    REQUEST_TYPE=param
    REQUEST_PARAM="param: ${USECASE^}RequestParam"
    REQUEST_DECLARATION="@Param() $REQUEST_PARAM,"
    REQUEST_IMPORT="import { ${USECASE^}RequestParam } from './$USECASE.request-param';"
    REQUEST_ASSIGNMENT="const param = command.param as ${USECASE^}RequestParam;"
    ;;
  esac

  # create endpoint.ts file
  tee -a $USECASE.endpoint.ts <<EOF >/dev/null
  import { ${REQUEST_TYPE^}, Controller, $ACTION, UseInterceptors } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { CommandBus } from '@nestjs/cqrs';
  import { ApiResponse, CommandEndpoint, ResponseInterceptor } from '@puravida/nestjs-common';

  import { ${USECASE^}Command } from './$USECASE.command';
  $REQUEST_IMPORT
  import { ${USECASE^}CommandResponse } from './$USECASE.response';

  @ApiTags('${MODULE_NAME^}')
  @Controller({ path: '$MODULE_NAME', version: '1' })
  @UseInterceptors(ResponseInterceptor)
  export class ${USECASE^}Endpoint extends CommandEndpoint {
    constructor(commandBus: CommandBus) {
      super(commandBus);
    }

    @ApiOperation({ description: 'description of command endpoint' })
    @ApiResponse(${USECASE^}CommandResponse)
    @$ACTION()
    $USECASE_ACTION(
      $REQUEST_DECLARATION
    ): Promise<${USECASE^}CommandResponse> {
      return this.commandBus.execute<${USECASE^}Command, ${USECASE^}CommandResponse>(
        new ${USECASE^}Command($REQUEST_TYPE),
      );
    }
  }
EOF

  # create command.ts file
  tee -a $USECASE.command.ts <<EOF >/dev/null
  $REQUEST_IMPORT

  export class ${USECASE^}Command {
    constructor(
      public readonly $REQUEST_PARAM
    ) {}
  }
EOF

  # create handler.ts file
  tee -a $USECASE.handler.ts <<EOF >/dev/null
  import { PrismaService } from '@db';
  import { Logger } from '@nestjs/common';
  import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

  import { ${USECASE^}Command } from './$USECASE.command';
  $REQUEST_IMPORT
  import { ${USECASE^}CommandResponse } from './$USECASE.response';

  @CommandHandler(${USECASE^}Command)
  export class ${USECASE^}Handler
    implements ICommandHandler<${USECASE^}Command, ${USECASE^}CommandResponse>
  {
    private readonly logger = new Logger(${USECASE^}Handler.name);

    constructor(private readonly dbContext: PrismaService) {}

    async execute(command: ${USECASE^}Command): Promise<${USECASE^}CommandResponse> {
      return (await this.$USECASE(command)) as ${USECASE^}CommandResponse;
    }

    private async $USECASE(
      command: ${USECASE^}Command
    ) : Promise<${USECASE^}CommandResponse> {
      /* TODO - improvement
        To seperate application logic - domain logic
        To keep CQRS clean and easy to be auto generated by tools/scripts
      */

      $REQUEST_ASSIGNMENT
    
      return {} as ${USECASE^}CommandResponse;
    }
  }
EOF

  # create request-body.ts or request-param.ts
  if [[ $REQUEST_TYPE = "body" ]]; then
    # define model properties directly in this file, refer to /dto in case of existing

    echo "//import {  ${USECASE^}Dto } from '@modules/${MODULE_NAME}/dto';" >>$USECASE.request-body.ts
    echo "import { ApiProperty } from '@nestjs/swagger';" >>$USECASE.request-body.ts
    echo "" >>$USECASE.request-body.ts
    echo "export class ${USECASE^}RequestBody {}" >>$USECASE.request-body.ts
  else
    echo "import { ApiProperty } from '@nestjs/swagger';" >>$USECASE.request-param.ts
    echo "" >>$USECASE.request-param.ts
    echo "export class ${USECASE^}RequestParam {}" >>$USECASE.request-param.ts
  fi

  # create response.ts file
  # TODO - implement the Response base model
  echo "import { ApiProperty } from '@nestjs/swagger';" >>$USECASE.response.ts
  echo "" >>$USECASE.response.ts
  echo "export class ${USECASE^}CommandResponse {}" >>$USECASE.response.ts
}

function generateQuery() {
  USECASE=$1

  # create endpoint.ts file
  tee -a $USECASE.endpoint.ts <<EOF >/dev/null
  import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { QueryBus } from '@nestjs/cqrs';
  import { ApiResponse, QueryEndpoint, ResponseInterceptor } from '@puravida/nestjs-common';

  import { ${USECASE^}Query } from './$USECASE.query';
  import { ${USECASE^}RequestParam } from './$USECASE.request-param';
  import { ${USECASE^}QueryResponse } from './$USECASE.response';

  @ApiTags('${MODULE_NAME^}')
  @Controller({ path: '$MODULE_NAME', version: '1' })
  @UseInterceptors(ResponseInterceptor)
  export class ${USECASE^}Endpoint extends QueryEndpoint {
    constructor(queryBus: QueryBus) {
      super(queryBus);
    }

    @ApiOperation({ description: 'description of query endpoint' })
    @ApiResponse(${USECASE^}QueryResponse)
    @Get()
    get(
      @Param() param: ${USECASE^}RequestParam,
    ): Promise<${USECASE^}QueryResponse> {
      return this.queryBus.execute<${USECASE^}Query, ${USECASE^}QueryResponse>(
        new ${USECASE^}Query(param),
      );
    }
  }
EOF

  # create query.ts file
  tee -a $USECASE.query.ts <<EOF >/dev/null
  import { ${USECASE^}RequestParam } from './$USECASE.request-param';

  export class ${USECASE^}Query {
    constructor(
      public readonly param: ${USECASE^}RequestParam
    ) {}
  }
EOF

  # create handler.ts file
  tee -a $USECASE.handler.ts <<EOF >/dev/null
  import { PrismaService } from '@db';
  import { Logger } from '@nestjs/common';
  import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

  import { ${USECASE^}Query } from './$USECASE.query';
  import { ${USECASE^}RequestParam } from './$USECASE.request-param';
  import { ${USECASE^}QueryResponse } from './$USECASE.response';

  @QueryHandler(${USECASE^}Query)
  export class ${USECASE^}Handler
    implements IQueryHandler<${USECASE^}Query, ${USECASE^}QueryResponse>
  {
    private readonly logger = new Logger(${USECASE^}Handler.name);

    constructor(private readonly dbContext: PrismaService) {}

    async execute(query: ${USECASE^}Query): Promise<${USECASE^}QueryResponse> {
      return (await this.$USECASE(query)) as ${USECASE^}QueryResponse;
    }
    
    private async $USECASE(
      query: ${USECASE^}Query
    ) : Promise<${USECASE^}QueryResponse> {
      
      const param = query.param as ${USECASE^}RequestParam;

      // query data from db

      // maping data

      return {} as ${USECASE^}QueryResponse;
    }


  }
EOF

  # request-param.ts
  echo "import { ApiProperty } from '@nestjs/swagger';" >>$USECASE.request-param.ts
  echo "" >>$USECASE.request-param.ts
  echo "export class ${USECASE^}RequestParam {}" >>$USECASE.request-param.ts

  # create response.ts file
  echo "import { ApiProperty } from '@nestjs/swagger';" >>$USECASE.response.ts
  echo "" >>$USECASE.response.ts
  echo "export class ${USECASE^}QueryResponse {}" >>$USECASE.response.ts
}

function generate() {
  TYPE=$1

  # Path input
  read -p "Enter $TYPE's module name (eg: auth): " MODULE_NAME

  USECASE_PATH=".$MODULE_PATH/$MODULE_NAME/$MODULE_APP_FOLDER"

  if [[ $USECASE_PATH = "" ]]; then
    echo -e "${YELLOW}Error: $TYPE's path is empty! $NORMAL" && sleep 1
    return 1
  fi

  if [ ! -d "$USECASE_PATH" ]; then
    echo -e "${YELLOW}Error: Command's path does not exist! $NORMAL" && sleep 1
    return 1
  fi

  # Name input
  if [[ $TYPE = "Command" ]]; then
    EXAMPLE=$USECASE_C_EXAMPLE
  else
    EXAMPLE=$USECASE_Q_EXAMPLE
  fi

  read -p "Enter $TYPE's name (eg: $EXAMPLE): " USECASE

  if [[ $USECASE = "" ]]; then
    echo -e "${YELLOW}Error: Command's name is empty! $NORMAL" && sleep 1
    return 1
  fi

  # create folder and files inside
  echo -e "${GREEN}CQRS $TYPE Generating...$NORMAL"
  echo -e "${GREEN}Destination: $USECASE_PATH/$USECASE $NORMAL"

  cd "$USECASE_PATH" && mkdir $USECASE && cd "./$USECASE"

  generateIndex $USECASE

  if [[ $TYPE = "Command" ]]; then
    generateCommand $USECASE
  else
    generateQuery $USECASE
  fi
}

function main {
  echo -e "${YELLOW}CQRS Generation Script $NORMAL"
  echo ""
  echo "[1] Generate Command files"
  echo "[2] Generate Query files"
  echo ""
  read -p "SELECT NUMBER: " input

  case $input in
  "1")
    generate "Command"
    exit 0
    ;;
  "2")
    generate "Query"
    exit 0
    ;;
  "3")
    test
    exit 0
    ;;
  *)
    echo "Invalid input - $input\n"
    ;;
  esac
}

main

# Run on Window:
# 1. Switch to bash in Command Line: bash
# 2. Run bash file: bash generate.sh
# 3. Close bash: exit
