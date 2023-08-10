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

const colorGradient = [
  '0x541ea6',
  '0x5b1ca5',
  '0x621ba4',
  '0x6919a4',
  '0x6f17a3',
  '0x7515a2',
  '0x7b13a1',
  '0x8011a0',
  '0x850f9f',
  '0x8a0c9e',
  '0x8f099d',
  '0x94079b',
  '0x99049a',
  '0x9d0299',
  '0xa10198',
  '0xa60096',
  '0xaa0095',
  '0xae0094',
  '0xb20093',
  '0xb50091',
  '0xb90090',
  '0xbd008e',
  '0xc0008d',
  '0xc4028c',
  '0xc7058a',
  '0xca0989',
  '0xcd0c87',
  '0xd01086',
  '0xd31484',
  '0xd61783',
]

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
  state: {
    tickCount: 0,
  },
  build() {
    const timerDisplay = hmUI.createWidget(hmUI.widget.TEXT, {
      ...TEXT_STYLE,
    })
    const arcProps = {
      x: 10,
      y: px(((DEVICE_HEIGHT / 2) - circleRadius) + 10), // idk
      w: (circleRadius * 2) - px(offset),
      h: (circleRadius * 2) - px(offset),
      start_angle: -95,
      end_angle: 0,
      color: 0xffffff,
      line_width: 30,
    }
    // racetrack is under the bgCircle bc we can't apply alpha to arc
    const arcBg = hmUI.createWidget(hmUI.widget.ARC, {
      ...arcProps,
      start_angle: -95,
      end_angle: 300,
      // x: px(offset),
    })
    const countDisplay = hmUI.createWidget(hmUI.widget.TEXT, {
      text: gettext(this.state.tickCount),
      x: px(42),
      y: DEVICE_HEIGHT / 2 - px(68),
      w: DEVICE_WIDTH - px(42) * 2,
      h: px(120),
      color: 0xffffff,
      text_size: px(82),
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP,
    })
    const bgCircle = hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...bgCircleStyle,
    })
    const sharedTextProps = {
      x: px(16),
      y: DEVICE_HEIGHT - px(85),
      w: px(44),
      h: px(100),
      text_size: px(44),
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP,
    }
    // const group = hwUI.createWidget(hmUI.widget.GROUP, {
    //   x: px(0),
    //   y: DEVICE_HEIGHT - px(70),
    //   w: px(32) * 2,
    //   h: px(100),
    // })
    const chiralCircleLeft = hmUI.createWidget(hmUI.widget.CIRCLE, leftChiralStyle)
    const leftText = hmUI.createWidget(hmUI.widget.TEXT, {
      ...sharedTextProps,
      text: gettext('L'),
      x: px(16),
      color: 0xffffff,
    })
    const chiralCircleRight = hmUI.createWidget(hmUI.widget.CIRCLE, rightChiralStyle)
    const rightText = hmUI.createWidget(hmUI.widget.TEXT, {
      ...sharedTextProps,
      text: gettext('R'),
      x: DEVICE_WIDTH - px(16 + sharedTextProps.w),
      color: 0xffffff,
    })

    const arc = hmUI.createWidget(hmUI.widget.ARC, {
      // x: px(offset),
      x: 10,
      y: px(((DEVICE_HEIGHT / 2) - circleRadius) + 10), // idk
      w: (circleRadius * 2) - px(offset),
      h: (circleRadius * 2) - px(offset),
      start_angle: -95,
      end_angle: 0,
      color: 0xffffff,
      line_width: 30,
    })
    const red = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...RED,
      click_func: () => {doVibrate()}
    })
    timer_w = timerMaxWidth
    const playInterval = timer.createTimer(
      0,
      tickTime,
      function (option) {
      //callback
        const isLeft = cycleCount % 2 === 0
        if (playing) {
          timer_w = timer_w - 1
          msRemaining = msRemaining - tickTime
          currentEpoch = currentEpoch + tickTime
          const epochDiff = currentEpoch - initEpoch
          secondsElapsed = Math.floor(epochDiff / 1000)
          elapsedDisplay = hhmmss(secondsElapsed)
        }
        if (msRemaining <= 0) {
          timer_w = timerMaxWidth
          msRemaining = totalMs
          cycleCount++
          // buttonEvent(-1)
          // vibe.setMode(VIBRATOR_SCENE_DURATION)
          // vibe.start()
        }
        if (isLeft) {
          leftText.setProperty(hmUI.prop.MORE, {
            text: 'L',
          })
          chiralCircleLeft.setProperty(hmUI.prop.MORE, leftChiralStyle)
          rightText.setProperty(hmUI.prop.MORE, {
            text: '',
          })
          chiralCircleRight.setProperty(hmUI.prop.MORE, {
            ...rightChiralStyle,
            alpha: 0,
          })
        } else {
          leftText.setProperty(hmUI.prop.MORE, {
            text: '',
          })
          chiralCircleLeft.setProperty(hmUI.prop.MORE, {
            ...leftChiralStyle,
            alpha: 0,
          })
          rightText.setProperty(hmUI.prop.MORE, {
            text: 'R',
          })
          chiralCircleRight.setProperty(hmUI.prop.MORE, rightChiralStyle)

        }
        const currentMs = Math.max(totalMs - msRemaining, 0)
        const calculatedEndAngle = Math.floor(360 * (currentMs / totalMs));
        const calculatedEndAngle360 = (Math.floor(330 * (currentMs / totalMs)) - 90) + 30;
        const percentageDecimal = currentMs / totalMs
        const percentage = Math.ceil(percentageDecimal * 100)
        const colorIdx = Math.floor(percentageDecimal * colorGradient.length)
        const responsiveColor = colorGradient[colorIdx]
        const inverseResponsiveColor = [...colorGradient].reverse()[colorIdx]
        arc.setProperty(hmUI.prop.MORE, {
          // end_angle: Math.max(calculatedEndAngle360, -70), // if angle is too small looks jank
          end_angle: calculatedEndAngle360,
          // uncomment to color arc
          // color: inverseResponsiveColor
        })
        bgCircle.setProperty(hmUI.prop.MORE, {
          ...bgCircleStyle,
          color: parseInt(responsiveColor, 16),
        })
        // time_bar.setProperty(hmUI.prop.MORE, {
        //   x: (DEVICE_WIDTH - timer_w)/2,
        //   y: DEVICE_HEIGHT - 45,
        //   w: timer_w,
        //   h: 15,
        //   color: 0xFFFFFF,
        //   radius: 5,
        // })
        countDisplay.setProperty(hmUI.prop.MORE, {
          text: (colorIdx + 1),
        })
        timerDisplay.setProperty(hmUI.prop.MORE, {
          text: elapsedDisplay,
        })
      },
      { hour: 0, minute: 15, second: 30 }
    )


    // setInterval(() => {
    //   console.log(tick, this.state.tickCount)
    //   // this.timerTick()
    //   this.state.tickCount = this.state.tickCount + 1;
    //   countDisplay.setProperty(hmUI.prop.MORE, {
    //     text: this.state.tickCount,
    //   })
    // }, 1000);
    pauseDropWristScreenOff({ duration: 120000 })
  },
  onInit() {
    logger.debug('page onInit invoked')
    setStatusBarVisible(false)
  },
  timerTick() {
    this.state.tickCount = this.state.tickCount + 1;
  },
  onDestroy() {
    try {
      timer.stopTimer(playInterval)
    } catch {}
    vibrate && vibrate.stop()
  }
})
