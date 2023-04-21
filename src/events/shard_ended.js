module.exports = function onShardEnded(shardEndedInput, completeCallback) {
  shardEndedInput.checkpointer.checkpoint(function (err) {
    completeCallback();
  });
  completeCallback();
};
