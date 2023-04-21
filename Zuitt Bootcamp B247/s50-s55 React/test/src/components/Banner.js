import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Banner() {
    return (
        <Row>
            <Col>
                <h1>Zuitt Coding Bootcamp</h1>
                <p>Opportunities for everyone, everywhere.</p>
                <Button variant='none py-1' className='rounded-pill btn-grad'>Enroll now!</Button>
            </Col>
        </Row>
    )
}