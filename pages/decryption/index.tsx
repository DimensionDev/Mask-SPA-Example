import { DecryptError, DecryptErrorReasons } from '@masknet/encryption'
import type { TypedMessage } from '@masknet/typed-message'
import { useRouter, type NextRouter } from 'next/router.js'
import { useEffect, useState } from 'react'
import { decrypt, parsePayloadBinary, parsePayloadText } from './decrypt.js'
import { createTypedMessageRenderRegistry, RegistryContext, TypedMessageRender } from '@masknet/typed-message-react'

const registry = createTypedMessageRenderRegistry()
export default function Decryption() {
    const [error, isE2E, message] = useDecryption()
    if (isE2E) {
        return (
            <>This message is a end-to-end encrypted message. We does not have enough information to decrypt it here.</>
        )
    }
    if (error) {
        console.error(error)
        return <>We encountered an error when try to decrypt this message: {error.message}</>
    }
    if (!message) return <>Decrypting...</>
    return (
        <>
            Decrypted message:
            <RegistryContext.Provider value={registry.getTypedMessageRender}>
                <TypedMessageRender message={message} />
            </RegistryContext.Provider>
        </>
    )
}

function useDecryption() {
    const router = useRouter()
    const [message, setMessage] = useState<TypedMessage | null>(null)
    const [isE2E, setIsE2E] = useState<boolean>(false)
    const [error, setError] = useState<DecryptError | null>(null)
    useEffect(() => {
        main(router).then(
            (result) => {
                if (typeof result === 'boolean') return
                else if (result instanceof DecryptError) {
                    if (result.message === DecryptErrorReasons.PrivateKeyNotFound) setIsE2E(true)
                    else setError(result)
                } else setMessage(result)
            },
            // fatal error?
            () => router.push('/'),
        )
    }, [router, router.isReady, router.query])

    return [error, isE2E, message] as const
}

async function main(router: NextRouter): Promise<boolean | TypedMessage | DecryptError> {
    if (!router.isReady) return false
    const { version, data } = router.query
    if (typeof data !== 'string' || (version !== '1' && version !== '2')) return router.push('/')

    const payload = version === '1' ? await parsePayloadText(data) : await parsePayloadBinary(data)
    if (!payload) return router.push('/')

    if (payload.encryption.ok && payload.encryption.val.type === 'E2E')
        return new DecryptError(DecryptErrorReasons.PrivateKeyNotFound, undefined)

    return decrypt(data, payload)
}
