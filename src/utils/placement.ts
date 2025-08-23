type PlacementStyle = {
    position: 'absolute'
    top: number
    left: number
}

const isVerticallyOutOfViewport = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.bottom + contentRect.height > window.innerHeight

const isHorizontallyOutOfViewport = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.left + contentRect.width > window.innerWidth

const placeBelow = (triggerRect: DOMRect) => triggerRect.bottom + window.scrollY
const placeAbove = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.top - contentRect.height + window.scrollY
const alignLeft = (triggerRect: DOMRect) => triggerRect.left + window.scrollX
const alignRight = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.right - contentRect.width + window.scrollX

// const flipPlacement = (triggerRect: DOMRect, contentRect: DOMRect): PlacementStyle => {
//     const top = !isVerticallyOutOfViewport(triggerRect, contentRect)
//         ? placeBelow(triggerRect)
//         : placeAbove(triggerRect, contentRect)

//     const left = !isHorizontallyOutOfViewport(triggerRect, contentRect)
//         ? alignLeft(triggerRect)
//         : alignRight(triggerRect, contentRect)

//     return { position: 'absolute', top, left }
// }

export {
    alignLeft,
    alignRight,
    isHorizontallyOutOfViewport,
    isVerticallyOutOfViewport,
    placeAbove,
    placeBelow,
}
export type { PlacementStyle }
