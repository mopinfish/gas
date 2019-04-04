/**
 * FeedlyService object.
 */
const FeedlyService = {

  PROFILE_URL: 'https://cloud.feedly.com/v3/profile',
//  STREAM_URL: `https://cloud.feedly.com/v3/streams/contents?streamId=user/${PropertiesService.getScriptProperties().getProperty('FEEDLY_USER_ID')}/tag/Read%20For%20Lator&count=300`,
  STREAM_URL: `https://cloud.feedly.com/v3/streams/contents?streamId=user/${PropertiesService.getScriptProperties().getProperty('FEEDLY_USER_ID')}/tag/global.saved&count=100`,

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

  streamOfSaveLater: function () {
    const auth = this.auth()
        , response = this.get(this.STREAM_URL, auth)
        ;
    return JSON.parse(response.getContentText('UTF-8'));
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
