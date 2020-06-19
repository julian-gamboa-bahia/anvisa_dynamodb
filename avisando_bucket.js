/*
JUnho, 2020

*/



const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: 'us-west-2'});

const s3 = new AWS.S3();

exports.handler = async (event) => {

  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  const srcSize    = decodeURIComponent(event.Records[0].s3.object.size);
  
  const htmlBody = `<!DOCTYPE html><html><head></head><body><h1>${srcKey}</h1>Arquivado em:${srcBucket}</body></html>`;
  //const assunto = `aviso-ses-deep-archive-junho-02:  ${srcSize}`;
  const assunto = `aviso-ses-deep-archive-junho-16:  ${srcSize}`;


          const sesParams = {
          Destination: {
            ToAddresses: ['julian.gamboa.ms.2021@gmail.com'],
          },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: htmlBody,
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: assunto,
            },
          },
          Source: 'sos.exatas.2019@gmail.com',
        };

  const response = await SES.sendEmail(sesParams).promise();

  return response;  
};
