'use strict';

const getUpdates = (app, telegramServer)=> {
  app.post('/getUpdates', (req, res, next)=> {
    // console.log(colors.yellow('Processing route client /getUpdates'));
    const botToken = req.body.token;
    // console.log(colors.blue(`bot token: ${botToken}`));
    // console.log(colors.blue('Requesting updates with request:'));
    // console.log(colors.blue(JSON.stringify(req.body)));
    // select messages for this bot
    let messages = telegramServer.storage.botMessages.filter(update=> (
      update.botToken === botToken && !update.isRead
    ));
    // turn messages into updates
    messages = messages.map((update)=> {
      update.isRead = true;
      return update;
    });
    const data = {ok: true, result: messages};
    res.sendResult(data);
  });
};

module.exports = getUpdates;
