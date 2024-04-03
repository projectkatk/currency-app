import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ExchangeRateComparison = (props) => {
    return (
        <Card className="m-4 d-flex flex-column align-items-center">
            <Badge pill bg="secondary" className="mt-3 p-2 px-3">Base Currency: 1 {props.baseSelected}</Badge>
            <Card.Body className="w-75">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Currency</th>
                        <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(props.tableData.rates).map(([key, value]) => {
                                return  (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                                )
                            })                        
                        }
                    </tbody>
                </Table>
            </Card.Body>
            
        </Card>
    )
}

export default ExchangeRateComparison