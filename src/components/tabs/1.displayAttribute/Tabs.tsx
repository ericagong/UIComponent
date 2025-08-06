import TabsContent from './TabsContent'
import TabsList from './TabsList'
import TabsRoot from './TabsRoot'
import TabsTrigger from './TabsTrigger'

// TODO 접근성 부분 별도의 context, provider, hook으로 분리
const Tabs = Object.assign(TabsRoot, {
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
})

export default Tabs
