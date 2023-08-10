import { gettext } from 'i18n'
// import { Vibrator, VIBRATOR_SCENE_DURATION } from '@zos/sensor'
import { DEVICE_HEIGHT, DEVICE_WIDTH, TEXT_STYLE, RED } from './index.style'
// import { setStatusBarVisible } from '@zos/ui'

// const vibe = new Vibrator()

const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)

function doVibrate() {
  logger.log('vibe click')
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
