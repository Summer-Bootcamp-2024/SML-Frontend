import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import mainProfile from '../assets/images/myprofile/profileImgSquare.png';
import node1img from '../assets/images/profileImg2.png';
import ProfileModal from './ProfileModal';
import { useApiUrlStore, useUserIdStore } from '../store/store';
import axios from 'axios';

function FriendGraph() {
  const { user_id } = useUserIdStore();
  const { apiUrl } = useApiUrlStore();
  const cyRef = useRef(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [relationData, setRelationData] = useState([]);
  const [cy, setCy] = useState(null);

  const PostingOpenModal = (nodeId) => {
    setSelectedNodeId(nodeId);
    setStatusModalOpen(true);
  };

  const PostingClosedModal = () => {
    setStatusModalOpen(false);
  };

  //친구 관계도 조회
  const getFriendRelation = async () => {
    try {
      const response = await axios.get(`${apiUrl}/relationships/${user_id}`, {
        withCredentials: true,
      });
      setRelationData(response.data);
    } catch (error) {
      console.error('Error fetching friend data:', error);
    }
  };

  useEffect(() => {
    getFriendRelation();
  }, []);

  useEffect(() => {
    if (relationData.length === 0) return;

    const elements = [];
    const edges = [];

    //element를 user로 지정
    elements.push({ data: { id: user_id, image: mainProfile } });

    //일촌관계를 반영하여 노드&엣지 구현
    relationData.forEach(friendship => {
      if (friendship.status === 'accepted' && !friendship.is_deleted) {
        const { user_id: user, friend_id: friend } = friendship;

        //일촌의 노드
        if (!elements.find(e => e.data.id === friend)) {
          elements.push({ data: { id: friend, image: node1img } });
        }//관계별로 엣지 구분
        edges.push({ data: { id: `edge-${user}-${friend}`, source: user, target: friend, color: '#50A4D3' } });

        //이촌관계를 반영하여 노드&엣지 구현
        relationData.forEach(otherFriendship => {
          if (otherFriendship.user_id === friend && otherFriendship.friend_id !== user && !elements.find(e => e.data.id === otherFriendship.friend_id)) {
            const otherFriend = otherFriendship.friend_id;

            //이촌의 노드
            elements.push({ data: { id: otherFriend, image: node1img } });
            //관계별로 엣지 구분
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
      if (node.id() !== 'main') {
        PostingOpenModal(node.id());
      }
    });

    setCy(cyInstance);

    return () => {
      if (cy) {
        cy.destroy();
      }
    };
  }, [relationData]);

  return (
    <div className="w-full h-full">
      <div id="cy" ref={cyRef} className='w-full h-full' />
      {statusModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal} nodeId={selectedNodeId} />
      )}
    </div>
  );
}

export default FriendGraph;
