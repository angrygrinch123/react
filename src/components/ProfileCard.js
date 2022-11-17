import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import heart from '../assets/heart.png';
import brokenHeart from '../assets/broken-heart.png';
import preHeart from '../assets/preHeart.png';

import { useState } from "react";

export default function ProfileCard({profileInfo, addToFavorite, removeFromFavorite}){
    const [isFavorite, setIsFavoriteState] = useState(false);
    
    function changeFavoriteState(){
      setIsFavoriteState(!isFavorite);
    }
    
    function getProfileImage(info){
      const image_url = info.image;
      if(image_url){
        return require("../"+image_url);
      }else{
        if(info.occupation == "PhD Student"){
          return require("../images/graduate.png");
        }else if(info.occupation == "Masters"){
          return require("../images/chick.png");
        }else{
          return require("../images/egg.png");
        }
      }
    }
    
    return(
        <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>{profileInfo.name} 
          <Button variant="Danger" size="sm" onClick={() => {
            isFavorite ? removeFromFavorite(profileInfo) :  addToFavorite(profileInfo); 
            changeFavoriteState();
            }}>
            <img src={preHeart} 
              onMouseOver={ e => isFavorite ? (e.currentTarget.src = brokenHeart) : (e.currentTarget.src = preHeart)}
              onMouseOut={ e => isFavorite ? (e.currentTarget.src = heart) : (e.currentTarget.src = preHeart)} 
              alt="Heart Button with State changes" width="30">
              
            </img>
          </Button>{' '}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">  
            Affiliation {profileInfo.isBrownAffiliated ? "Brown University" : "Visiting Research Assistant"} 
          </Card.Subtitle>
          <Card.Text>
            {profileInfo.occupation} {profileInfo.isActive ? "- Current" : "- Alumni"}
            <br></br>
            {profileInfo.numMentees > 0 ? "Number of Students Mentored: " + profileInfo.numMentees.toString() : ""}
          </Card.Text>
          <img src = {getProfileImage(profileInfo)} alt="Profile Image of Person" height="200rem"></img>
        </Card.Body>
      </Card>
    );
}