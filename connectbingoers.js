
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
exports.handler = function(event, context, callback) {
  if(event.queryStringParameters.room == null){
    return{
      statusCode: 500,
      body: "Need a room to join"
    };
  }
 var DDB = new AWS.DynamoDB();
  
  var putParams = {
    TableName: "GridConnections",
    Item: {
      id: { S: event.requestContext.connectionId },
      room: { S: event.queryStringParameters.room }
    }
  };

  DDB.putItem(putParams, function(err, data) {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? "Failed to connect: " + JSON.stringify(err) : "Connected"
    });
  });
  return { statusCode: 200, body: 'GREETINGS' };
};