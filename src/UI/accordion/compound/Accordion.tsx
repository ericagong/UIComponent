import AccordionContent from '../headless/AccordionContent'
import AccordionItem from '../headless/AccordionItem'
import AccordionRoot from '../headless/AccordionRoot'
import AccordionTrigger from '../headless/AccordionTrigger'
import cx from './cx'
import type { StyleProps } from './types'

type StyledAccordionRootProps = StyleProps & React.ComponentProps<typeof AccordionRoot>

type StyledAccordionItemProps = StyleProps & React.ComponentProps<typeof AccordionItem>

type StyledAccordionTriggerProps = StyleProps & React.ComponentProps<typeof AccordionTrigger>

type StyledAccordionContentProps = StyleProps & React.ComponentProps<typeof AccordionContent>

const StyledAccordionRoot = ({ className, style, ...props }: StyledAccordionRootProps) => {
    return (
        <div className={cx('root', className)} style={style}>
            <AccordionRoot {...props} />
        </div>
    )
}

const StyledAccordionItem = ({ className, style, ...props }: StyledAccordionItemProps) => {
    return (
        <div className={cx('item', className)} style={style}>
            <AccordionItem {...props} />
        </div>
    )
}
const StyledAccordionTrigger = ({ className, style, ...props }: StyledAccordionTriggerProps) => {
    return <AccordionTrigger {...props} className={cx('trigger', className)} style={style} />
}

const StyledAccordionContent = ({ className, style, ...props }: StyledAccordionContentProps) => {
    return <AccordionContent {...props} className={cx('content', className)} style={style} />
}

const Accordion = {
    Root: StyledAccordionRoot,
    Item: StyledAccordionItem,
    Trigger: StyledAccordionTrigger,
    Content: StyledAccordionContent,
}

export default Accordion
