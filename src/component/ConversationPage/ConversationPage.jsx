import { useLocation, useParams } from "react-router-dom"

export const ConversationPage = props => {
  const par = useParams()
  const loc = useLocation()
  console.log("conv", par, loc, props)
  return <>Conversation Page </>
}
