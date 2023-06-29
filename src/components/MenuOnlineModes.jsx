import React, { useState } from "react"
import { Link } from "react-router-dom"

import { HiOutlineArrowUturnLeft } from "react-icons/hi2"

import { socket } from "../socket"

import RoomModal from "./RoomModal"

import AnimatedPage from "./AnimatedPage"

function MenuOnlineModes({ isChallengeMode, setIsMultiplayer, nickname }) {
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [roomId, setRoomId] = useState("")

  function createRoom() {
    socket.emit("createRoom", socket.id, nickname, isChallengeMode)
    socket.on("roomCreated", (roomId) => {
      setRoomId(roomId)
      setIsMultiplayer(true)
    })

    setShowRoomModal(true)
  }

  return (
    <AnimatedPage>
      <div className="menu">
        <button
          className="menu__btn--online"
          style={{ opacity: "25%" }}
          onClick={() => console.log("random")}>
          QUICK START
        </button>
        <button className="menu__btn--offline" onClick={createRoom}>
          CREATE A ROOM
        </button>
        <Link to="/">
          <button className="menu__btn--back">
            <HiOutlineArrowUturnLeft />
          </button>
        </Link>

        {showRoomModal && (
          <RoomModal
            setShowRoomModal={setShowRoomModal}
            roomId={roomId}
            isChallengeMode={isChallengeMode}
          />
        )}
      </div>
    </AnimatedPage>
  )
}

export default MenuOnlineModes