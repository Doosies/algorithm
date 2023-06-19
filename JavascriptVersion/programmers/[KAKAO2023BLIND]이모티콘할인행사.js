// 1, 이모티콘 개수만큼의 순열을 구함 (2개일때는 4개중 2개를 고르는 순열) (최대 4^7 = 16,384개)
//( 2개일경우 -> 00 01 02 03 10 11 12 13 20 21 22 23 30 31 31 33 = 16개)
// 2, 순열 구한걸로 모든 유저가 해당 할인율로 구매할지 정함 (16,484 * 100 * 7 = 11,538,800)
//      할인배열 = [10, 20, 30, 40]
// 2-1, for 순열 (할인율 -> 01, 11, ..., )
//        현재순열_구매금액 = 0
//        현재순열_서비스가입자 = 0
//        for 유저[원하는할인비율, 기준가격]
//          구매금액 = 0
//          for 할인율(0,1 형식)
//            if 할인율 >= 원하는할인비율: 구매금액 += 할인후금액
//          if 구매금액 >= 기준가격: 현재순열_서비스가입자 ++
//          else 현재순열_구매금액 += 구매금액
//        result.push([현재순열_서비스가입자, 현재순열_구매금액])
//      result.sort(첫번째, 두번째)
// 3. result[0] 출력

const 할인배열 = [10, 20, 30, 40];
function 중복순열가져오기(이모티콘_개수, 배열, 결과) {
  if (배열.length === 이모티콘_개수) {
    결과.push(배열);
    return;
  }
  for (let i = 0; i < 4; i++) {
    중복순열가져오기(이모티콘_개수, [...배열, 할인배열[i]], 결과);
  }
  return 결과;
}
function solution(users, emoticons) {
  const 중복순열 = 중복순열가져오기(emoticons.length, [], []);
  const 결과 = [];

  중복순열.forEach(현재_순열_할인율 => {
    let 현재순열_구매금액 = 0;
    let 현재순열_서비스가입자 = 0;

    users.forEach(([원하는_할인비율, 기준가격], i) => {
      let 현재_구매금액 = 0;
      현재_순열_할인율.forEach((할인율, 이모티콘_인덱스) => {
        if (할인율 >= 원하는_할인비율) {
          현재_구매금액 += (emoticons[이모티콘_인덱스] * (100 - 할인율)) / 100;
        }
      });
      if (현재_구매금액 >= 기준가격) 현재순열_서비스가입자++;
      else 현재순열_구매금액 += 현재_구매금액;
    });
    결과.push([현재순열_서비스가입자, 현재순열_구매금액]);
  });

  결과.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    else return a[0] - b[0];
  });

  return 결과.at(-1);
}

console.log(
  solution(
    [
      [40, 10000],
      [25, 10000],
    ],
    [7000, 9000],
  ),
);

console.log(
  solution(
    [
      [40, 2900],
      [23, 10000],
      [11, 5200],
      [5, 5900],
      [40, 3100],
      [27, 9200],
      [32, 6900],
    ],
    [1300, 1500, 1600, 4900],
  ),
);
