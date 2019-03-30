// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "/* TODO: Add your region */" });

// Declare local variables
const route53 = new AWS.Route53();
const hzId = "/hostedzone/ZNPHRZGR6DSWE";

createRecordSet(hzId).then(data => console.log(data));

function createRecordSet(hzId) {
  const params = {
    HostedZoneId: "/hostedzone/ZNPHRZGR6DSWE",
    ChangeBatch: {
      Changes: [
        {
          Action: "CREATE",
          ResourceRecordSet: {
            Name: "mindaugaslazauskas.com",
            Type: "A",
            AliasTarget: {
              DNSName: "hamsterELB-1600005501.eu-central-1.elb.amazonaws.com",
              EvaluateTargetHealth: false,
              HostedZoneId: "Z215JYRZR1TBD5"
            }
          }
        }
      ]
    }
  };
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/rande.html#elb_region

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
