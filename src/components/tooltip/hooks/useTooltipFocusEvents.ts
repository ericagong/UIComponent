import { useTooltipContext } from '../context/TooltipContext'

const useTooltipFocusEvents = () => {
    const { requestOpen, requestClose } = useTooltipContext()

    return {
        onFocus: requestOpen,
        onBlur: requestClose,
    }
}

export default useTooltipFocusEvents
