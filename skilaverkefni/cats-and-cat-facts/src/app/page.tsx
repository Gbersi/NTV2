'use client'

import React, { useState, useEffect } from 'react'

async function fetchCatImages(): Promise<string[]> {
  const res = await fetch(
    'https://api.thecatapi.com/v1/images/search?limit=9',
    {
      headers: { 'x-api-key': 'ylX4blBYT9FaoVd6OhvR' },
    }
  )
  const data = await res.json()
  return data.slice(0, 9).map((item: any) => item.url)
}

async function fetchCatFact(): Promise<string> {
  const res = await fetch('https://catfact.ninja/fact')
  const { fact } = await res.json()
  return fact
}

export default function HomePage() {
  const [images, setImages] = useState<string[]>([])
  const [loadingImages, setLoadingImages] = useState<boolean>(true)
  const [facts, setFacts] = useState<(string | null)[]>(Array(9).fill(null))
  const [loadingFacts, setLoadingFacts] = useState<boolean[]>(Array(9).fill(false))

  const loadImages = async () => {
    setLoadingImages(true)
    const urls = await fetchCatImages()
    setImages(urls)
    setFacts(Array(9).fill(null))
    setLoadingFacts(Array(9).fill(false))
    setLoadingImages(false)
  }

  useEffect(() => {
    loadImages()
  }, [])

  const handleImageClick = async (index: number) => {
    if (loadingFacts[index]) return

  
    if (facts[index]) {
      setFacts(prev => {
        const arr = [...prev]
        arr[index] = null
        return arr
      })
      return
    }

    
    setLoadingFacts(prev => {
      const arr = [...prev]
      arr[index] = true
      return arr
    })
    const fact = await fetchCatFact()
    setFacts(prev => {
      const arr = [...prev]
      arr[index] = fact
      return arr
    })
    setLoadingFacts(prev => {
      const arr = [...prev]
      arr[index] = false
      return arr
    })
  }

  return (
    <div className="appContainer">
      {loadingImages ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {images.map((url, i) => (
            <div className="imageWrapper" key={i}>
              <img
                src={url}
                alt={`Cat ${i + 1}`}
                className="catImage"
                onClick={() => handleImageClick(i)}
              />
              {(loadingFacts[i] || facts[i]) && (
                <div
                  className="overlay"
                  onClick={() => handleImageClick(i)}  
                >
                  {loadingFacts[i] ? 'Loading...' : facts[i]}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="reloadButton" onClick={loadImages}>
        Fetch New Cats
      </button>
    </div>
  )
}
