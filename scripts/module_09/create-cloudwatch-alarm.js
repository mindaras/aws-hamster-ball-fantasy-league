// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

// Declare local variables
const cw = new AWS.CloudWatch();
const alarmName = "hamster-elb-alarm";
const topicArn = "arn:aws:sns:eu-central-1:522714423525:hamster-topic";
const tg = "targetgroup/hamsterTG/f053beefeaeff8b7";
const lb = "app/hamsterELB/b28d83683bb6abaa";

createCloudWatchAlarm(alarmName, topicArn, tg, lb).then(data =>
  console.log(data)
);

function createCloudWatchAlarm(alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: "LessThanThreshold",
    EvaluationPeriods: 1,
    MetricName: "HealthyHostCount",
    Namespace: "AWS/ApplicationELB",
    Period: 60,
    Threshold: 1,
    AlarmActions: [topicArn],
    Dimensions: [
      {
        Name: "TargetGroup",
        Value: tg
      },
      {
        Name: "LoadBalancer",
        Value: lb
      }
    ],
    Statistic: "Average",
    TreatMissingData: "breaching"
  };

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
