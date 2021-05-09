import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { fetchPopularData } from '../apis';
import { Layout } from '../components/Layout/Layout';
import { VideoGrid } from '../components/VideoGrid/VideoGrid';
import { VideoGridItem } from '../components/VideoGridItem/VideoGridItem';
import { Store } from '../store/index';

export const Top = (props) => {
  const { globalState, setGloabalState } = useContext(Store);
  useEffect(() => {
    fetchPopularData().then((res) => {
      console.log('data', res);
      
      setGloabalState({
        type: 'SET_POPULAR',
        payload: { popular: res.data.items },
      });
      console.log(typeof(globalState.popular))
    });
  }, []);
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular &&
          globalState.popular.map((popular) => {
            return (
              <VideoGridItem
                id={popular.id}
                key={popular.id}
                src={popular.snippet.thumbnails.standard.url}
                title={popular.snippet.title}
                channel_name={popular.snippet.channelTitle}
              ></VideoGridItem>
            );
          })}
      </VideoGrid>
    </Layout>
  );
};
