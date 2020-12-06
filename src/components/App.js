import React, { useState, useReducer } from 'react';
import reducer from '../reducers';  // /index.jsは省略可
import Event from './Event'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // useReducerを使う cf: https://ja.reactjs.org/docs/hooks-reference.html#usereducer
  // reducerで扱う状態はevents(イベント一覧) -> 初期値は空配列を渡す
  // dispatchにactionを渡す -> reducerの中でstateが変わる
  const [state, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addEvent = e => {
    e.preventDefault();  // イベント実行時に画面がリロードされるのを防ぐ。シングルページアプリケーションでは最低限のDOMだけ書き換わって欲しい

    // dispatch(action)
    // actionの中身...type(必須) + 付加情報
    dispatch({
      type: 'CREATE_EVENT',
      title,
      body
    });

    setTitle('');
    setBody('');
  };

  const deleteAllEvents = e => {
    e.preventDefault();
    // resultにはconfirmでOK/NGどちらが押されたかがtrue/falseで返る
    const result = window.confirm('全てのイベントを本当に削除しても良いですか？');
    if (result) dispatch({ type: 'DELETE_ALL_EVENTS' });
  }

  const unCreatable = title === '' || body === '';

  return (
    <div className="container-fluid">
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventTitle">タイトル</label>
          <input className="form-control" id="formEventTitle" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="formEventBody">ボディー</label>
          <textarea className="form-control" id="formEventBody" value={body} onChange={e => setBody(e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={addEvent} disabled={unCreatable}>イベントを作成する</button>
        <button className="btn btn-danger" onClick={deleteAllEvents} disabled={state.length === 0}>全てのイベントを削除する</button>
      </form>

      <h4>イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディー</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* index(mapの第二引数としてデフォルトで入ってるもの)を用いてユニークなキーをつける */}
          { state.map((event, index) => (<Event key={index} event={event} dispatch={dispatch} />)) }
        </tbody>
      </table>
    </div>
  );
}

export default App;
