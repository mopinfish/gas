const ArrayUtil = {
	// while文の場合 *ES6で使用可能な入れ替え法を使用
  shuffle: (arr: any[]): any[] => {
		let i: number = arr.length;
		while (i) {
			let j: number = Math.floor(Math.random() * i);
			[arr[i--], arr[j]] = [arr[j], arr[i--]];
		}
		return arr;
	}
};
