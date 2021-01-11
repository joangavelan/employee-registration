const App = (() => {
    const FORM = document.querySelector('.form');
    const INPUTS = document.getElementsByClassName('input');
    const FEEDBACK_MESSAGE = document.querySelector('.feedback-message');
    const CARDS = document.querySelector('.cards');
    
    const feedbackMessage = (status, message) => {
        if(status === 'success') FEEDBACK_MESSAGE.className = 'feedback-message success';
        if(status === 'alert') FEEDBACK_MESSAGE.className = 'feedback-message alert';
        FEEDBACK_MESSAGE.firstElementChild.textContent = message; 
    }
    
    const ran = () => Math.floor((Math.random() * 5 ) + 1);
    
    class Employee {
        constructor(arr) {
            this.fullName = `${arr[0]} ${arr[1]}`;
            this.position = arr[2];
            this.age = arr[3];
            this.gender = arr[4];
            this.location = arr[5];
        }
    }
    
    const appendCard = (obj) => {
        let card = document.createElement('div');
        card.classList = 'card';
        card.innerHTML = `
                <img src="avatars/${obj.gender}-${ran()}.jpg" class="card-picture">
                <div class="card-data">
                    <h3 class="card-name">${obj.fullName}</h3>
                    <p>${obj.position}</p>
                    <p>${obj.age} years old</p>
                    <p><i class="fas fa-map-marker-alt"></i> Based in ${obj.location}</p>
                </div>
        `
        CARDS.appendChild(card);
    }
    
    const clearFields = () => {
        for(let input of INPUTS) {
            input.value = '';
        }
    }

    const listeners = () => {
        FORM.addEventListener('submit', event => {
            event.preventDefault();
            //checking empty inputs
            const emptyInputs = [];
            for(let input of INPUTS) {
                if(input.value.trim() === '') {
                    emptyInputs.push(input.getAttribute('id').replace('-',' '));
                }
            }
            //if there aren't empty inputs we proceed with registration
            if(emptyInputs.length === 0) {
                //success feedback
                feedbackMessage('success', `You've successfully registered!`);
                //take values
                const inputValues = []
                for(let input of INPUTS) {
                    inputValues.push(input.value);
                }
                //instantiation of new employee using the array of form input values
                const newEmployee = new Employee(inputValues);
                //appending new employee's card to cards section
                appendCard(newEmployee);
                //clear form fields
                clearFields();
            }
            //alert feedbacks
            else if(emptyInputs.length === 1) feedbackMessage('alert', `Please fill in your ${emptyInputs[0]}`);
            else feedbackMessage('alert', 'Please feel in the fields');
        })
        
        //close feedback message - class reset (it is set to display-none by default)
        FEEDBACK_MESSAGE.querySelector('.close').addEventListener('click', () => FEEDBACK_MESSAGE.className = 'feedback-message');
    }
    

    return {
        listeners
    }

})();

App.listeners();