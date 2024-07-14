import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import mainProfile from '../assets/images/myprofile/profileImgSquare.png';
import node1img from '../assets/images/profileImg2.png';
import ProfileModal from './ProfileModal';

function FriendGraph() {
  const cyRef = useRef(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const PostingOpenModal = (nodeId) => {
    setSelectedNodeId(nodeId);
    setStatusModalOpen(true);
  };

  const PostingClosedModal = () => {
    setStatusModalOpen(false);
  };

  useEffect(() => {
    const cy = cytoscape({
      container: cyRef.current, // container to render in

      elements: [ // list of graph elements to start with
        { data: { id: 'main', image: mainProfile } }, // central node
        { data: { id: 'node1', image: node1img } },
        { data: { id: 'node2', image: node1img } },
        { data: { id: 'node3', image: node1img } },
        { data: { id: 'node4', image: node1img } },
        { data: { id: 'node5', image: node1img } },
        { data: { id: 'node6', image: node1img } },
        { data: { id: 'node7', image: node1img } },
        { data: { id: 'edge1', source: 'main', target: 'node1' } },
        { data: { id: 'edge2', source: 'main', target: 'node2' } },
        { data: { id: 'edge3', source: 'main', target: 'node3' } },
        { data: { id: 'edge4', source: 'main', target: 'node4' } },
        { data: { id: 'edge5', source: 'main', target: 'node5' } },
        { data: { id: 'edge6', source: 'main', target: 'node6' } },
        { data: { id: 'edge7', source: 'main', target: 'node7' } },
      ],

      style: [ // the stylesheet for the graph
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
          selector: 'node[id="main"]',
          style: {
            'height': 60,
            'width': 60,
            'border-color': '#50A4D3',
          }
        },
        {
          selector: 'node:selected)',
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
        concentric: node => node.id() === 'main' ? 1 : 0,
        levelWidth: nodes => 1,
        spacingFactor: 1.2
      }
    });

    cy.on('tap', 'node', function(evt) {
      const node = evt.target;
      if (node.id() !== 'main') {
        PostingOpenModal(node.id());
      }
    });

    return () => {
      cy.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="w-full h-[550px] border-[1px]">
      <div id="cy" ref={cyRef} className='w-full h-full'/>
      {statusModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal} nodeId={selectedNodeId}/>
      )}
    </div>
  );
}

export default FriendGraph;
