// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

// Declare local variables
const ec2 = new AWS.EC2();
const sgName = "hamster_sg";
const keyName = "hamster_key";
const instanceId = "i-08809fcbd485212e1";

stopInstance(instanceId)
  .then(() => createInstance(sgName, keyName))
  .then(data => console.log("Created instance with:", data));

function createInstance(sgName, keyName) {
  const params = {
    ImageId: "ami-09def150731bdbcc2",
    InstanceType: "t2.micro",
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [sgName]
  };

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function stopInstance(instanceId) {
  const params = {
    InstanceIds: [instanceId]
  };

  return new Promise((resolve, reject) => {
    ec2.stopInstances(params, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}
