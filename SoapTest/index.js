var soap = require('soap');

module.exports = async function (context, req) {  
    context.log('JavaScript HTTP trigger function processed a request.');
    var wsdlUrl = 'http://www.dneonline.com/calculator.asmx?wsdl';
    soap.createClient(wsdlUrl, function (err, soapClient) {        
        if (err) {
            context.res = {
                status: 500,
                body: err
            };
        } 
       
        try{
            soapClient.Add({
                intA: 1,
                intB: 2
            }, function (err, result) {
                if (err) {
                    context.res = {
                        status: 500,
                        body: 'error while fetch data'
                    };
                }         
                context.res = {
                    body: result
                };                    
            });
        }catch(e){
            context.res = {
                status: 200,
                body: "catch error here"
            }
        }
    });  

    context.res = {
        status: 200,
        body: 'print at the last line'
    };

}
