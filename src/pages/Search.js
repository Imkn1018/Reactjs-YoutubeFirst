import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../components/Layout/Layout';
// queryparameter取得
import { useLocation } from 'react-router-dom';
import { fetchSearchData } from '../apis';
import { Store } from '../store';
import { VideoGridItem } from '../components/VideoGridItem/VideoGridItem';
import { VideoGrid } from '../components/VideoGrid/VideoGrid';

export const Search = (props) => {
  const location = useLocation();
  const { globalState, setGloabalState } = useContext(Store);
  const setSearchResult = async () => {
    // URLSEarchparams? => とりま配列で返す関するらしい
    // location.search=> ?query=~ のぶぶん
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      await fetchSearchData(query).then((res) => {
        setGloabalState({
          type: 'SET_SEARCHED',
          payload: { searched: res.data.items },
        });
      });
    }
    console.log(searchParams);
  };
  // 第2引数にlocation.search入れることでリストの更新をする
  useEffect(() => {
    setSearchResult();
  }, [location.search]);
  return (
    <Layout>
      <VideoGrid>
        {globalState.searched ? (
          globalState.searched.map((search) => {
            return (
              <VideoGridItem
                id={search.id.videoId}
                key={search.id.videoId}
                src={search.snippet.thumbnails.medium.url}
                title={search.snippet.title}
                channel_name={search.snippet.channelTitle}
              />
            );
          })
        ) : (
          <span>no data</span>
        )}
      </VideoGrid>
    </Layout>
  );
};
