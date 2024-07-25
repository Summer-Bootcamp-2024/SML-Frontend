import Sidebar from '../components/Sidebar'
import Chat from '../components/chat/Chat'
import ChatRoom from '../components/chat/ChatRoom'
import axios from 'axios'
import { useApiUrlStore, useUserIdStore } from '../store/store'
import { useEffect, useState } from 'react'
import GiftCreditModal from '../components/modal/GiftCreditModal'
import FriendRequestModal from '../components/modal/FriendRequestModal'
import IntroduceFriendModal from '../components/modal/IntroduceFriendModal'


function ChatPage() {
  const { apiUrl } = useApiUrlStore()
  const { user_id } = useUserIdStore()
  const [roomData, setRoomData] = useState([])
  const [selectRoom, setSelectRoom] = useState([])
  const [giftCreditModalOpen, setGiftCreditModalOpen] = useState(false)
  const [friendRequestModalOpen, setFriendRequestModalOpen] = useState(false)
  const [introduceFriendModalOpen, setIntroduceFriendModalOpen] = useState(false)
  const [friendId, setFriendId] = useState(null)
  const [targetUserId, setTargetUserId] = useState(null)

  //채팅방 조회
  const getChatRoom = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chatrooms/${user_id}`, {
        withCredentials: true,
      })
      if (response.data.length > 0) {
        const userDetailsArray = response.data.map((item) => {
          let room_user_id = 0
          let me = 0
          let name = null
          let other = null
          let user_img = null
          let other_img = null

          if (user_id === item.user1_id) {
            room_user_id = item.user2_id
            me = item.user1_id
            name = item.user1_name
            other = item.user2_name
            user_img = item.user1_image_url
            other_img = item.user2_image_url
          } else {
            room_user_id = item.user1_id
            me = item.user2_id
            name = item.user2_name
            other = item.user1_name
            user_img = item.user2_image_url
            other_img = item.user1_image_url
          }
          return {
            room_id: item.id,
            user_id: me,
            other_id: room_user_id,
            user_name: name,
            other_name: other,
            user_img : user_img,
            other_img: other_img, // 변수 수정
          }
        })

        setRoomData(userDetailsArray)
      } else {
        console.log('채팅방이 없습니다')
      }
    } catch (error) {
      console.error('Error fetching friend data:', error)
    }
  }

  const handleChatRoomClick = (roomId) => {
    const selected = roomData.find((room) => room.room_id === roomId)
    setSelectRoom(selected)

    if (selected) {
      setFriendId(selected)
      setTargetUserId(selected.other_id)
    }
  }

  useEffect(() => {
    getChatRoom()
  }, [])

  const handleOpenGiftCreditModal = () => {
    setGiftCreditModalOpen(true)
  }

  const handleCloseGiftCreditModal = () => {
    setGiftCreditModalOpen(false)
  }

  const handleFriendRequestOpentModal = () => {
    setFriendRequestModalOpen(true)
  }

  const handleFriendRequestCloseModal = () => {
    setFriendRequestModalOpen(false)
  }
  
  const handleIntroduceFriendOpentModal = () => {
    setIntroduceFriendModalOpen(true)
  }

  const handleIntroduceFriendClosetModal = () => {
    setIntroduceFriendModalOpen(false)
  }


  return (
    <div className="flex w-full h-[100vh]">
      <Sidebar />
      <div className="ml-[296px] flex justify-center w-[calc(100vw-296px)] h-screen">
        <ChatRoom
          className="w-[40%]"
          roomListData={roomData}
          onChatRoomClick={handleChatRoomClick}
        />
        <Chat
          className="w-[60%]"
          selectedRoom={selectRoom}
          getChatRoom={getChatRoom}
          onOpenGiftCreditModal={handleOpenGiftCreditModal}
          onOpenFriendRequesttModal={handleFriendRequestOpentModal}
          onOpenIntroduceFriendModal={handleIntroduceFriendOpentModal}
        />
        {giftCreditModalOpen && (
          <GiftCreditModal
            onClose={handleCloseGiftCreditModal}
            friendId={friendId}
            targetUserId={targetUserId}
          />
        )}
        {friendRequestModalOpen && (
          <FriendRequestModal 
          onClose={handleFriendRequestCloseModal}
          friendName={selectRoom.other_name} />
        )}
        {introduceFriendModalOpen && (
          <IntroduceFriendModal 
          onClose={handleIntroduceFriendClosetModal}
          friendName={selectRoom.other_name}
          friendId={selectRoom.other_id}/>
        )}
      </div>
    </div>
  )
}

export default ChatPage
