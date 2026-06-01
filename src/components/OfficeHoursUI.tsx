'use client'

import { useEffect, useState } from 'react'

interface TimingItem {
  day: string
  time: string
  id?: string
}

interface DayHours {
  open: number
  close: number
  closed?: boolean
}

interface OfficeHoursCardProps {
  timings?: TimingItem[] // ✅ changed from string to array
  title?: string
  timezone?: string
  hours?: {
    Monday: DayHours
    Tuesday: DayHours
    Wednesday: DayHours
    Thursday: DayHours
    Friday: DayHours
    Saturday: DayHours
    Sunday: DayHours
  }
}

const DEFAULT_HOURS = {
  Monday: { open: 9, close: 20 },
  Tuesday: { open: 9, close: 20 },
  Wednesday: { open: 9, close: 20 },
  Thursday: { open: 8, close: 19 },
  Friday: { open: 9, close: 17 },
  Saturday: { open: 9, close: 17 },
  Sunday: { closed: true, open: 0, close: 0 },
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function OfficeHoursCard({ timings = [], title, timezone = 'America/Los_Angeles', hours = DEFAULT_HOURS }: OfficeHoursCardProps) {
  const [time, setTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [countdown, setCountdown] = useState('')
  const [hourDeg, setHourDeg] = useState(0)
  const [minuteDeg, setMinuteDeg] = useState(0)
  const [secondDeg, setSecondDeg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const parts = formatter.formatToParts(time)

    const partsObject = parts.reduce((acc: any, part) => {
      acc[part.type] = part.value
      return acc
    }, {})

    const tzYear = parseInt(partsObject.year)
    const tzMonth = parseInt(partsObject.month) - 1
    const tzDay = parseInt(partsObject.day)
    const currentHours = parseInt(partsObject.hour)
    const currentMinutes = parseInt(partsObject.minute)
    const currentSeconds = parseInt(partsObject.second)

    const dayIndex = new Date(tzYear, tzMonth, tzDay).getDay()
    const dayName = DAYS[dayIndex]

    const todayHours = hours[dayName as keyof typeof hours]

    setHourDeg((currentHours % 12) * 30 + currentMinutes * 0.5)
    setMinuteDeg(currentMinutes * 6 + currentSeconds * 0.1)
    setSecondDeg(currentSeconds * 6)

    const isClosed = todayHours.closed || false

    const open = isClosed ? false : currentHours >= todayHours.open && currentHours < todayHours.close

    setIsOpen(open)

    const currentTotalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds

    let targetTotalSeconds = 0
    let daysUntilTarget = 0

    if (open) {
      targetTotalSeconds = todayHours.close * 3600
    } else {
      const isTodayaClosed = todayHours.closed || false

      if (!isTodayaClosed && currentTotalSeconds < todayHours.open * 3600) {
        targetTotalSeconds = todayHours.open * 3600
        daysUntilTarget = 0
      } else {
        let searchDayIndex = dayIndex
        daysUntilTarget = 1

        while (true) {
          searchDayIndex = (searchDayIndex + 1) % 7

          const searchDayName = DAYS[searchDayIndex]
          const searchDayHours = hours[searchDayName as keyof typeof hours]

          if (!searchDayHours.closed) {
            targetTotalSeconds = searchDayHours.open * 3600
            break
          }

          daysUntilTarget++
        }
      }
    }

    const diff = daysUntilTarget * 24 * 3600 + (targetTotalSeconds - currentTotalSeconds)

    const h = Math.floor(diff / 3600)
    const m = Math.floor((diff % 3600) / 60)
    const s = Math.floor(diff % 60)

    setCountdown(`${h}h ${m}m ${s}s`)
  }, [time, timezone, hours])

  return (
    <div className="relative bg-secondary shadow rounded-xl">
      {/* GRID BG */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ANIMATED CLOCK WATERMARK */}
      <div className="absolute right-8 bottom-16 w-32 h-32 opacity-10">
        <div className="relative w-full h-full border border-white rounded-full">
          <div style={{ transform: `rotate(${hourDeg}deg)` }} className="absolute top-1/2 left-1/2 w-[3px] h-6 bg-white origin-bottom -translate-x-1/2 -translate-y-full rounded-full" />

          <div style={{ transform: `rotate(${minuteDeg}deg)` }} className="absolute top-1/2 left-1/2 w-[2px] h-10 bg-white origin-bottom -translate-x-1/2 -translate-y-full rounded-full" />

          <div style={{ transform: `rotate(${secondDeg}deg)` }} className="absolute top-1/2 left-1/2 w-[1px] h-12 bg-white/70 origin-bottom -translate-x-1/2 -translate-y-full rounded-full" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="tracking-wide">{title}</h3>

          <span className={`text-xs px-3 py-1 rounded-full font-medium ${isOpen ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{isOpen ? 'Open Now' : 'Closed'}</span>
        </div>

        {/* ✅ timings array render */}
        <div className="space-y-3 mb-10">
          {timings?.map((item) => (
            <div key={item.id} className=" pb-2 ">
              <div>{item.day}</div>
              <div>{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-10 w-full left-0 mt-20">
        <p className="text-sm mx-8 bg-primary/50 rounded-sm shadow flex justify-center p-2 text-white/80 mt-2">{isOpen ? `Closes in ${countdown}` : `Opens in ${countdown}`}</p>
      </div>
    </div>
  )
}
