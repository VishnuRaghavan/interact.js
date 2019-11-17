import { closest, getElementRect, parentNode } from './domUtils'
import extend from './extend'
import * as is from './is'

export function getStringOptionResult (value: any, target: Interact.HasGetRect, element) {
  if (value === 'parent') { return parentNode(element) }

  if (value === 'self') { return target.getRect(element) }

  return closest(element, value)
}

export function resolveRectLike<T extends any[]> (
  value: Interact.RectResolvable<T>,
  target?: Interact.HasGetRect,
  element?: Interact.Element,
  functionArgs?: T,
) {
  if (is.string(value)) {
    value = getStringOptionResult(value, target, element)
  }
  else if (is.func(value)) {
    value = value(...functionArgs)
  }

  if (is.element(value)) {
    value = getElementRect(value)
  }

  return value as Interact.Rect
}

export function rectToXY (rect) {
  return  rect && {
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
  }
}

export function xywhToTlbr (rect) {
  if (rect && !('left' in rect && 'top' in rect)) {
    rect = extend({}, rect)

    rect.left   = rect.x || 0
    rect.top    = rect.y || 0
    rect.right  = rect.right   || (rect.left + rect.width)
    rect.bottom = rect.bottom  || (rect.top + rect.height)
  }

  return rect
}

export function tlbrToXywh (rect) {
  if (rect && !('x' in rect && 'y' in rect)) {
    rect = extend({}, rect)

    rect.x      = rect.left || 0
    rect.y      = rect.top  || 0
    rect.width  = rect.width  || (rect.right  - rect.x)
    rect.height = rect.height || (rect.bottom - rect.y)
  }

  return rect
}