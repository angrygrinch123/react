import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from "react";

import ProfileCard from "./components/ProfileCard";
import Favorites from './components/Favorites';
import FilterPanel from './components/FilterPanel';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import hciLabData from "./assets/hci-lab.json"

function App() {
  const [hciJsonData, setJson] = useState(hciLabData);
  const [filterTypes , setFilters] = useState([]);
  const [favorites, setFavorite] = useState([]);
  const [totalMentees, setTotalMentees] = useState(0);
  
  function addFilter(userFilter){
    setFilters([...filterTypes, userFilter]);

    if (userFilter == "sortByMentees"){
      const sortedMembers = [...hciJsonData.members].sort( (a, b) => a.numMentees - b.numMentees )
      setJson({"members": sortedMembers})
    }

    if (userFilter == "filterActiveStudents"){
      const filteredMembers = [...hciJsonData.members].filter( function(member){
        return member.isActive;
      })
      setJson({"members": filteredMembers})
    }

    if(userFilter == "filterPhdStudents"){
      const filteredMembers = [...hciJsonData.members].filter( function(member){
        return member.occupation === "PhD Student";
      })
      setJson({"members": filteredMembers})
    }
  }

  function removeFilter(userFilter){
    const newFilters = filterTypes.filter( selectedFilter =>
      selectedFilter !== userFilter
    );
    setFilters(newFilters);

    if(newFilters.length >= 0){
      var rawData = hciLabData;
      if(newFilters.includes("sortByMentees")){
        rawData = {"members": [...rawData.members].sort( (a, b) => a.numMentees - b.numMentees )}
      }
      if(newFilters.includes("filterActiveStudents")){
        rawData = [...rawData.members].filter( function(member){
          return member.isActive;
        })
        rawData = {"members" : rawData}
      }

      if(newFilters.includes("filterPhdStudents")){
        rawData = [...rawData.members].filter( function(member){
          return member.occupation === "PhD Student";
        })
        rawData = {"members" : rawData}
      }

      setJson(rawData)
    }
  }

  function addToFavorite(profileInfo){
    if(!favorites.includes(profileInfo)){ // ensures there are no duplicated favoirtes
      setFavorite([...favorites, profileInfo]);
      setTotalMentees(totalMentees + profileInfo.numMentees);
    }
  }

  function removeFromFavorite(profileInfoToRemove){
    setFavorite(favorites.filter(function(profileInfo){
      return profileInfo != profileInfoToRemove;
    }));
    setTotalMentees(totalMentees - profileInfoToRemove.numMentees);
  }

  return (
    <div className="App">
      <div className='header-container'>
        <h1 className="App-header">Jeff's Chicken Coop</h1>
        <p className="subheader"> Welcome to Jeff's Chicken Coop aka the Brown HCI Lab. We hope this tool can help you to know the members of the Brown HCI lab better. 
          Filters and aggregate stats are shown on the left side. You can also heart or save members of interest. </p>
      </div>
      <div className="app-layout">
            <div className="filter-container">
              <FilterPanel addFilter={addFilter} removeFilter={removeFilter}></FilterPanel>
              {favorites.length > 0 ?  <Favorites className = "favorites" favoritedProfiles={favorites} numMentees={totalMentees}/> : <div></div>}
            </div>
            <div className="profile-card-container">
              {hciJsonData.members.map((profileInfo, index) => 
                        <ProfileCard key={index} profileInfo={profileInfo}
                          addToFavorite={addToFavorite} removeFromFavorite={removeFromFavorite}
                        />
                      ) }
            </div>
      </div>      
      </div>
  );
}

export default App;
