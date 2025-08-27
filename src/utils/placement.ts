export type Direction = 'above' | 'below' | 'left' | 'right'
export type Alignment = 'start' | 'center' | 'end'
export type Placement = { direction: Direction; alignment: Alignment }

export type MiddlewareContext = {
    trigger: DOMRect
    content: DOMRect
    placement: Placement
    x: number
    y: number
}

export type Middleware = (context: MiddlewareContext) => MiddlewareContext

export type ContentStyle = {
    position: 'absolute'
    top: number
    left: number
}

const viewportRect = {
    top: 0,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth,
}

// 스크롤 보정 좌표
const getScrolledTop = (target: DOMRect) => window.scrollY + target.top
const getScrolledBottom = (target: DOMRect) => window.scrollY + target.bottom
const getScrolledLeft = (target: DOMRect) => window.scrollX + target.left
const getScrolledRight = (target: DOMRect) => window.scrollX + target.right

// Overflow 체크
const isOverflow = (direction: Direction, trigger: DOMRect, content: DOMRect): boolean => {
    switch (direction) {
        case 'above':
            return trigger.top - content.height < viewportRect.top
        case 'below':
            return trigger.bottom + content.height > viewportRect.bottom
        case 'left':
            return trigger.left - content.width < viewportRect.left
        case 'right':
            return trigger.right + content.width > viewportRect.right
        default:
            return false
    }
}

// Placement 계산
const placeAbove = (trigger: DOMRect, content: DOMRect) => getScrolledTop(trigger) - content.height

const placeBelow = (trigger: DOMRect) => getScrolledBottom(trigger)

const placeLeft = (trigger: DOMRect, content: DOMRect) => getScrolledLeft(trigger) - content.width

const placeRight = (trigger: DOMRect) => getScrolledRight(trigger)

// Alignment 계산
const alignStart = (trigger: DOMRect) => getScrolledLeft(trigger)

const alignCenter = (trigger: DOMRect, content: DOMRect) =>
    getScrolledLeft(trigger) + trigger.width / 2 - content.width / 2

const alignEnd = (trigger: DOMRect, content: DOMRect) => getScrolledRight(trigger) - content.width

const alignTop = (trigger: DOMRect) => getScrolledTop(trigger)

const alignMiddle = (trigger: DOMRect, content: DOMRect) =>
    getScrolledTop(trigger) + trigger.height / 2 - content.height / 2

const alignBottom = (trigger: DOMRect, content: DOMRect) =>
    getScrolledBottom(trigger) - content.height

// 1. 배치 방향 결정(flip or autoplacement)
// flip

export const flip = (): Middleware => context => {
    const { trigger, content, placement } = context
    let { direction } = placement

    if (direction === 'below' && isOverflow('below', trigger, content)) direction = 'above'
    else if (direction === 'above' && isOverflow('above', trigger, content)) direction = 'below'
    else if (direction === 'right' && isOverflow('right', trigger, content)) direction = 'left'
    else if (direction === 'left' && isOverflow('left', trigger, content)) direction = 'right'

    return { ...context, placement: { direction, alignment: placement.alignment } }
}

// autoPlacement

export const autoPlacement =
    (preferred: Placement): Middleware =>
    context => {
        const { trigger, content } = context
        let { direction } = preferred

        // fit 우선순위: below → above → right → left
        if (!isOverflow('below', trigger, content)) direction = 'below'
        else if (!isOverflow('above', trigger, content)) direction = 'above'
        else if (!isOverflow('right', trigger, content)) direction = 'right'
        else if (!isOverflow('left', trigger, content)) direction = 'left'

        return { ...context, placement: { direction, alignment: preferred.alignment } }
    }

// 2. 최종 위치 보정(x,y 좌표 계산 -> offset 다음 clamp)

// offset
export const applyOffset =
    (offset = 0): Middleware =>
    context => {
        const { trigger, content, placement } = context
        const { direction, alignment } = placement
        let { x, y } = context

        if (direction === 'above') {
            y = placeAbove(trigger, content) - offset
            if (alignment === 'start') x = alignStart(trigger)
            if (alignment === 'center') x = alignCenter(trigger, content)
            if (alignment === 'end') x = alignEnd(trigger, content)
        }

        if (direction === 'below') {
            y = placeBelow(trigger) + offset
            if (alignment === 'start') x = alignStart(trigger)
            if (alignment === 'center') x = alignCenter(trigger, content)
            if (alignment === 'end') x = alignEnd(trigger, content)
        }

        if (direction === 'left') {
            x = placeLeft(trigger, content) - offset
            if (alignment === 'start') y = alignTop(trigger)
            if (alignment === 'center') y = alignMiddle(trigger, content)
            if (alignment === 'end') y = alignBottom(trigger, content)
        }

        if (direction === 'right') {
            x = placeRight(trigger) + offset
            if (alignment === 'start') y = alignTop(trigger)
            if (alignment === 'center') y = alignMiddle(trigger, content)
            if (alignment === 'end') y = alignBottom(trigger, content)
        }

        return { ...context, x, y }
    }

// clamp (shift 보정)

export const clamp = (): Middleware => context => {
    let { x, y } = context
    const content = context.content

    const minX = window.scrollX
    const maxX = window.scrollX + window.innerWidth - content.width
    const minY = window.scrollY
    const maxY = window.scrollY + window.innerHeight - content.height

    x = Math.min(Math.max(x, minX), maxX)
    y = Math.min(Math.max(y, minY), maxY)

    return { ...context, x, y }
}

export function computePosition(
    $trigger: HTMLElement,
    $content: HTMLElement,
    { placement, middleware = [] }: { placement: Placement; middleware?: Middleware[] }
): ContentStyle {
    const trigger = $trigger.getBoundingClientRect()
    const content = $content.getBoundingClientRect()

    let context: MiddlewareContext = {
        trigger,
        content,
        placement,
        x: trigger.left,
        y: trigger.top,
    }

    for (const func of middleware) {
        context = func(context)
    }

    return { position: 'absolute', top: context.y, left: context.x }
}
