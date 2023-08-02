import { useSelector } from "react-redux"
import Button from "./UI/Button"

const Modal = (props) => {
  const color = useSelector(state => state.theme.color)
    return <div className="fixed h-screen w-screen z-50 bg-black/50 flex justify-center items-center">
        <div className="p-8 text-black text-4lg h-48 w-96 bg-white rounded-lg border-2 border-black flex flex-col justify-between" style={{borderColor: color}}><p className="text-2xl">{props.desc}</p>
        <div className="flex gap-2">
        {props.accept && <Button clickFn={props.onAccept}>Yes</Button>}
          <Button clickFn={props.close}>{props.children}</Button>
        </div>
        </div>
    </div>
}

export default Modal;