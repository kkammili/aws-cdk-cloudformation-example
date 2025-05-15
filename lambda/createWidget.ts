import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || "{}");
  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Widget created", data: body }),
  };
};
