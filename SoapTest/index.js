var soap = require('soap');

module.exports = async function (context, req) {
    var barcode = req.query.barcode || req.body.barcode;
    var wsdlUrl = 'http://www.dneonline.com/calculator.asmx?wsdl';
    var data = 'sd';
    soap.createClient(wsdlUrl, function (err, soapClient) {
        // we now have a soapClient - we also need to make sure there's no `err` here. 
        if (err) {
            context.res = {
                status: 500, /* Defaults to 200 */
                body: err
            };
        }            
        soapClient.Add({
            intA: 1,
            intB: 2
        }, function (err, result) {
            if (err) {
                context.res = {
                    status: 500, /* Defaults to 200 */
                    body: err
                };
            }
            data = result.AddResult;
                     
        });
    });

    context.res ={
        status:200,
        body: data + ' dd'
    }  
    
}
