function main() {
  const result: any = FeedlyService.streamOfSaveLater()
      , items: any[] = result['items']
      , body: string = FeedlyHelper.streadMessageBody(items)
      ;
  Logger.log(body);
  ChatworkService.sendMessage(body);
}

