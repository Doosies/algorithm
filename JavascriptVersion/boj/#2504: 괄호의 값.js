const stdin = (
  process.platform === "linux"
    ? require("fs").readFileSync(0, "utf-8")
    : `(()[[]])([])`
)
  .trim()
  .split("\n");
const input = (() => {
  let line = 0;
  return () => stdin[line++]; //.split(" ").map((v) => +v);
})();

const solution = (inp) => {
  const stack = [];
  const numStack = [];
  const num = { "]": 3, ")": 2 };

  let closeBefore = false;
  let openBefore = false;
  let sum = 0;

  for (let str of inp) {
    // console.log(numStack);
    // 괄호 열기 = stack에 집어넣음
    if (str === "(" || str === "[") {
      if (openBefore) {
        numStack.push(sum);
        sum = 0;
      }
      stack.push(str);
      openBefore = true;
      closeBefore = false;
    }
    // 괄호 닫기 = stack에서 뺌.
    else {
      const pop = stack.pop();

      // 앞의 괄호와 짝이 맞을경우
      if ((str === ")" && pop === "(") || (str === "]" && pop === "[")) {
        // 두번이상 닫는거라면
        if (closeBefore) {
          sum = sum * num[str] + numStack.pop();
        }
        // 처음 닫아보는거라면
        else {
          sum += num[str];
        }
      }
      //짝이 맞지않으면 0 리턴
      else {
        return 0;
      }
      openBefore = false;
      closeBefore = true;
    }
  }
  return stack.length > 0 ? 0 : sum;
};

console.log(solution(input()));

// const b = solution("[][]((])");
// const c = solution("[()(()[])]");
const d = solution("()(");

// console.log(b);
// console.log(c);
console.log(d);
