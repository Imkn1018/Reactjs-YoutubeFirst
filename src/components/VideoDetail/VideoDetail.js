import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSelectedData } from '../../apis/index';
import { Store } from '../../store/index';
import { VideoPlay } from '../VideoPlay/VideoPlay';
import Style from './VideoDetail.module.scss';
import Linkify from 'react-linkify';
export const VideoDetail = () => {
  const { globalState, setGloabalState } = useContext(Store);
  // URLからクエリパラメータを取得　現在のURLのpathやパラメータを取得
  const location = useLocation();
  // useEffect内部ではawait使えないらしいので、ここで定義
  const setSelectedVideo = async () => {
    // URLSearchParams　はコンストラクタ　location.search＝URLの？以降を取得
    const serchParams = new URLSearchParams(location.search);
    // idは"v＝”で表示されるため
    const id = serchParams.get('v');
    await fetchSelectedData(id).then((res) => {
      const item = res.data.items.shift();
      setGloabalState({ type: 'SET_SELECTED', payload: { selected: item } });
      console.log(res);
    });
  };
  // マウントされたタイミングで行う
  useEffect(() => setSelectedVideo(), [location.search]);
  return globalState.selected && globalState.selected.id ? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.id} />
      <p>{globalState.selected.snippet.title}</p>
      <hr />
      <Linkify>
        <pre>{globalState.selected.snippet.description}</pre>
      </Linkify>
    </div>
  ) : (
    <span>no data</span>
  );
};
