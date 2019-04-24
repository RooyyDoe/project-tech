import pymongo
 
my_client = pymongo.MongoClient(
    'mongodb+srv://Roy:Lesserdemon23@gamemate-tdlor.mongodb.net/test'
)

try:
    print("MongoDB version is %s" %
            my_client.server_info()['version'])
except pymongo.errors.OperationFailure as error:
    print(error)
    quit(1)