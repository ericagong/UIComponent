import { useTooltipContext } from '../context/TooltipContext'

const useTooltipHoverEvents = () => {
    const { requestOpenWithDelay, requestCloseWithDelay } = useTooltipContext()

    return {
        onMouseEnter: requestOpenWithDelay,
        onMouseLeave: requestCloseWithDelay,
    }
}

export default useTooltipHoverEvents
