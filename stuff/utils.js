
export function hhmmss(totalSeconds) {
  const pad = (nuu) => nuu.toString().padStart(2, '0')
  const totalMinutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const mmss = `${pad(minutes)}:${pad(seconds)}`
  if (!!hours) {
    return `${pad(hours)}:${mmss}`
  }
  return mmss
}