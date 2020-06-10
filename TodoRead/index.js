const azure = require('azure-storage');
const uuid = require('uuid');

const connstr = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;';
const tableService = azure.createTableService(connstr);
const tableName = "todo";

module.exports = function (context, req) {
    context.log('Start ItemRead');

    const id = req.params.id;
    if (id) {
        // return item with RowKey 'id'
        tableService.retrieveEntity(tableName, 'Partition', id, function (error, result, response) {
            if (!error) {
                context.res.status(200).json(response.body);
            }
            else {
                context.res.status(500).json({error : error});
            }
        });
    }
    else {
        // return the top x items
        var query = new azure.TableQuery().top(100);
        tableService.queryEntities(tableName, query, null, function (error, result, response) {
            if(!error){
                context.res.status(200).json(response.body.value);
            } else {
                context.res.status(500).json({error : error});
            }
        });
    }
};