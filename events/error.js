module.exports = async (client, error) => {
  client.logger.log(`Error: \n${JSON.stringify(error)}`, "error");
};
