import { DEVICE_WIDTH } from './index.style'

let clicked = 1
let vibrateOn = false;

const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

function doVibrate() {
  logger.log('vibe click')
  // vibrate.stop()
  vibrate.scene = 28
  vibrate.start()
}

const buttonProps = {
  x: px(10),
  y: px(170),
  w: DEVICE_WIDTH/2,
  h: DEVICE_WIDTH/2,
}

Page({
  build() {
    const vibrateButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...buttonProps,
      press_color: 0xFFA493,
      normal_color: 0xFC6C51,
      text: clicked,
      radius: px(10),
      click_func: () => {
        clicked++
        this.pulseVibrate()
        return boof()
      },
    })

    function boof() {
      vibrateButton.setProperty(hmUI.prop.MORE, {
        ...buttonProps,
        text: clicked
      })

    }
  },
  pulseVibrate() {
    vibrate.stop()
    vibrate.scene = 25
    vibrate.start()
  },
  onInit() {
    logger.debug('page onInit invoked')
  },
  onDestroy() {
    vibrate && vibrate.stop()
  }
})
