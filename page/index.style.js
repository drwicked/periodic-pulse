import { gettext } from "i18n"

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo()

export const TEXT_STYLE = {
  text: gettext('PPulse'),
  x: px(42),
  y: px(28),
  w: DEVICE_WIDTH - px(42) * 2,
  h: px(100),
  color: 0x777777,
  text_size: px(40),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
}

export const RED = {
    x: px(10),
    y: px(170),
    w: DEVICE_WIDTH/2,
    h: DEVICE_WIDTH/2,
    press_color: 0xFFA493,
    normal_color: 0xFC6C51,
    text: '',
    radius: px(10),
  }