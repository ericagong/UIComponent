import { useState } from 'react'

import Accordion from './Accordion'
import data from './data'

const UncontrolledSingleAccordion = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#1. 단일 열림 정책 아코디언 (Uncontrolled)</h3>
            <Accordion.Root defaultValue={items[0].id}>
                {items.map(item => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </>
    )
}

const ControlledSingleAccordion = () => {
    const [items] = useState(data)
    const [openId, setOpenId] = useState(items[0].id)

    return (
        <>
            <h3>#2. 단일 열림 정책 아코디언 (Controlled)</h3>
            <div>{`열린 Item ID(string | null): ${openId}`}</div>
            <Accordion.Root multiple={false} value={openId} onValueChange={setOpenId}>
                {items.map(item => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </>
    )
}

const UncontrolledMultipleAccordion = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#3. 다중 열림 정책 아코디언 (Uncontrolled)</h3>
            <Accordion.Root multiple defaultValue={[items[0].id]}>
                {items.map(item => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </>
    )
}

const ControlledMultipleAccordion = () => {
    const [items] = useState(data)
    const [openIds, setOpenIds] = useState([items[0].id])

    return (
        <>
            <h3>#4. 다중 열림 정책 아코디언 (Controlled)</h3>
            <div>{`열린 Item IDs: ${openIds?.join(', ')}`}</div>
            <Accordion.Root multiple value={openIds} onValueChange={setOpenIds}>
                {items.map(item => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Trigger>{item.title}</Accordion.Trigger>
                        <Accordion.Content>{item.content}</Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </>
    )
}

const Examples = () => {
    return (
        <>
            <UncontrolledSingleAccordion />
            <ControlledSingleAccordion />
            <UncontrolledMultipleAccordion />
            <ControlledMultipleAccordion />
        </>
    )
}

export default Examples
