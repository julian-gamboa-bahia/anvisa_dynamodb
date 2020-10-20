var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

console.log("Config: ", AWS.config);

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "anvisa_junho_2020";

var codigo_consulta="519501708157418";
    
//Define a consulta
    var params = {
        TableName:table,
        KeyConditionExpression: 'codigo = :VALcodigo',
        ExpressionAttributeValues: {
            ':VALcodigo': codigo_consulta+"\n"
        }
    };

  var response = "temporal ";  
  var temporal_resposta= "temporal ";  
//Operação de consulta
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else
        {
            temporal_resposta=JSON.stringify(data);
            console.log(temporal_resposta);
        }
    });

