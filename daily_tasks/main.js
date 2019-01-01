function main() {
  addTasks();
}

/**
 * タスクの追加
 */
function addTasks() {
 
  const token = UserProperties.getProperty('CHATWORK_TOKEN') // チャットワークAPIトークン
      , id = UserProperties.getProperty('CHATWORK_ID') // チャットワークID
      , room_id = PropertiesService.getScriptProperties().getProperty('ROOM_ID') // ルームID
      , date = new Date() // 今日の日付
      , limit = date.getTime()/1000 // 秒単位のUNIX時間を取得 
      , client = ChatWorkClient.factory({token: token}) // チャットワーククライアント
      ;

  const params = {
    body: "ミルクを買う", // タスクの内容
    room_id: room_id,
    limit: limit, // タスクの期限
    to_id_list: [id] // アカウントIDのリスト
  };

  client.sendTask(params);

}
