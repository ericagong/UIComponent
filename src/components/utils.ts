const calculateLines = ($textareaEl: HTMLElement, value: string) => {
    if (!$textareaEl || !value) return 0

    const canvas = document.createElement('canvas')
    const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d')!
    const style = window.getComputedStyle($textareaEl)
    canvasContext.font = `${style.getPropertyValue(
        'font-size'
    )} ${style.getPropertyValue('font-family')}`

    const totalRows = value.split('\n').reduce((acc, curr) => {
        const elemWidth = $textareaEl.offsetWidth
        const totalWidth = canvasContext.measureText(curr).width
        const rows = Math.max(Math.ceil(totalWidth / elemWidth), 1)
        return acc + rows
    }, 0)

    return totalRows
}

const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
}

export { calculateLines, clamp }
