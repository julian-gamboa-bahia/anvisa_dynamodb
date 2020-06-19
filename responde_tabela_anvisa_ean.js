/*

Junho 18, 2020:



*/
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
//var codigo="531612060066804\n";


exports.handler =   ( event, context, callback )  => {
 
    
    var table = "anvisa_junho_2020";
    var registrando="anvisa_julho_2020";
    
    var codigo_consulta=event["queryStringParameters"]['codigo_consulta'];
    //var enderecoIP="meuENDERECO";//event['requestContext']['identity']['sourceIp'];

//DB 1: PRE    
    var params = {
        TableName:registrando,
          Item: {
            codigo:codigo_consulta+""
      }
    };    

//DB 1:    
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
    
//DB 2: PRE
    var params = {
        TableName:table,
        KeyConditionExpression: 'codigo = :VALcodigo',
        ExpressionAttributeValues: {
            //':VALcodigo': "519501708157418\n"
            //':VALcodigo': codigo_consulta+""
            ':VALcodigo': codigo_consulta+"\n"
        }
    };

  var response = "temporal ";  
  var temporal_resposta= "temporal ";  
//DB 2: 


    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else
        {
            //temporal_resposta=" "+codigo_consulta+"  "+JSON.stringify(data);
            temporal_resposta=JSON.stringify(data);
             
             callback(null, temporal_resposta);
        }
    });//.promise().then(function(){ response="JSON.stringify(data)";  });

};