import {NextUIProvider} from '@nextui-org/react'
    
export function LocalNextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}