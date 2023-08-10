import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  TIMER_TEXT,
  BG_CIRCLE_STYLE,
  CHIRAL_CIRCLE_STYLE,
  COLOR_GRADIENT_ARRAY,
  ARC_BG,
  LEFT_CHIRAL_STYLE,
  RIGHT_CHIRAL_STYLE,
  CHIRAL_TEXT_PROPS,
  OFFSET,
  CIRCLE_RADIUS,
} from './index.style'
import { hhmmss } from './utils';

const setText = (widget, text) => widget.setProperty(hmUI.prop.MORE, { text })

const playing = true
const totalMs = 30000
let msRemaining = 30000
const tickTime = 50
let cycleCount = 0
let secondsElapsed = 0;
let elapsedDisplay = 0
const initEpoch = new Date().valueOf()
let currentEpoch = initEpoch
let playInterval

const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

Page({
  build() {
    console.log('build invoked')
    const timerDisplay = hmUI.createWidget(hmUI.widget.TEXT, TIMER_TEXT)
    // ARC_BG is under the bgCircle bc we can't apply alpha to arc
    hmUI.createWidget(hmUI.widget.ARC, ARC_BG)
    const countDisplay = hmUI.createWidget(hmUI.widget.TEXT, {
      text: 0,
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
      ...BG_CIRCLE_STYLE,
    })
    const chiralCircleLeft = hmUI.createWidget(hmUI.widget.CIRCLE, LEFT_CHIRAL_STYLE)
    const leftText = hmUI.createWidget(hmUI.widget.TEXT, {
      ...CHIRAL_TEXT_PROPS,
      text: 'L',
      x: px(16),
      color: 0xffffff,
    })
    // hide R chiral initially
    const chiralCircleRight = hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...RIGHT_CHIRAL_STYLE,
      alpha: 0,
    })
    const rightText = hmUI.createWidget(hmUI.widget.TEXT, {
      ...CHIRAL_TEXT_PROPS,
      text: 'R',
      x: DEVICE_WIDTH - px(16 + CHIRAL_TEXT_PROPS.w),
      color: 0xffffff,
    })

    const arc = hmUI.createWidget(hmUI.widget.ARC, {
      x: 10,
      y: px(((DEVICE_HEIGHT / 2) - CIRCLE_RADIUS) + 10), // idk
      w: (CIRCLE_RADIUS * 2) - px(OFFSET),
      h: (CIRCLE_RADIUS * 2) - px(OFFSET),
      start_angle: -95,
      end_angle: 0,
      color: 0xffffff,
      line_width: 30,
    })
    playInterval = timer.createTimer(
      0,
      tickTime,
      function (option) {
        const isLeft = cycleCount % 2 === 0
        if (playing) {
          msRemaining = msRemaining - tickTime
          currentEpoch = currentEpoch + tickTime
          const epochDiff = currentEpoch - initEpoch
          secondsElapsed = Math.floor(epochDiff / 1000)
          elapsedDisplay = hhmmss(secondsElapsed)
        }
        if (msRemaining <= 0) {
          msRemaining = totalMs
          cycleCount++
          option.triggerVibrate()
        }
        if (isLeft) {
          setText(leftText, 'L');
          chiralCircleLeft.setProperty(hmUI.prop.MORE, LEFT_CHIRAL_STYLE)
          setText(rightText, '')
          chiralCircleRight.setProperty(hmUI.prop.MORE, {
            ...RIGHT_CHIRAL_STYLE,
            alpha: 0,
          })
        } else {
          setText(leftText, '');
          chiralCircleLeft.setProperty(hmUI.prop.MORE, {
            ...LEFT_CHIRAL_STYLE,
            alpha: 0,
          })
          setText(rightText, 'R')
          chiralCircleRight.setProperty(hmUI.prop.MORE, RIGHT_CHIRAL_STYLE)

        }
        const currentMs = Math.max(totalMs - msRemaining, 0)
        const calculatedEndAngle360 = (Math.floor(330 * (currentMs / totalMs)) - 90) + 30;
        const percentageDecimal = currentMs / totalMs
        const colorIdx = Math.floor(percentageDecimal * COLOR_GRADIENT_ARRAY.length)
        const responsiveColor = COLOR_GRADIENT_ARRAY[colorIdx]
        // const inverseResponsiveColor = [...COLOR_GRADIENT_ARRAY].reverse()[colorIdx]
        arc.setProperty(hmUI.prop.MORE, {
          end_angle: calculatedEndAngle360,
          // uncomment to color arc
          // color: inverseResponsiveColor
        })
        bgCircle.setProperty(hmUI.prop.MORE, {
          ...BG_CIRCLE_STYLE,
          color: parseInt(responsiveColor, 16),
        })
        setText(timerDisplay, elapsedDisplay)
        setText(countDisplay, colorIdx)
      },
      { hour: 0, minute: 15, second: 30, triggerVibrate: this.pulseVibrate }
    )

    hmUI.setStatusBarVisible(false)
    hmSetting.setBrightScreen(2000)
    // hmSetting.pauseDropWristScreenOff({ duration: 120000 })
  },
  pulseVibrate() {
    vibrate.stop()
    vibrate.scene = 24
    vibrate.start()
  },
  onInit() {
    console.log('page onInit invoked')
  },
  onDestroy() {
    try {
      timer && timer.stopTimer(playInterval)
    } catch {
      console.error('timer err')
    }
    vibrate && vibrate.stop()
  }
})
