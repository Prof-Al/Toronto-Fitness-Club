import {useContext} from "react";
import APIContextc from "../../../Contexts/APIContextc";
const ClassesTable = () => {
    const { classes } = useContext(APIContextc);

    return <table>
        <thead>
        <tr>
            <th> # </th>
            <th> id </th>
            <th> name </th>
        </tr>
        </thead>
        <tbody>
        {classes?.map((classes) => (
            <tr key={ classes.id }>
                <td>" "</td>
                <td>{ classes.id }</td>
                <td>{ classes.name }</td>
            </tr>
        ))}
        </tbody>
    </table>
}

export default ClassesTable;
