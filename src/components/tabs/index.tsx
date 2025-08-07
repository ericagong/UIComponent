import { useState } from 'react'

import data from './data'
import Tabs from './Tabs'

// TODO 완전한 Headless UI로 확장: asChild
// TODO Controlled로 확장
const Example = () => {
    const [items] = useState(data)

    return (
        <>
            <h3>#1. Button 기반 Tabs </h3>
            <Tabs defaultOpenIndex={0}>
                <Tabs.List>
                    {items.map((d, index) => (
                        <Tabs.Trigger key={d.id} index={index}>
                            {d.title}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                {items.map((d, index) => (
                    <Tabs.Content key={d.id} index={index}>
                        {d.content}
                    </Tabs.Content>
                ))}
            </Tabs>
        </>
    )
}

export default Example
