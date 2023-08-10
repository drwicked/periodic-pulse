import { gettext } from 'i18n'
// import { Vibrator, VIBRATOR_SCENE_DURATION } from '@zos/sensor'
import { DEVICE_HEIGHT, DEVICE_WIDTH, TEXT_STYLE, RED } from './index.style'
// import { setStatusBarVisible } from '@zos/ui'

const circleRadius = DEVICE_WIDTH / 2;
const offset = 20;
const timerMaxWidth = DEVICE_WIDTH;
const playing = true
const totalSeconds = 30
const totalMs = 30000
let msRemaining = 30000
const tickTime = 50
let cycleCount = 0
let secondsElapsed = 0;
let elapsedDisplay = 0
const initEpoch = new Date().valueOf()
let currentEpoch = initEpoch

// const vibe = new Vibrator()

const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

const bgCircleStyle = {
  center_x: DEVICE_WIDTH / 2,
  center_y: DEVICE_HEIGHT / 2,
  color: 0xfc00ff,
  radius: px(circleRadius),
  alpha: 120,
}

const chiralCircleStyle = {
  center_x: 40,
  center_y: DEVICE_HEIGHT - px(50),
  color: 0x00ff00,
  radius: px(40),
  alpha: 120,
}

const rightChiralStyle = {
  ...chiralCircleStyle,
  center_x: DEVICE_WIDTH - chiralCircleStyle.radius,
  color: 0xfc2f00,
}
const leftChiralStyle = {
  ...chiralCircleStyle,
  center_x: 40,
  color: 0xa4d4b4,
}

function hhmmss(totalSeconds) {
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

function doVibrate() {
  logger.log('vibe click')
  // vibrate.motorenable = 1
  // vibrate.crowneffecton = 1
  // vibrate.scene = 3
  // vibrate.stop()
  vibrate.stop()
  vibrate.scene = 25
  vibrate.start()

}

Page({
  build() {
    const red = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...RED,
      click_func: () => doVibrate()
    })
  },
  onInit() {
    logger.debug('page onInit invoked')
  },
  onDestroy() {
    vibrate && vibrate.stop()
  }
})
