'use client'

import { useState, useEffect } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, PlayIcon, SkipForwardIcon } from 'lucide-react'
import Image from 'next/image'

interface Video {
  id: string
  title: string
  votes: number
  thumbnail: string
}

export default function SongVotingQueue() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [inputLink, setInputLink] = useState('')
  const [queue, setQueue] = useState<Video[]>([])

  useEffect(() => {
    const initializeQueue = async () => {
      const initialVideos = [
        { id: 'dQw4w9WgXcQ', title: '', votes: 5, thumbnail: '' },
        { id: 'L_jWHffIx5E', title: '', votes: 3, thumbnail: '' },
        { id: 'fJ9rUzIMcZQ', title: '', votes: 4, thumbnail: '' },
      ]

      const updatedVideos = await Promise.all(
        initialVideos.map(async (video) => {
          const details = await fetchVideoDetails(video.id)
          return { ...video, ...details }
        })
      )

      setQueue(updatedVideos)
    }

    initializeQueue()
  }, [])

  useEffect(() => {
    console.log('Current queue:', queue)
  }, [queue])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractVideoId(inputLink)
    if (videoId) {
      const details = await fetchVideoDetails(videoId)
      setQueue([...queue, { id: videoId, votes: 0, ...details }])
      setInputLink('')
    }
  }

  const handleVote = (id: string, increment: number) => {
    setQueue(queue.map(video => 
      video.id === id ? { ...video, votes: video.votes + increment } : video
    ).sort((a, b) => b.votes - a.votes))
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const fetchVideoDetails = async (videoId: string) => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        console.log('Fetched video details:', data.items[0].snippet)
        return {
          title: data.items[0].snippet.title,
          thumbnail: data.items[0].snippet.thumbnails.default.url
        }
      } else {
        console.error('No video details found for ID:', videoId)
        return { title: 'Unknown Title', thumbnail: '/placeholder.svg' }
      }
    } catch (error) {
      console.error('Error fetching video details:', error)
      return { title: 'Error fetching title', thumbnail: '/placeholder.svg' }
    }
  }

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0].id)
      setQueue(queue.slice(1))
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Song Voting Queue</h1>
        
        {/* Current Video Player */}
        <div className="aspect-video rounded-lg overflow-hidden">
          {currentVideo ? (
            <YouTubeEmbed 
              videoid={currentVideo} 
              height={400}
              params="autoplay=1"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-800 text-gray-300">
              No video playing
            </div>
          )}
        </div>

        {/* Play Next Button */}
        <div className="flex justify-center">
          <Button 
            onClick={playNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
          >
            <SkipForwardIcon className="h-5 w-5 mr-2" />
            Play Next
          </Button>
        </div>

        {/* Video Submission Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Paste YouTube video link"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
            className="flex-grow bg-gray-800 text-white border-gray-700 focus:border-purple-500"
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Add to Queue</Button>
        </form>

        {/* Video Preview */}
        {inputLink && extractVideoId(inputLink) && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Video Preview:</h2>
            <div className="rounded-lg overflow-hidden">
              <YouTubeEmbed 
                videoid={extractVideoId(inputLink)!} 
                height={200}
              />
            </div>
          </div>
        )}

        {/* Video Queue */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Upcoming Videos</h2>
          {queue.map((video) => (
            <Card key={video.id} className="bg-gray-800 border-gray-700">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title} 
                    width={120} 
                    height={90} 
                    className="rounded"
                  />
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleVote(video.id, 1)}
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <span className="font-bold text-lg text-purple-400">{video.votes}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleVote(video.id, -1)}
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-white">
                      {video.title || 'Untitled Video'}
                    </h3>
                    <p className="text-sm text-gray-400">ID: {video.id}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentVideo(video.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

