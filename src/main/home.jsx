import Rbuttons from "../inputs/rInput";
import Xbuttons from "../inputs/xInput";
import RequestForm from "../inputs/request";
import Graph from "./graph";
import ResultTable from "./resultTable";
import loginState from "../zustandStates/LoginStore"

export default function Home() {
    return (
        <>
            <div className="home">

                <Xbuttons />
                <Rbuttons />
                <Graph />
                <RequestForm />
            </div>
            <ResultTable />
        </>

    )
}