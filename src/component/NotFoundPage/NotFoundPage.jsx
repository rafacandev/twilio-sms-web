import { DockedLayout } from "../DockedLayout/DockedLayout"

export const NotFoundPage = () => (
  <DockedLayout>
    <div className="flex w-full justify-center items-center"></div>
    <p className="flex justify-center items-center text-8xl text-violet-900 font-bold mt-16">404</p>
    <p className="text-4xl text-center text-violet-900">Page not found</p>
    <p className="text-center">The page you are trying to access does not exist.</p>
  </DockedLayout>
)
