import { useSelector } from "react-redux"
import Button from "./UI/Button"

const Modal = (props) => {
  const color = useSelector(state => state.theme.color)
    return <div className="fixed h-screen w-screen z-20 bg-black/50 flex justify-center items-center">
        <div className="p-8 text-black text-4lg h-48 w-1/3 bg-white rounded-lg border-2 border-black flex flex-col justify-between" style={{borderColor: color}}><p className="text-lg">{props.desc}</p>
        <div className="flex justify-between">
        {props.accept && <Button clickFn={props.onAccept}>Yes</Button>}
          <Button clickFn={props.close}>{props.children}</Button>
        </div>
        </div>
    </div>
}

export default Modal;