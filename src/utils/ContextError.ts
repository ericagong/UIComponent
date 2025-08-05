class ContextError extends Error {
    constructor(hookName: string, providerName: string) {
        super(`${hookName}는 ${providerName} 내부에서만 사용할 수 있습니다.`)
        this.name = 'ContextError'

        this.hookName = hookName
        this.providerName = providerName
    }

    hookName: string
    providerName: string
}

const throwContextError = (hookName: string, providerName: string) => {
    throw new ContextError(hookName, providerName)
}

export { throwContextError }
export default ContextError
