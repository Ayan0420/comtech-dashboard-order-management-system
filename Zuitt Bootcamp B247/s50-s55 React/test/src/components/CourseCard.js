import { Card, Button } from 'react-bootstrap'

export default function CourseCard() {
    return (
        <Card className="cardHighlight p-3 my-4">
            <Card.Body>
                <Card.Title>
                    <h4>Sample Course</h4>
                </Card.Title>
                <Card.Text>
                    <p className='mb-0'>Description:</p>
                    <p>This is a sample offering.</p>
                    <p className='mb-0'>Price:</p>
                    <p>Php 40,000</p>
                    <Button variant='primary'>Enroll</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}