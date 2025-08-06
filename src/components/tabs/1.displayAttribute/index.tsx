import data from '../data'
import Tabs from './Tabs'

const Example = () => {
    return (
        <>
            <h3>#1. button 기반 탭 + 접근성 최적화</h3>
            <Tabs defaultOpenIndex={0}>
                <Tabs.List>
                    {data.map((d, index) => (
                        <Tabs.Trigger key={d.id} index={index}>
                            {d.title}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                {data.map((d, index) => (
                    <Tabs.Content key={d.id} index={index}>
                        {d.content}
                    </Tabs.Content>
                ))}
            </Tabs>
        </>
    )
}

export default Example
