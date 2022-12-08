import {useContext} from "react";
import APIContextStudio from "../../../Contexts/APIContextStudio";

const StudiosTable = () => {
    const { studios } = useContext(APIContextStudio);

    return <table>
        <thead>
        <tr>
            <th> # </th>
            <th> id </th>
            <th> name </th>
            <th> address </th>
            <th> postal_cde </th>
        </tr>
        </thead>
        <tbody>
        {studios?.map((studio, index) => (
            <tr key={ studio.id }>
                <td>" "</td>
                <td>{ studio.id }</td>
                <td>{ studio.name }</td>
                <td>{ studio.address }</td>
                <td>{ studio.postal_code }</td>
                
            </tr>
        ))}
        </tbody>
    </table>
}

export default StudiosTable;
