function main() {
  const res = FeedlyService.profile()
      ;
  ChatworkService.sendMessage(res);
}

/**
 * FeedlyService object.
 */
const FeedlyService = {

  PROFILE_URL: 'https://cloud.feedly.com/v3/profile',

  /**
   * Get auth string.
   *
   * @return {String}
   */
  auth: function () {
    const properties = PropertiesService.getScriptProperties()
        , token = properties.getProperty('FEEDLY_TOKEN') // FEEDLY APIトークン
        ;
    return `OAuth ${token}`;
  },

  /**
   * Log out profile info.
   */
  profile: function () {
    const auth = this.auth()
        , response = this.get(this.PROFILE_URL, auth)
        ;
    return response.getContentText('UTF-8');
  },

  /**
   * Get response with auth.
   *
   * @param {String} url
   * @param {String} auth
   */
  get: (url, auth) => {
    const headers = {'Authorization' : auth}
        , options = {
            'method' : 'get',
            'contentType' : 'application/json;charset=utf-8',
            'headers' : headers
          }
        ;

    return UrlFetchApp.fetch(url, options);
  }
};

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
