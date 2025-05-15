
# 🚀 AWS CDK Node.js CRUD API with Lambda & API Gateway

This guide shows how to build CRUD endpoints using AWS CDK (TypeScript), Lambda, and API Gateway.

## 📝 Prerequisites

- AWS CLI (configured)
- Node.js (LTS)
- AWS CDK (latest)
- An AWS Account

```bash
npm install -g aws-cdk
aws configure
```

## 🏗️ Project Setup

### 1️⃣ Initialize CDK Project
```bash
mkdir my-cdk-api
cd my-cdk-api
cdk init app --language typescript
```

### 2️⃣ Install Dependencies
```bash
npm install @aws-cdk/aws-lambda @aws-cdk/aws-apigateway
```

## 📝 Lambda Handlers

### Folder Structure:
```
lambda/
├── getWidgets.ts
├── createWidget.ts
├── updateWidget.ts
└── deleteWidget.ts
```

### getWidgets.ts
```typescript
export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Get all widgets' }),
  };
};
```

### createWidget.ts
```typescript
export const handler = async (event) => {
  const body = JSON.parse(event.body);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Widget created', data: body }),
  };
};
```

### updateWidget.ts
```typescript
export const handler = async (event) => {
  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Widget ${id} updated`, data: body }),
  };
};
```

### deleteWidget.ts
```typescript
export const handler = async (event) => {
  const id = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Widget ${id} deleted` }),
  };
};
```

## 🏗️ CDK Stack Code

### lib/my-cdk-api-stack.ts
```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class MyCdkApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getWidgets = new lambda.Function(this, 'GetWidgetsHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getWidgets.handler',
    });

    const createWidget = new lambda.Function(this, 'CreateWidgetHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'createWidget.handler',
    });

    const updateWidget = new lambda.Function(this, 'UpdateWidgetHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'updateWidget.handler',
    });

    const deleteWidget = new lambda.Function(this, 'DeleteWidgetHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'deleteWidget.handler',
    });

    const api = new apigateway.RestApi(this, 'WidgetsApi', {
      restApiName: 'Widgets Service',
    });

    const widgets = api.root.addResource('widgets');

    widgets.addMethod('GET', new apigateway.LambdaIntegration(getWidgets));
    widgets.addMethod('POST', new apigateway.LambdaIntegration(createWidget));

    const widgetItem = widgets.addResource('{id}');
    widgetItem.addMethod('PUT', new apigateway.LambdaIntegration(updateWidget));
    widgetItem.addMethod('DELETE', new apigateway.LambdaIntegration(deleteWidget));
  }
}
```

## 🚀 Deploy the Stack
```bash
cdk bootstrap
cdk deploy
```

## 🌐 API Endpoints

| Method | URL                                    | Lambda Handler      |
|---------|----------------------------------------|-------------------- |
| GET     | `/widgets`                            | getWidgets.ts        |
| POST    | `/widgets`                            | createWidget.ts      |
| PUT     | `/widgets/{id}`                       | updateWidget.ts      |
| DELETE  | `/widgets/{id}`                       | deleteWidget.ts      |

## 🔎 Test Endpoints
```bash
curl -X GET https://<api-id>.execute-api.<region>.amazonaws.com/prod/widgets
curl -X POST -d '{"name":"MyWidget"}' https://<api-id>.execute-api.<region>.amazonaws.com/prod/widgets
curl -X PUT -d '{"name":"UpdatedWidget"}' https://<api-id>.execute-api.<region>.amazonaws.com/prod/widgets/123
curl -X DELETE https://<api-id>.execute-api.<region>.amazonaws.com/prod/widgets/123
```

## ✅ Summary
- ✅ CDK Project with CRUD API using Lambda & API Gateway
- ✅ Clean Lambda structure
- ✅ Easily extendable microservice setup

