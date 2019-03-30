const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

const apiG = new AWS.APIGateway();
const apiId = "5x92gycwni";

createDeployment(apiId, "prod").then(data => console.log(data));

function createDeployment(apiId, stageName) {
  const params = {
    restApiId: apiId,
    stageName: stageName
  };

  return new Promise((resolve, reject) => {
    apiG.createDeployment(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
