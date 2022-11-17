# Development

### Link to Deployed Website
https://angrygrinch123.github.io/react/ 

### Goal and Value of the Application
The goal of the application is to help users know more about people in the Brown HCI lab. Currently, the Brown HCI lab (https://hci.brown.edu/) only lists students which makes it hard for people to understand which students are active or which of them were in the program as a masters/undergrad/PhD student. The goal of this project is to create an initial template for easier search among the students (i.e.  in the future, we could easily add the projects each students are related in to see who worked on what projects) and also highlight the mentoring efforts in the Brown HCI lab and its contributors. 

### Usability Principles Considered
* Contrast 
  - Added a dark blue background in the header to contrast with the rest of the app 
  - Used coolors to find good contrast in text color hence the orange, navy, and white 
  - Added bold for aggregate mentee number information for better contrast

* Gestalt Principles 
  - Grouped content by similarity  grouping by similar functionality (any filtering + stats is on the left, info on the people on the right) 
  - I also focused a lot on continuity - I used the same card profiles for each person 

* Visual Hierarchy 
  - Aimed to have a bottom down flow over all (header vs content) 
  - Aimed a left and right layout so the filters/aggregate info is fixed on the left, while the right lists all the people only 
  - Also used different colors for the left and right side to consolidate hierarchy 
  - Each profile card is has different font styles and colors to so that the most important info, the name, is bolded and bigger to stand out. The less relevant info is grayed. 

* Reactive Layout
  - I made the website reactive to different sizes using flex 
  - I made the aggregate information / or "Your Favorite Chickens" not show unless things were favorited  
  - I also hid did not display information if it was not available for that person or if they had 0 mentees for visual simplicity and also to not shame the people who didn't have mentees unnecessarily (i.e. the undergrads) 
  - I also used flex-warp so that the cards of the profiles would nicely flow if  more people were added

* Reactive Buttons 
  - For easy user learnability I made the heart buttons change state on hover
  1. Not favorited heart is empty colored 
  2. Favorited heart turns red 
  3. Favorited heart on hover demonstrates broken heart to signify that the user can unheart/unfavorite something 

### Organization of Components & How Data is Passed Down Through Components
My app has 4 main components: App, Favorites, Filter Panel, Profile Card 
- App [no data passed down]
  - Has states for the data, filterTypes (or filters that have been applied), favorites (the people favorited or hearted), and totalMentees counting the total number of mentees 
  - It has all the functions to deal with handling states for the following: adding to favorite, removing from favorite, adding filters, and removing filters 
 
- Favorites [App -> Favorites passes down favorites & totalMentees]
  - This takes favorites and totalMentees states as input 
  - The component takes these data and just displays it, no state updates here
  
- FilterPanel [App -> FilterPanel passes down functions addFilter & removeFilter]
  - Filter panel takes addFilter and removeFilter functions as props 
  - It has 3 internal states: isSorted, isActive, isPhdStudent - each are states used for the filters 
  - handleActiveFilterState and handlePhdFilterState functionally do the same thing in which they flag whether a checkbox has been checked and updates the active filterTypes or filter states in App by calling addFilter and removeFilter based on things being checked 
      - once addFilter / removeFilter is called, the states of FilterTypes and hciJsonData are updated accordingly using setFilters and setJson
  - changeSortState is similar to the checkboxes, but it only adds the filter of sorting by number of mentees unlike the check boxes 
  
- Profile Card [App -> Profile Card passes down profileInfo and addToFavorite and removeFromFavorite]
  - this takes profileInfo, addToFavorite, and removeFromFavorite as props 
     - profile info is a json including information about an individual perosn 
  - there is one internal state called isFavorite to keep track of whether the card or person was indeed favorited by the user 
     - if it is favorited by the user, then we change the state of isFavorite and also call removeFromFavorite and addFromFavorite which 
     propagates up to the App to update the favorites state 
  - this component also uses isFavorite state to change different images of the heart button 

###  How Data is Passed Down Through Components [Combined with above] 

### How the User Triggers State Changes
Anything under filter options will trigger state changes
- User can check on the radio button to sort by number of students mentored. This will rearrange the right side of the students from 0 --> MAX number of students mentored. 
- Current Students checkbox will trigger to filter by who is currently in the lab 
- PhD Students checkbox will trigger to filter by who were or are PhD Students in the lab  
- Clicking on the hearts next to each person will trigger the creation of aggregate information under "Your Favorite Chickens" which displays a list of people who contributed to mentoring and the total number of people that have been menteed by those who were hearted/favorited. Additionally, the heart will change color to indiciate state change.
- Hovering over a heart that has already been favorited will look broken so that a user can un-heart/un-favorite it. These un-favorited hearts will then be reflected accordingly on the left aggregate. 

