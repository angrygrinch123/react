import Card from 'react-bootstrap/Card';
import ListGroup  from 'react-bootstrap/ListGroup';
import heart from '../assets/heart.png';
import hen from '../assets/hen.png';
import '../App.css';

export default function Favorites({favoritedProfiles, numMentees}){
    return(
        <Card style={{ width: '30rem'}} bg={"light"}>
        <Card.Body>
          <Card.Title>
            Your Favorite Chickens 
          </Card.Title>
          <Card.Subtitle>
          <img src={hen} alt="Hen" width="30rem"></img>
          <img src={heart} alt="Heart" width="30rem"></img>
          <img src={heart} alt="Heart" width="30rem"></img>
          <img src={heart} alt="Heart" width="30rem"></img>
          <img src={hen} alt="Hen" width="30rem"></img>

          </Card.Subtitle>
          <Card.Text>

          </Card.Text>
          A total of <b>{numMentees}</b> students have been mentored by the following lovable chickens in the HCI Lab.
          <ListGroup>
             {favoritedProfiles.map((profileInfo, index) => 
                <ListGroup.Item key={index}>{profileInfo.name}</ListGroup.Item>
            ) }
          </ListGroup>
        </Card.Body>
      </Card>
    );
}