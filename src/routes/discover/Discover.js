import db from "../../base";
import "../../App.css";
import { useHistory } from "react-router-dom";

const Discover = () => {
        const history = useHistory();
        return (
            <>
                <h1>Discover</h1>
                <button onClick={() => history.push("/")}>Home</button>
                <button onClick={() => history.push("/searchr")}>Search</button>
            </>
        )
}

export default Discover;