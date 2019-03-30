const AWS = require("aws-sdk");
const helpers = require("./helpers");

AWS.config.update({ region: "eu-central-1" });

// Declare local variables
const autoScaling = new AWS.AutoScaling();

const lcName = "hamsterLC";
const roleName = "hamsterLCRole";
const sgName = "hamster_sg";
const keyName = "hamster_key";

helpers
  .createIamRole(roleName)
  .then(profileArn => createLaunchConfiguration(lcName, profileArn))
  .then(data => console.log(data));

function createLaunchConfiguration(lcName, profileArn) {
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: "ami-0bb17a14400e37b4e",
    InstanceType: "t2.micro",
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [sgName],
    UserData:
      "IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzgueCB8IHN1ZG8gYmFzaCAtCnN1ZG8geXVtIGluc3RhbGwgLXkgbm9kZWpzCnN1ZG8geXVtIGluc3RhbGwgLXkgZ2l0CmdpdCBjbG9uZSBodHRwczovL2dpdGh1Yi5jb20vcnlhbm11cmFrYW1pL2hiZmwuZ2l0CmNkIGhiZmwKbnBtIGkKbnBtIHJ1biBzdGFydAoK"
  };

  return new Promise((resolve, reject) => {
    autoScaling.createLaunchConfiguration(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
