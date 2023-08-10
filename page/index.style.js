import { gettext } from "i18n"

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo()

export const CIRCLE_RADIUS = DEVICE_WIDTH / 2;
export const OFFSET = 20

export const TIMER_TEXT = {
  text: '',
  x: px(24),
  y: px(8),
  w: DEVICE_WIDTH - px(24) * 2,
  h: px(100),
  color: 0x777777,
  text_size: px(56),
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

export const BG_CIRCLE_STYLE = {
  center_x: DEVICE_WIDTH / 2,
  center_y: DEVICE_HEIGHT / 2,
  color: 0xfc00ff,
  radius: px(CIRCLE_RADIUS),
  alpha: 120,
}


export const COLOR_GRADIENT_ARRAY = [
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

// ARC
export const ARC_PROPS = {
  x: 10,
  y: px(((DEVICE_HEIGHT / 2) - CIRCLE_RADIUS) + 10), // idk
  w: (CIRCLE_RADIUS * 2) - px(OFFSET),
  h: (CIRCLE_RADIUS * 2) - px(OFFSET),
  start_angle: -95,
  end_angle: 0,
  color: 0xffffff,
  line_width: 30,
}

export const ARC_BG = {
  ...ARC_PROPS,
  start_angle: -95,
  end_angle: 300,
}

// CHIRALS
export const CHIRAL_CIRCLE_STYLE = {
  center_x: 40,
  center_y: DEVICE_HEIGHT - px(50),
  color: 0x00ff00,
  radius: px(40),
  alpha: 120,
}

export const LEFT_CHIRAL_STYLE = {
  ...CHIRAL_CIRCLE_STYLE,
  center_x: 40,
  color: 0xa4d4b4,
}
export const RIGHT_CHIRAL_STYLE = {
  ...CHIRAL_CIRCLE_STYLE,
  center_x: DEVICE_WIDTH - CHIRAL_CIRCLE_STYLE.radius,
  color: 0xfc2f00,
}

export const CHIRAL_TEXT_PROPS = {
  x: px(16),
  y: DEVICE_HEIGHT - px(85),
  w: px(44),
  h: px(100),
  text_size: px(44),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
}