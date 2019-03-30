// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

// Declare local variables
const ec2 = new AWS.EC2();
const volumeId = "vol-00801b1b0d89b2346";
const instanceId = "i-0da4aeb7ffcfe9faa";

detachVolume(volumeId).then(() => attachVolume(instanceId, volumeId));

function detachVolume(volumeId) {
  const params = {
    VolumeId: volumeId
  };

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function attachVolume(instanceId, volumeId) {
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: "/dev/sdf"
  };

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
