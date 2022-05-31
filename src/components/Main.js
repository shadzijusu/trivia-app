import classes from '../modules/Main.module.css'
import {useState, useCallback} from "react"
import Quiz from '../components/Quiz'
function Main() {
    const [hasRender, setRender] = useState(false);
    const onShow = useCallback(() => setRender(true), []);
    return (
        <div className={classes.main}>
            <h1 className={classes.title}>Quizzical</h1>
            <p className={classes.p}>Click on the button below to start the quiz</p>
            <button className={classes.button} onClick={onShow}>Start quiz</button>
            {hasRender && <Quiz></Quiz>}
        </div>
    )
}
export default Main