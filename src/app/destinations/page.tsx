import React from 'react'

interface Destination {
  _id: string
  id: string
  imageUrl: string
  name: string
  country: string
  price: number
  duration: string
}

const DestinationsPage = async () => {
  let data: Destination[] = []
  let requestFailed = false

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/destinations`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Status ${res.status} from ${url}`)
    data = await res.json()
  } catch (err) {
    console.error('Destinations fetch failed:', err)
    requestFailed = true
  }

  if (requestFailed) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-lg text-black">Couldn&apos;t load destinations.</p>
        <p className="mt-2 text-sm text-gray-500">
          Make sure the API server is running, then reload the page.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((destination) => (
          <div key={destination._id} className="min-w-0">
            <div className="relative">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="h-36 w-full object-cover"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1 bg-white/90 px-2 py-1 text-xs">
                <span>4.5</span>
                <span className="text-black">★</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <span>♧</span>
              <span>{destination.country}</span>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-black">
                {destination.name}
              </h2>
              <p className="shrink-0 text-sm text-black">
                ${destination.price}
                <span className="text-[10px] text-gray-500">/Person</span>
              </p>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <span>▦</span>
              <span>{destination.duration}</span>
            </div>

            <a
              href={`/destinations/${destination._id}`}
              className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium text-sky-600 underline underline-offset-2 hover:text-sky-800"
            >
              BOOK NOW
              <span className="text-sm">↗</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestinationsPage