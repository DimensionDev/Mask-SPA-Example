import { DecryptError } from '@masknet/encryption'
import type { TypedMessage } from '@masknet/typed-message'
import { useRouter } from 'next/router.js'
import { useEffect, useState } from 'react'
import { decrypt, parsePayloadBinary, parsePayloadText } from './decrypt.js'

export default function Decryption() {
    const message = useDecryption()
    return <>TypedMessage: {JSON.stringify(message)}</>
}

function useDecryption() {
    const router = useRouter()
    const [message, setMessage] = useState<TypedMessage | null>(null)
    useEffect(() => {
        if (!router.isReady) return
        const { version, data } = router.query
        // TODO: if payload is invalid, jump back to home page
        if (typeof data !== 'string') return
        if (version !== '1' && version !== '2') return
        const payload = version === '1' ? parsePayloadText(data) : parsePayloadBinary(data)
        payload
            .then((payload) => {
                if (!payload) return
                return decrypt(data, payload)
            })
            .then((result) => {
                if (!result) return
                if (result instanceof DecryptError) {
                    // TODO: display error or E2E
                } else setMessage(result)
            })
    }, [router.isReady, router.query])

    return message
}
