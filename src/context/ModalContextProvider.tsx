import {
    createContext,
    Dispatch,
    Fragment,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

type ModalState = Map<string, ReactNode>
type ModalDispatchState = Dispatch<SetStateAction<ModalState>>

const ModalContext = createContext<ModalState>(new Map())
const ModalDispatchContext = createContext<ModalDispatchState>(() => {})

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalState>(new Map())

    useEffect(() => {
        const hasModals = modals.size > 0
        const toggleScrollBar = () => document.body.classList.toggle('no-scroll', hasModals)
        toggleScrollBar()
    }, [modals])

    return (
        <ModalContext.Provider value={modals}>
            <ModalDispatchContext.Provider value={setModals}>
                {children}
                <div id="modals-root">
                    {Array.from(modals.values()).map((modal, index) => (
                        <Fragment key={index}>{modal}</Fragment>
                    ))}
                </div>
            </ModalDispatchContext.Provider>
        </ModalContext.Provider>
    )
}

const useModals = () => useContext(ModalContext)
const useSetModals = () => {
    const setModals = useContext(ModalDispatchContext)

    const openModal = useCallback(
        (id: string, modal: ReactNode) => {
            setModals(prevModals => new Map(prevModals).set(id, modal))
        },
        [setModals]
    )

    const closeModal = useCallback(
        (id: string) => {
            setModals(prevModals => {
                const nextModals = new Map(prevModals)
                nextModals.delete(id)
                return nextModals
            })
        },
        [setModals]
    )

    return { openModal, closeModal }
}

export default ModalContextProvider
export { useModals, useSetModals }
