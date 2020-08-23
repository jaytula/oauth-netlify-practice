exports.handler = async (event, context) => {
  // event.queryStringParameters has access_token, token_type, expires_in, scope
  console.log(event.queryStringParameters);
  return {
    statusCode: 200,
    body: 'abc'
  }
}