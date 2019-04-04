/**
 * ChatworkService object.
 */
const ChatworkService = {
  /**
   * メッセージの送信
   *
   * @param {string} body メッセージ内容
   */
  sendMessage: (body) => {

    const properties = PropertiesService.getScriptProperties()
      , token = properties.getProperty('CHATWORK_TOKEN') // Chatwork APIトークン
      , roomId = properties.getProperty('CHATWORK_ROOM_ID') // Chatwork ルームID
      , client = ChatWorkClient.factory({token: token}) // チャットワーククライアント
    ;

    const params = {
      room_id: roomId,
      body: body, // タスクの内容
    };

    client.sendMessage(params);
  }
};
