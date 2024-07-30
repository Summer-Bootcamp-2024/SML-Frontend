import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import node1img from '../../assets/images/profileImg2.png';
import ProfileModal from '../modal/ProfileModal';
import GettingIntroduceModal from '../modal/GettingIntroduceModal';
import { useApiUrlStore, useUserIdStore } from '../../store/store';
import axios from 'axios';

function FriendGraph() {
  const { user_id } = useUserIdStore();
  const { apiUrl } = useApiUrlStore();
  const cyRef = useRef(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [profileId, setProfileId] = useState('');
  const [relationData, setRelationData] = useState([]);
  const [cy, setCy] = useState(null);
  const [introduceModalOpen, setIntroduceModalOpen] = useState(false);

  const PostingOpenModal = (nodeId) => {
    setSelectedNodeId(nodeId);
    setStatusModalOpen(true);
  };

  const PostingClosedModal = () => {
    setStatusModalOpen(false);
  };

  const openIntroduceModal = (id) => { // 소개하기 모달 열기
    setProfileId(id);
    setIntroduceModalOpen(true);
  };

  const onCloseModal = () => {
    setIntroduceModalOpen(false);
  };

  // 친구 관계도 조회
  const getFriendRelation = async () => {
    try {
      const response = await axios.get(`${apiUrl}/relationships/${user_id}`, {
        withCredentials: true,
      });
      setRelationData(response.data);
    } catch (error) {
      if (err.response && err.response.status === 404) {
        setRelationData([]); // 빈 배열로 설정
      } else {
        console.error('Error fetching friend data:', error);
      }
    }
  };

  // 친구 프로필 이미지 조회
const getProfileImages = async (friends) => {
  try {
    const profileImagePromises = friends.map(async (friend) => {
      try {
        const response = await axios.get(`${apiUrl}/users/${friend}`, {
          withCredentials: true,
        });
        return { id: friend, image: response.data.image_url };
      } catch (error) {
        console.error(`Error fetching profile image for friend ${friend}:`, error);
      }
    });

    const profileImagesArray = await Promise.all(profileImagePromises);
    return profileImagesArray.reduce((acc, curr) => {
      acc[curr.id] = curr.image;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching profile images:', error);
    return {};
  }
};


  useEffect(() => {
    getFriendRelation();
  }, []);

  useEffect(() => {
    if (relationData.length === 0) return;

    const processGraphData = async () => {
      const elements = [];
      const edges = [];
      const friends = relationData
        .filter(friendship => friendship.status === 'accepted' && !friendship.is_deleted)
        .map(friendship => friendship.friend_id);

      const profileImages = await getProfileImages(friends);
      const userImg = localStorage.getItem('profile_image_url')
      
      // 사용자 노드 추가
      elements.push({ data: { id: user_id, image: userImg } });

      // 친구 관계도 노드 & 엣지 구현
      relationData.forEach(friendship => {
        if (friendship.status === 'accepted' && !friendship.is_deleted) {
          const { user_id: user, friend_id: friend } = friendship;

          // 친구 노드 추가
          if (!elements.find(e => e.data.id === friend)) {
            elements.push({ data: { id: friend, image: profileImages[friend]} || '' });
          }

          // 관계별 엣지 구분
          edges.push({ data: { id: `edge-${user}-${friend}`, source: user, target: friend, color: '#50A4D3' } });

          // 이촌 관계도 노드 & 엣지 구현
          relationData.forEach(otherFriendship => {
            if (otherFriendship.user_id === friend && otherFriendship.friend_id !== user && !elements.find(e => e.data.id === otherFriendship.friend_id)) {
              const otherFriend = otherFriendship.friend_id;

              // 이촌 노드 추가
              elements.push({ data: { id: otherFriend, image: profileImages[otherFriend]} || '' });
              // 관계별 엣지 구분
              edges.push({ data: { id: `edge-${friend}-${otherFriend}`, source: friend, target: otherFriend, color: '#404F60' } });
            }
          });
        }
      });

      const cyInstance = cytoscape({
        container: cyRef.current,
        elements: [...elements, ...edges],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#fff',
              'background-image': 'data(image)',
              'background-fit': 'cover',
              'background-opacity': 0,
              'border-color': '#50A4D3',
              'border-width': 2,
              'height': 45,
              'width': 45,
            }
          },
          {
            selector: `node[id="${user_id}"]`,
            style: {
              'height': 60,
              'width': 60,
              'border-color': '#50A4D3',
            }
          },
          {
            selector: 'node:selected',
            style: {
              'border-width': 3,
              'border-color': '#F9C77B',
              'background-color': '#fff',
              'background-image': 'data(image)',
              'background-fit': 'cover',
              'background-opacity': 1,
              'width': 60,
              'height': 60,
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#50A4D3',
              'target-arrow-color': '#50A4D3',
              'target-arrow-shape': 'triangle'
            }
          }
        ],
        layout: {
          name: 'concentric',
          concentric: node => node.id() === user_id ? 1 : 0,
          levelWidth: nodes => 1,
          spacingFactor: 1.5
        }
      });

      cyInstance.on('tap', 'node', function (evt) {
        const node = evt.target;
        if (node.id() !== `${user_id}`) {
          PostingOpenModal(node.id());
        }
      });

      setCy(cyInstance);

      return () => {
        if (cy) {
          cy.destroy();
        }
      };
    };

    processGraphData();
  }, [relationData]);

  return (
    <div className="w-full h-full">
      <div id="cy" ref={cyRef} className='w-full h-full' />
      {statusModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal}
          friendId={selectedNodeId}
          openIntroduceModal={openIntroduceModal} />
      )}
      {introduceModalOpen && <GettingIntroduceModal onCloseModal={onCloseModal} friendId={selectedNodeId} ProfileId={profileId} />}
    </div>
  );
}

export default FriendGraph;
