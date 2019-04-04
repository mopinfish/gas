const FeedlyHelper: any = {
  /**
   * 「後で読む」の最新90件からランダムで10件を取得し、メッセージを組み立てる
   */
  streadMessageBody(items: any[]): string {
    let body: string = '';
    // シャッフルする
		const randomizedItems: any[] = ArrayUtil.shuffle(items);

    body += '[info]';
    // 10件分取得する
    [...Array(10)].map((_, i) => {
      const item = items[i]
          , title = item['title']
          , url = item['alternate'][0]['href']
          ;
      body += `${title}｜${url}\n\n`;
    });
    body += '[/info]';
    return body;
  }
};
