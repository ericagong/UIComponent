import AccordionContent from './AccordionContent'
import AccordionItem from './AccordionItem'
import AccordionRoot from './AccordionRoot'
import AccordionTrigger from './AccordionTrigger'

// TODO controlled 방식으로 변경
// TODO multiple 속성 추가
const Accordion = Object.assign(AccordionRoot, {
    Item: AccordionItem,
    Trigger: AccordionTrigger,
    Content: AccordionContent,
})

export default Accordion
