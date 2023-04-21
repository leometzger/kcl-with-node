const kcl = require("aws-kcl");
const util = require("util");

const { sequelize } = require("./src/db");
const { Location } = require("./src/locations/models");

// reference https://github.com/awslabs/amazon-kinesis-client-nodejs

const recordProcessor = {
  initialize: function (initializeInput, completeCallback) {
    sequelize
      .authenticate()
      .then(() => {
        completeCallback();
      })
      .catch((err) => {
        // Log no new relic
        console.error("Unable to connect to the database:", err);
        throw err;
      });
    // completeCallback();
  },

  processRecords: function (processRecordsInput, completeCallback) {
    if (!processRecordsInput || !processRecordsInput.records) {
      completeCallback();
      return;
    }

    let records = processRecordsInput.records;
    let record, sequenceNumber, partitionKey, data;

    for (let i = 0; i < records.length; ++i) {
      record = records[i];
      sequenceNumber = record.sequenceNumber;
      partitionKey = record.partitionKey;

      data = Buffer.from(record.data, "base64").toString();

      try {
        items = JSON.parse(data);
        const parsed = items.map((item) => ({
          x: item.X,
          y: item.Y,
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        Location.bulkCreate(parsed)
          .then(() => {
            processRecordsInput.checkpointer.checkpoint(
              sequenceNumber,
              function (err, checkpointedSequenceNumber) {
                completeCallback();
              }
            );
          })
          .catch((e) => {
            completeCallback();
          });
      } catch (e) {
        console.log("err2", e);
      }
    }

    if (!sequenceNumber) {
      completeCallback();
      return;
    }
  },

  leaseLost: function (leaseLostInput, completeCallback) {
    completeCallback();
  },

  shardEnded: function (shardEndedInput, completeCallback) {
    shardEndedInput.checkpointer.checkpoint(function (err) {
      completeCallback();
    });
    completeCallback();
  },
};

kcl(recordProcessor).run();
