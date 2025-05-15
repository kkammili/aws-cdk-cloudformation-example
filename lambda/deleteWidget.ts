import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Widget ${id} deleted` }),
  };
};
