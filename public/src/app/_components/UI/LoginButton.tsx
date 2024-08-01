import { useFormStatus } from "react-dom"
import { signIn } from "next-auth/react"
export const LoginButton = ()=>{
    const { pending } = useFormStatus()

    const handleClick = (event: { preventDefault: () => void }) => {
        if (pending) {
            event.preventDefault()
        }
    }

    return (
        <button type="submit" aria-disabled={pending} onClick={handleClick} className="w-full bg-orange-400 rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
    )
}