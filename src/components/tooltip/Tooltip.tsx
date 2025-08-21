import TooltipContent from './TooltipContent'
import TooltipRoot from './TooltipRoot'
import TooltipTrigger from './TooltipTrigger'

const Tooltip = Object.assign(TooltipRoot, {
    Trigger: TooltipTrigger,
    Content: TooltipContent,
})

export default Tooltip
