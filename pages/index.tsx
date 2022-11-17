import Head from 'next/head.js'
import { useEffect } from 'react'
import { useRouter } from 'next/router.js'
import Link from 'next/link.js'

export default function Home() {
    useJumpToDecryption()
    return (
        <div>
            <Head.default>
                <title>Mask.io</title>
                <link rel="icon" href="/favicon.ico" />
            </Head.default>

            <main>Mask.io</main>
            <Link.default href="/?PostData_v1=%204/4.0e6cerJUeGR9mJl3/kHJA7qbbVebTIpGweiOmLROAHmT0qd4/gy35N7vu9W7kEjegJYjkCI2ASNAaL57QEE0nKLG4knBK32WoayV/BPqYcb-F9hXiJSYFZsEVbUEBt8ALqJo9Xfpa0dM/ggyyUWhGjTENKzv1ll3dZvWjxYUKp5orLrq7OUceaPm.I5//o7fgXmimLD/Uul4LkA_=.f3X2TF9+6ENaebbZeHdKhEg1NE1zI7wZvC795jQ+jBT/Si5EhOS0ICSUdQySunQVQ2upnl1s/vfQ1IZNCscipnckGcIsBVAcXfK9FQgKzgPNrfzKqDgq/3miQt3Twg2699Hzzwfq+2O+yWNrPxfjYA+DDf6jijeHE7h/+QUGEkeODpqBeXTIQGh2F80VjADjK/u67REUKJQtoMVzMALR5Jr0kamoBuC6YLecV6jhvF2/LLE4Gm+SQDUwwWgg+y4DNQpNZBbuebqUqOctjFibxFopV8nnm07nimLiTZX4uhdp6g0Z6H/eYi8BkQQv1nIdJ/cANbNn12NC2DyxupcEJbtZRBQtJ05xv9ot2oWs+MnDCE4o8T58WZHwEvh5Pjl7qFhG59WxQMXelqJlUQFl5mQwiwX9gKE9sOZNPHP5WiI9cw0Kn3PQMhMBT1GdQ9/IDXfFQrGaGS6TcK6ROHE2HBFH2JE6Ua5u2qEsZTWZDEy/WNGqNESAfRK/NDC1puu+jveR4xbUt9mNzo9NxFS0Mr4Iz+8UdiHyYoU4KYet8eusqZN8Wc7LzbQebS5nVAEoSslafJfKE5Yjxp5YfhEZZ4oLwOLk2+Z8Ae8KMJ15s3fg0w==._.A6eLMaM6BVcUo9Ir6TfNJ4U6V8xT7ydDIpCMKJ6c5cAT.1.dHdpdHRlci5jb20vV2VuTHVvNjYzMjExMTUz%40">
                Decryption test
            </Link.default>
        </div>
    )
}
function useJumpToDecryption() {
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) return
        const { PostData_v1, PostData_v2 } = router.query
        if (!PostData_v1 && !PostData_v2) return
        router.replace({
            pathname: '/decryption',
            query: {
                version: PostData_v1 ? '1' : '2',
                data: PostData_v1 || PostData_v2,
            },
        })
    }, [router.isReady, router.query, router])
}
