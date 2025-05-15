import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  const body = JSON.parse(event.body || "{}");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Widget ${id} updated`, data: body }),
  };
};
