import React, { useContext, useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { SideList } from '../components/SideList/SideList';
import { VideoDetail } from '../components/VideoDetail/VideoDetail';
import { Store } from '../store/index';
import { useLocation } from 'react-router-dom';
import { fetchRelatedData, fetchSelectedData } from '../apis';

export const Watch = (props) => {
  const { globalState, setGloabalState } = useContext(Store);
  // URLからクエリパラメータを取得　現在のURLのpathやパラメータを取得
  const location = useLocation();
  const setVideos = async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('v');
    console.log(id);
    if (id) {
      // 別々で投げていたfetchをまとめて送るためにPromise.allをツァうツァう
      const [selected, related] = await Promise.all([
        fetchSelectedData(id),
        fetchRelatedData(id),
      ]);
      setGloabalState({
        type: 'SET_SELECTED',
        payload: { selected: selected.data.items.shift() },
      });
      setGloabalState({
        type: 'SET_RELATED',
        payload: { related: related.data.items },
      });
    }
  };
  useEffect(() => {
    setVideos();
  }, [location.search]);
  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>
  );
};
