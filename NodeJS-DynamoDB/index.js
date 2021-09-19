const AWS = require("aws-sdk");

AWS.config = new AWS.Config()
AWS.config.accessKeyId = "#"
AWS.config.secretAccessKey = "#"

AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB()

var params = {
    TableName: "Movies",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH" }, 
        { AttributeName: "title", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table");
    }
});

const docClient = new AWS.DynamoDB.DocumentClient();

var postItem = {
    TableName: "Movies",
    Item: {
        "year": 2021,
        "title": "BATMAN",
        "info": {
            "authors": "Nothing happens at all.",
            "rating": 10
        }
    }
}

console.log("Adding a new item...")
docClient.put(postItem, function (err, data) {
    if (err) {
        console.error("Unable to create a new Item", err)
    } else {
        console.info("Item inserted")
    }
});

console.log("get a item on the DB");
var getItem = {
    TableName: "Movies",
    Key: {
        year: 2021,
        title: "BATMAN"
    }
}

docClient.get(getItem, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.info(data)
    }
})

console.log("update a item on the DB");
var getItem = {
    TableName: "Movies",
    Key: {
        year: 2021,
        title: "BATMAN"
    },
    UpdateExpression: "set info.authors = :authors",
    ExpressionAttributeValues: {
        ":authors": ["Daniel Alejandro"]
    },
    ReturnValues: "UPDATED_NEW"
}

docClient.update(getItem, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.info(data)
    }
});

console.log("delete a item on the DB");
var deleteItem = {
    TableName: "Movies",
    Key: {
        year: 2021,
        title: "BATMAN"
    }
}

docClient.delete(deleteItem, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.info(data)
    }
})