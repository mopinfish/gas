function main() {
  addRegularTasks();
}

/**
 * タスクの追加
 *
 * @param {string} body タスク内容
 * @param {number} room_id ルームID
 * @param {number} 期限（UNIXTIME）
 * @param {Array.<number>} account_ids 担当者のID（数値の配列）
 */
function addTask(body, room_id, limit, account_ids) {
 
  const token = UserProperties.getProperty('CHATWORK_TOKEN') // チャットワークAPIトークン
      , client = ChatWorkClient.factory({token: token}) // チャットワーククライアント
      ;

  const params = {
    body: body, // タスクの内容
    room_id: room_id,
    limit: limit, // タスクの期限
    to_id_list: account_ids // アカウントIDのリスト
  };

  client.sendTask(params);

}

/**
 * スプレッドシートから取得したタスクをチャットワークに登録する
 */
function addRegularTasks() {
  const spreadsheetId = '18Ze4XnW-080QN5_fK7-jBacWj-RgqVXcctWYsryAfOQ'
      , taskListSheet = SpreadsheetApp.openById(spreadsheetId)
      , taskCount = taskListSheet.getDataRange().getLastRow() - 1 // 見出し行分を引いておく
      , taskData = taskListSheet.getDataRange().getValues()
      , date = new Date() // 今日の日付
      , limit = (date.getTime() / 1000).toFixed() // 秒単位のUNIX時間を取得 
      , todayNum = Math.floor(date.getDay()).toString(10)
      ;

  // 見出し行を削除
  taskData.shift();

  taskData.forEach(function (row, index) {
    const body = row[1-1]         // タスク内容
      , room_id = (row[2-1]).toString(10)      // ルームID
      , account_ids = (row[3-1]).toString(10).split(',')  // アカウントID
      , dayList = row[4-1].split(',')
      ;

    if (dayList.indexOf(todayNum) >= 0) {
      addTask(body, room_id, limit, account_ids);
    }

  });
}
