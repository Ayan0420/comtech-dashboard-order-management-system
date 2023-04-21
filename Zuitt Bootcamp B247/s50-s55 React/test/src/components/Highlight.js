import { Card, Row, Col } from 'react-bootstrap';

export default function Highights() {
  return (
    <Row className="mt-3 mb-3">
        <Col xs={12} md={4}>
            <Card className="cardHighlight p-3">
                <Card.Body>
                    <Card.Title>
                        <h2>Learn from Home</h2>
                    </Card.Title>
                    <Card.Text>
                        Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col xs={12} md={4}>
            <Card className="cardHighlight p-3">
                <Card.Body>
                    <Card.Title>
                        <h2>Study Now, Pay Later</h2>
                    </Card.Title>
                    <Card.Text>
                        Ex Lorem cillum consequat ad. Consectetur enim sunt amet sit nulla dolor exercitation est pariatur aliquip minim. Commodo velit est in id anim deserunt ullamco sint aute amet. Adipisicing est Lorem aliquip anim occaecat consequat in magna nisi occaecat consequat et. Reprehenderit elit dolore sunt labore qui.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        <Col xs={12} md={4}>
            <Card className="cardHighlight p-3">
                <Card.Body>
                    <Card.Title>
                        <h2>Be Part of Our Community</h2>
                    </Card.Title>
                    <Card.Text>
                        Minim nostrud dolore consequat ullamco minim aliqua tempor velit amet. Officia occaecat non cillum sit incididunt id pariatur. Mollit tempor laboris commodo anim mollit magna ea reprehenderit fugiat et reprehenderit tempor. Qui ea Lorem dolor in ad nisi anim. Culpa adipisicing enim et officia exercitation adipisicing.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  );
}
