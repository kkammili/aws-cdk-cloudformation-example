import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export class MyCdkApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getWidgets = new lambda.Function(this, "GetWidgetsHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("dist/lambda"),
      handler: "getWidgets.handler",
    });

    const createWidget = new lambda.Function(this, "CreateWidgetHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("dist/lambda"),
      handler: "createWidget.handler",
    });

    const updateWidget = new lambda.Function(this, "UpdateWidgetHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("dist/lambda"),
      handler: "updateWidget.handler",
    });

    const deleteWidget = new lambda.Function(this, "DeleteWidgetHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("dist/lambda"),
      handler: "deleteWidget.handler",
    });

    const api = new apigateway.RestApi(this, "WidgetsApi", {
      restApiName: "Widgets Service",
      deployOptions: {
        stageName: "prod",
        loggingLevel: apigateway.MethodLoggingLevel.INFO, // Enable detailed logging
        dataTraceEnabled: true, // Optional: Logs full request/response data
      },
    });

    // Add a welcome message at the root endpoint
    api.root.addMethod("GET", new apigateway.LambdaIntegration(getWidgets), {
      authorizationType: apigateway.AuthorizationType.NONE,
    });

    const widgets = api.root.addResource("widgets");

    widgets.addMethod("GET", new apigateway.LambdaIntegration(getWidgets), {
      authorizationType: apigateway.AuthorizationType.NONE,
    });
    widgets.addMethod("POST", new apigateway.LambdaIntegration(createWidget), {
      authorizationType: apigateway.AuthorizationType.NONE,
    });

    const widgetItem = widgets.addResource("{id}");
    widgetItem.addMethod(
      "PUT",
      new apigateway.LambdaIntegration(updateWidget),
      {
        authorizationType: apigateway.AuthorizationType.NONE,
      },
    );
    widgetItem.addMethod(
      "DELETE",
      new apigateway.LambdaIntegration(deleteWidget),
      {
        authorizationType: apigateway.AuthorizationType.NONE,
      },
    );
  }
}
