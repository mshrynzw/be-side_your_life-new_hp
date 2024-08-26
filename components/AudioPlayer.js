import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faForward } from '@fortawesome/free-solid-svg-icons/faForward'

const AudioPlayer = ({ href }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlay = () => {
    audioRef.current?.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e) => {
    const newTime = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const skipTime = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate)
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])

  return (
    <div className="w-80 rounded-lg bg-white p-8 shadow-md">
      <audio ref={audioRef} src={href} preload="metadata" />
      <div className="flex items-center justify-center">
        {/* Prev Button */}
        <button
          className="flex items-center justify-self-center rounded-full bg-gray-200 p-3 hover:bg-gray-300 focus:outline-none"
          onClick={() => skipTime(-30)}
        >
          <FontAwesomeIcon icon={faBackward} className="h-4 w-4 text-gray-600" />
        </button>

        {isPlaying ? (
          // Pause Button
          <button
            className="mx-4 flex items-center justify-self-center rounded-full bg-gray-200 p-4 hover:bg-gray-300 focus:outline-none"
            onClick={handlePause}
          >
            <FontAwesomeIcon icon={faPause} className="h-6 w-6 text-gray-600" />
          </button>
        ) : (
          // Play Button
          <button
            className="mx-4 flex items-center justify-self-center rounded-full bg-gray-200 p-4 hover:bg-gray-300 focus:outline-none"
            onClick={handlePlay}
          >
            <FontAwesomeIcon icon={faPlay} className="h-6 w-6 text-gray-600" />
          </button>
        )}

        {/* Next Button*/}
        <button
          className="flex items-center justify-self-center rounded-full bg-gray-200 p-3 hover:bg-gray-300 focus:outline-none"
          onClick={() => skipTime(30)}
        >
          <FontAwesomeIcon icon={faForward} className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="my-6 h-2">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full"
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default AudioPlayer
