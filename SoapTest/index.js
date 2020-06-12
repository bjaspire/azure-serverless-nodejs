var soap = require('soap');

module.exports = async function (context, req) {  
    context.log('JavaScript HTTP trigger function processed a request.');
    var wsdlUrl = 'http://www.dneonline.com/calculator.asmx?wsdl';
    soap.createClient(wsdlUrl, function (err, soapClient) {
        if (err) {
            context.log(err);
        }      
        soapClient.Add({
            intA: 95,
            intB: 99
        }, function (err, result) {
            if (err) {
            context.log(err);
            }
            context.res = {
                status: 200,
                body: 'result try'
            };
        });
    });
}
