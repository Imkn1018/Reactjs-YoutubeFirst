import React, { useContext, useEffect } from 'react';
import { fetchRelatedData } from '../../apis';
import { Store } from '../../store/index';
import { SideListItem } from './SideListItem';
import Style from './SideList.module.scss';

export const SideList = () => {
  const { globalState, setGloabalState } = useContext(Store);
  // const setRelatedVideo = async (id) => {
  //   {
  //     await fetchRelatedData(id).then((res) => {
  //       setGloabalState({
  //         type: 'SET_RELATED',
  //         payload: { related: res.data.items },
  //       });
  //     });
  //   }
  // };

  // useEffect(() => {
  //   setRelatedVideo(globalState.selected.id);
  // }, [globalState.selected]);
  return (
    <div className={Style.sidenav}>
      {globalState.related ? (
        globalState.related.map((video) => {
          return (
            <SideListItem
              id={video.id.videoId}
              key={video.id.videoId}
              src={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
              channel_name={video.snippet.channelTitle}
            />
          );
        })
      ) : (
        <span>nodata</span>
      )}
    </div>
  );
};
