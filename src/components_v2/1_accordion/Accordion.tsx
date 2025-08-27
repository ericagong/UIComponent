import AccordionContent from './AccordionContent'
import AccordionItem from './AccordionItem'
import AccordionRoot from './AccordionRoot'
import AccordionTrigger from './AccordionTrigger'

const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
})

export default Accordion
