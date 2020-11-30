import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  // シンプルなカウントアップ/ダウン
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // setCountに関数を渡し、前のcountを引数として関数の結果を受け取りstateにセットする
  const increment2 = () => setCount(previousCount => previousCount + 2);
  const decrement2 = () => setCount(previousCount => previousCount - 2);

  // リセット
  const reset = () => setCount(0);

  // 2倍
  const multiply = () => setCount(count * 2);

  // 3の倍数の時だけ3で割る
  const divedeThree = () => count % 3 === 0 ? setCount(count / 3) : count;

  return (
    <>
      <div>count: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
      </div>
      <div>
        <button onClick={increment2}>+2</button>
        <button onClick={decrement2}>-2</button>
      </div>
      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={multiply}>x2</button>
        <button onClick={divedeThree}>3の倍数の時だけ3で割る</button>
      </div>
    </>
  );
}

export default App;
