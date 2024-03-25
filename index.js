console.log("hello syckas")
const state = {
    parties: [],
};

const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401_FTB_MT_WEB_PT/events'
//form VV
const partyEl = document.querySelector('#party');
const form = document.querySelector('Form');
console.log(form)
//add button!

// add more parties button VV going to need options to put name/descrp/time/location
// going to need a submit button 

async function handleSubmit(event) {
    event.preventDefault()

    const title = event.target.title.value
    const date = event.target.date.value
    const location = event.target.location.value
    const description = event.target.description.value
    //const cohort= ???



    const data = {
        name: title,
        date: new Date(date),
        location: location,
        description: description,

    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.error) {
            console.log(result.error);
            throw new Error(result.error.message)
        }

    } catch (error) {
        console.error(error);
    }
    render();
}

form.addEventListener('submit', handleSubmit)
//get event data
async function getEvents() {

    try {
        const response = await fetch(API_URL)
        console.log(response)
        const party = await response.json()
        console.log(party)
        //for each
        state.parties = party.data;
        console.log(state)

    } catch (error) {
        alert(error)
    }
}
///put event data on page that was created in other function
//single responsibility && done well
const render = async () => {
    await getEvents()

    if (state.parties.length) {
        //for each
        const partyCards = state.parties.map(party => {
            // build card
            //so partyEl is referring to the unordered list created above
            const partyEl = document.createElement('li');
            partyEl.classList.add('box')
            partyEl.innerHTML =
                `<h2>${party.name}</h2>
                <p>Description: ${party.description}</p>
                <p>${party.date}</p>
                <p>${party.location}</p>`

            //h2
            //p
            //delete
            //event listener

            return partyEl

        })

        //put on page 
        partyEl.replaceChildren(...partyCards)


    }

}

render();
// Fetch is used correctly to POST a new party to the API.

// Fetch is used correctly to DELETE a party from the API.

// The app contains a list of the names, dates, times, locations, and descriptions of all parties.

// Each party in the list has a delete button which removes the party when clicked.

// The app contains a form that allows a user to enter information about a party and add it to the list.

// The DOM is dynamically rendered according to data stored in state.

// The data stored in state is updated to stay in sync with the API.