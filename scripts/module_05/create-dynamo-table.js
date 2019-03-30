// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

// Declare local variables
const dynamoDB = new AWS.DynamoDB();

createTable("hamsters")
  .then(() => createTable("races"))
  .then(data => console.log(data));

function createTable(tableName) {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "N"
      }
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDB.createTable(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
